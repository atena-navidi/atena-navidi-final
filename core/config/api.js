import axios from "axios";
import { getCookie, setCookie, removeCookie } from "../utils/cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.isLoggedOut = false;

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

const authRoutes = ["/auth/send-otp", "/auth/check-otp", "/auth/register"];

api.interceptors.request.use(
  (config) => {
    const isAuthRoute = authRoutes.some((r) => config.url.includes(r));
    const token = getCookie("accessToken");

    if (!isAuthRoute && token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,

  async (error) => {
    const originalRequest = error.config;

    if (api.isLoggedOut) {
      return Promise.reject(error);
    }

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      if (originalRequest._retry) return Promise.reject(error);
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      const refreshToken = getCookie("refreshToken");
      if (!refreshToken) {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
          { refreshToken },
        );

        const newToken = res.data?.accessToken;
        setCookie("accessToken", newToken, 30);

        onRefreshed(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (e) {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;

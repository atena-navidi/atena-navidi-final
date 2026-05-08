// travel-agency/core/config/api.js

import axios from "axios";
import { getCookie, setCookie, removeCookie } from "../utils/cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/* ────────────────────────────────────────────────────────────────
   1) جلوگیری از refresh-token بعد از logout
───────────────────────────────────────────────────────────────── */
api.isLoggedOut = false;

/* ────────────────────────────────────────────────────────────────
   2) جلوگیری از چندبار اجرا شدن همزمان refresh-token  
      (Critical: جلوگیری از Race Condition)
───────────────────────────────────────────────────────────────── */
let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

/* ────────────────────────────────────────────────────────────────
   3) Auth routes که نباید Authorization header داشته باشند
───────────────────────────────────────────────────────────────── */
const authRoutes = ["/auth/send-otp", "/auth/check-otp", "/auth/register"];

/* ────────────────────────────────────────────────────────────────
   4) REQUEST INTERCEPTOR
───────────────────────────────────────────────────────────────── */
api.interceptors.request.use(
  (config) => {
    const isAuthRoute = authRoutes.some((r) => config.url.includes(r));
    const token = getCookie("accessToken");

    // فقط روی API های محافظت‌شده Authorization بزن
    if (!isAuthRoute && token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ────────────────────────────────────────────────────────────────
   5) RESPONSE INTERCEPTOR  (Handling 401/403)
───────────────────────────────────────────────────────────────── */
api.interceptors.response.use(
  (res) => res,

  async (error) => {
    const originalRequest = error.config;

    // اگر logout شده‌ایم → هر خطای 401 را reject کن
    if (api.isLoggedOut) {
      return Promise.reject(error);
    }

    // Only for token errors
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // جلوگیری از حلقه بی‌نهایت
      if (originalRequest._retry) return Promise.reject(error);
      originalRequest._retry = true;

      /* ──────────────────────────────────────────────
         A) اگر هم‌اکنون refresh-token درحال انجام است
         درخواست فعلی را در صف قرار بده
      ────────────────────────────────────────────── */
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      /* ──────────────────────────────────────────────
         B) اجرای refresh-token
      ────────────────────────────────────────────── */
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
          { refreshToken }
        );

        const newToken = res.data?.accessToken;
        setCookie("accessToken", newToken, 30);

        // اجرای تمام درخواست‌های منتظر
        onRefreshed(newToken);

        // درخواست قبلی را با توکن جدید اجرا کن
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (e) {
        // refresh هم باطل شده → logout کامل
        removeCookie("accessToken");
        removeCookie("refreshToken");
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

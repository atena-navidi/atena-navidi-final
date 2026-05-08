// travel-agency/core/services/queries.js

import api from "../config/api";
import { useQuery } from "@tanstack/react-query";

const useGetUserDate = () => {
  const queryFn = () => api.get("/user/profile");
  const queryKey = ["user-data"];

  return useQuery({
    queryKey,
    queryFn,
    retry: false,      
    staleTime: 0,     
  });
};

export default useGetUserDate;

export const useGetTours = () => {
  return useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      const res = await api.get("/tour");
      return res.data;
    },
    retry: false,
    staleTime: 0,
  });
};

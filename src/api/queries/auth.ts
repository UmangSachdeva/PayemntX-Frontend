import { UserDetailsResponse } from "@/types/auth";
import axiosPrivate from "../axios/axiosPrivate";
import { useQuery } from "@tanstack/react-query";

const getUserDetails = (): Promise<UserDetailsResponse> => {
  return axiosPrivate
    .get<UserDetailsResponse>(`${import.meta.env.VITE_BACKEND_API}/api/v1/auth`)
    .then((res) => res.data);
};

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: ["get-user-details"],
    queryFn: getUserDetails,
  });
};

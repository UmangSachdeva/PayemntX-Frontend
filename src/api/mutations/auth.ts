import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { Group, LoginCreds, SignupCreds } from "@/types/auth";

import { addToast } from "@heroui/toast";

import { ErrorResponse } from "@/types/error";
import { AuthSuccessResponse } from "@/types/success";
import { useNavigate } from "react-router-dom";

const login = (creds: LoginCreds): Promise<AuthSuccessResponse> => {
  return axios.post(
    `${import.meta.env.VITE_BACKEND_API}/api/v1/auth/login`,
    creds
  );
};

const signup = (creds: SignupCreds): Promise<AuthSuccessResponse> => {
  return axios.post(
    `${import.meta.env.VITE_BACKEND_API}/api/v1/auth/signup`,
    creds
  );
};

export const useLogin = () => {
  const nav = useNavigate();

  return useMutation({
    mutationFn: login,
    mutationKey: ["user-login"],
    onError: (error: ErrorResponse) => {
      addToast({
        title: "Error",
        description: error?.response?.data,
        color: "danger",
      });
    },
    onSuccess: (response: AuthSuccessResponse) => {
      localStorage.setItem("authToken", response.data.token);
      nav("/dashboard");
      addToast({
        title: "Login Success !!",
        description: "User logged in successfully",
        color: "success",
      });
    },
  });
};

export const useSignup = () => {
  const nav = useNavigate();

  return useMutation({
    mutationFn: signup,
    mutationKey: ["user-login"],
    onError: (error: ErrorResponse) => {
      addToast({
        title: "Error",
        description: error?.response?.data,
        color: "danger",
      });
    },
    onSuccess: (response: AuthSuccessResponse) => {
      localStorage.setItem("authToken", response.data.token);
      nav("/dashboard");
      addToast({
        title: "Account Created !!",
        description: "Account created successfully",
        color: "success",
      });
    },
  });
};

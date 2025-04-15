import { LinkTokenResponse } from "@/types/payment";
import axiosPrivate from "../axios/axiosPrivate";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "@/utils/parseTransactions";
import { addToast } from "@heroui/toast";
import { ErrorResponse } from "@/types/error";

const linkBankAccount = (): Promise<LinkTokenResponse> => {
  return axiosPrivate.post(`${import.meta.env.VITE_BACKEND_API}/payments/link`);
};

const addTransaction = (transaction: Transaction[]) => {
  return axiosPrivate.post(
    `${import.meta.env.VITE_BACKEND_API}/api/v1/payments/transactions`,
    transaction
  );
};

export const useLinkBankAccount = () => {
  return useMutation({
    mutationFn: linkBankAccount,
    mutationKey: ["link-bank-account"],
  });
};

export const useAddTransaction = () => {
  return useMutation({
    mutationFn: addTransaction,
    mutationKey: ["add-transaction"],
    onError: (error: ErrorResponse) => {
      addToast({
        title: "Error",
        description: error?.response?.data,
        color: "danger",
      });
    },
  });
};

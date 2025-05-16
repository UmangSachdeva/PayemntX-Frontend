import { useQuery } from "@tanstack/react-query";
import axiosPrivate from "../axios/axiosPrivate";
import {
  TransactionAnalysisQueryParams,
  TransactionAnalysisResponse,
  TransactionQueryParams,
  TransactionResponse,
} from "@/types/payment";

const getUserTransactions = (query: string): Promise<TransactionResponse> => {
  return axiosPrivate
    .get<TransactionResponse>(
      `${import.meta.env.VITE_BACKEND_API}/api/v1/payments/transactions?${query}`
    )
    .then((response) => response.data);
};

const getUserTransactionAnalysis = (
  query: string
): Promise<TransactionAnalysisResponse> => {
  return axiosPrivate
    .get<TransactionAnalysisResponse>(
      `${import.meta.env.VITE_BACKEND_API}/api/v1/payments/transactions/analysis?${query}`
    )
    .then((res) => res.data);
};

export const useGetUserTransactions = (query: TransactionQueryParams) => {
  const queryStr = new URLSearchParams(
    query as Record<string, string>
  ).toString();

  return useQuery<TransactionResponse>({
    queryKey: ["user-transactions", query],
    queryFn: () => getUserTransactions(queryStr),
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useGetTransactionAnalysis = (
  query: TransactionAnalysisQueryParams
) => {
  const queryStr = new URLSearchParams(
    query as Record<string, string>
  ).toString();

  return useQuery<TransactionAnalysisResponse>({
    queryKey: ["transaction-analysis", query],
    queryFn: () => getUserTransactionAnalysis(queryStr),
    refetchOnWindowFocus: false,
    retry: false,
  });
};

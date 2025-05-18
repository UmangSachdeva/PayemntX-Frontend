import { useQuery } from "@tanstack/react-query";
import axiosPrivate from "../axios/axiosPrivate";
import {
  AverageMonthlySpendsQuery,
  AverageMonthlySpendsResponse,
  DebitVsCreditQuery,
  DebitVsCreditResponse,
  MonthlySpendsQuery,
  MonthlySpendsResponse,
  TimeSpendingResponse,
  TransactionAnalysisQueryParams,
  TransactionAnalysisResponse,
  TransactionQueryParams,
  TransactionResponse,
  WeeklyMonthlyPatternQuery,
  WeeklyMonthlyPatternResponse,
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

const getUserMonthlySpends = (
  query: string
): Promise<MonthlySpendsResponse> => {
  return axiosPrivate
    .get<MonthlySpendsResponse>(
      `${import.meta.env.VITE_BACKEND_API}/api/v1/payments/transactions/monthly?${query}`
    )
    .then((res) => res.data);
};

const getUserMonthlyAverageSpends = (
  query: string
): Promise<AverageMonthlySpendsResponse> => {
  return axiosPrivate(
    `${import.meta.env.VITE_BACKEND_API}/api/v1/payments/transactions/average?${query}`
  ).then((res) => res.data);
};

const getUserWeeklyMonthlyPattern = (
  query: string
): Promise<WeeklyMonthlyPatternResponse[]> => {
  return axiosPrivate
    .get<
      WeeklyMonthlyPatternResponse[]
    >(`${import.meta.env.VITE_BACKEND_API}/api/v1/payments/transactions/pattern?${query}`)
    .then((res) => res.data);
};

const getUserTimeSpending = (): Promise<TimeSpendingResponse> => {
  return axiosPrivate
    .get<TimeSpendingResponse>(
      `${import.meta.env.VITE_BACKEND_API}/api/v1/payments/transactions/time`
    )
    .then((res) => res.data);
};

const getUserDebitVsCredit = (
  query: string
): Promise<DebitVsCreditResponse> => {
  return axiosPrivate
    .get<DebitVsCreditResponse>(
      `${import.meta.env.VITE_BACKEND_API}/api/v1/payments/transactions/debitvscredit?${query}`
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

export const useGetMonthlySpends = (query: MonthlySpendsQuery) => {
  const queryStr = new URLSearchParams(
    query as Record<string, string>
  ).toString();

  return useQuery<MonthlySpendsResponse>({
    queryKey: ["monthly-spends", query],
    queryFn: () => getUserMonthlySpends(queryStr),
  });
};

export const useGetMonthlyAverageSpend = (query: AverageMonthlySpendsQuery) => {
  const queryStr = new URLSearchParams(
    query as Record<string, string>
  ).toString();

  return useQuery<AverageMonthlySpendsResponse>({
    queryKey: ["average-monthly-spend", query],
    queryFn: () => getUserMonthlyAverageSpends(queryStr),
  });
};

export const useGetWeeklyMonthlyPattern = (
  query: WeeklyMonthlyPatternQuery
) => {
  const queryStr = new URLSearchParams(
    query as Record<string, string>
  ).toString();

  return useQuery<WeeklyMonthlyPatternResponse[]>({
    queryKey: ["weekly-spend-pattern", query],
    queryFn: () => getUserWeeklyMonthlyPattern(queryStr),
  });
};

export const useGetUserTimeSpending = () => {
  return useQuery({
    queryKey: ["time-spending"],
    queryFn: () => getUserTimeSpending(),
  });
};

export const useGetUserDebitVsCredit = (query: DebitVsCreditQuery) => {
  const queryStr = new URLSearchParams(
    query as Record<string, string>
  ).toString();

  return useQuery<DebitVsCreditResponse>({
    queryKey: ["debit-vs-credit", query],
    queryFn: () => getUserDebitVsCredit(queryStr),
  });
};

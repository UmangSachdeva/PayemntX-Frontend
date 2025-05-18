import { Transaction } from "@/utils/parseTransactions";

export type LinkTokenResponse = {
  data: {
    link_token: string;
    status: string;
  };
};

export type TransactionQueryParams = {
  limit?: number;
  page?: number;
};

export type TransactionResponse = {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
};

export type TransactionAnalysisResponse = {
  data: Transaction[];
  total: number;
};

export type TransactionAnalysisQueryParams = {
  start_date?: string;
  end_date?: string;
  limit?: number;
  page?: number;
  category?: string;
  account_id?: string;
  transaction_type?: string;
  merchant_name?: string;
  amount?: number;
  type?: string;
};

export type MonthlySpendObject = {
  year: number;
  month: number;
  amount: number;
};

export type MonthlySpendsResponse = MonthlySpendObject[];

export type MonthlySpendsQuery = {
  year?: number;
  month?: number;
  type?: "DEBIT" | "CREDIT";
};

export type AverageMonthlySpendsResponse = {
  year: number;
  month: number;
  average_daily_spend: number;
  percentage_change: number;
};

export type AverageMonthlySpendsQuery = {
  year?: number;
  month?: number;
};

export type WeeklyMonthlyPatternQuery = {
  year?: number;
  month?: number;
  type?: "DEBIT" | "CREDIT";
};

export type WeeklyMonthlyPatternResponse = {
  year: number;
  month: number;
  day_of_week: number;
  total_spend: number;
};

type TimeSpending = {
  hour: number;
  amount: number;
};

export type TimeSpendingResponse = TimeSpending[];

export type DebitVsCreditQuery = {
  year?: number;
};

type DebitVsCreditResult = {
  month: number;
  debit: number;
  credit: number;
};

export type DebitVsCreditResponse = {
  year: number;
  results: DebitVsCreditResult[];
};

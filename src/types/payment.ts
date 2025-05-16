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
};

import ApiClient from "@/src/services/apiClient";

export interface Wallet {
  id: string;
  balance: string;
  is_active: boolean;
  created_at: string;
}

export type transactionsParams = {
  walletId: string;
  limit?: number;
  page?: number;
  type?: string;
  category?: string;
  endDate?: string;
};

const transactionInstance = new ApiClient<any, Wallet[]>("/transactions");

const transactionApi = {
  fetchTransactions: async (params: transactionsParams) => {
    const walletId = params.walletId;
    delete params?.walletId;

    return await transactionInstance.fetch(
      {
        ...params,
      },
      "/" + walletId
    );
  },
};
export default transactionApi;

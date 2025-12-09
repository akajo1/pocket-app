import ApiClient from "@/src/services/apiClient";

export interface Wallet {
    id: string;
    balance: string;
    is_active: boolean;
    created_at: string;
}

export type transactionsParams = {
    walletId?: string | number;
    childId?: string;
    pageSize?: number;
    page?: number;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string
};

const transactionInstance = new ApiClient<any, Wallet[]>("/transactions");

const transactionApi = {
    fetchTransactions: async (params: transactionsParams) => {
        const walletId = params.walletId;
        delete params?.walletId;
        return await transactionInstance.fetch(params, `/${walletId}/transactions`)
    },
    fetchChildTransactions: async (params: transactionsParams) => {
        const childId = params.childId;
        delete params?.childId
        return await transactionInstance.fetch(params, `/child/${childId}/transactions`);

    }
};
export default transactionApi;

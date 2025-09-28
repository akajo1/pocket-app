import { apiClient, PaginatedResponse } from "../api";
import {
  CreateTransactionRequest,
  Transaction,
  TransactionAnalytics,
} from "../types";

export interface TransactionFilters {
  page?: number;
  limit?: number;
  type?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export const transactionApi = {
  // Get transactions with filters
  async getTransactions(walletId: string, filters: TransactionFilters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, value.toString());
      }
    });

    return apiClient.get<PaginatedResponse<Transaction>>(
      `/transactions/${walletId}?${params.toString()}`
    );
  },

  // Create transaction
  async createTransaction(data: CreateTransactionRequest) {
    return apiClient.post<{
      transactionId: number;
      referenceNumber: string;
      amount: number;
    }>("/transactions", data);
  },

  // Get transaction by ID
  async getTransaction(transactionId: number) {
    return apiClient.get<{ transaction: Transaction }>(
      `/transactions/${transactionId}`
    );
  },

  // Update transaction
  async updateTransaction(transactionId: number, data: Partial<Transaction>) {
    return apiClient.put<Transaction>(`/transactions/${transactionId}`, data);
  },

  // Delete transaction
  async deleteTransaction(transactionId: number) {
    return apiClient.delete(`/transactions/${transactionId}`);
  },

  // Get transaction analytics
  async getAnalytics(period = "30") {
    return apiClient.get<TransactionAnalytics>(
      `/transactions/analytics?period=${period}`
    );
  },

  // Get categories
  async getCategories() {
    return apiClient.get<{
      categories: { id: number; name: string; icon: string; color: string }[];
    }>("/transactions/categories");
  },

  // Export transactions
  async exportTransactions(
    format: "csv" | "pdf" = "csv",
    filters: TransactionFilters = {}
  ) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, value.toString());
      }
    });
    params.append("format", format);

    return apiClient.get(`/transactions/export?${params.toString()}`, {
      responseType: "blob",
    });
  },
};

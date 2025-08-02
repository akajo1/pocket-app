import { create } from 'zustand';
import { Transaction, TransactionAnalytics } from '../types';

interface TransactionState {
  transactions: Transaction[];
  analytics: TransactionAnalytics | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    type?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface TransactionActions {
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: number, updates: Partial<Transaction>) => void;
  removeTransaction: (id: number) => void;
  setAnalytics: (analytics: TransactionAnalytics) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<TransactionState['filters']>) => void;
  setPagination: (pagination: Partial<TransactionState['pagination']>) => void;
  clearFilters: () => void;
}

export const useTransactionStore = create<TransactionState & TransactionActions>((set, get) => ({
  // State
  transactions: [],
  analytics: null,
  isLoading: false,
  error: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  },

  // Actions
  setTransactions: (transactions) => set({ transactions }),

  addTransaction: (transaction) => set((state) => ({ 
    transactions: [transaction, ...state.transactions] 
  })),

  updateTransaction: (id, updates) => set((state) => ({
    transactions: state.transactions.map(transaction => 
      transaction.id === id ? { ...transaction, ...updates } : transaction
    )
  })),

  removeTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter(transaction => transaction.id !== id)
  })),

  setAnalytics: (analytics) => set({ analytics }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),

  setPagination: (newPagination) => set((state) => ({
    pagination: { ...state.pagination, ...newPagination }
  })),

  clearFilters: () => set({ 
    filters: {},
    pagination: { ...get().pagination, page: 1 }
  }),
}));
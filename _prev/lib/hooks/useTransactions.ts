import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Alert } from "react-native";
import { transactionApi, TransactionFilters } from "../api/transactionApi";
import { useTransactionStore } from "../stores/transactionStore";
import { CreateTransactionRequest } from "../types";


export const useTransactions = (
  walletId: string,
  filters: TransactionFilters = {}
) => {
  const queryClient = useQueryClient();
  const {
    transactions,
    analytics,
    isLoading,
    error,
    filters: storeFilters,
    pagination,
    setTransactions,
    addTransaction,
    updateTransaction,
    removeTransaction,
    setAnalytics,
    setLoading,
    setError,
    setFilters,
    setPagination,
    clearFilters,
  } = useTransactionStore();

  // Merge filters from hook params and store
  const mergedFilters = { ...storeFilters, ...filters };

  // Get transactions query
  const transactionsQuery = useQuery({
    queryKey: ["transactions", mergedFilters],
    queryFn: async () => {
      const response = await transactionApi.getTransactions(
        walletId,
        mergedFilters
      );
      if (response.success && response.data) {
        setTransactions(response.data.transactions);
        setPagination(response.data.pagination);
        return response.data;
      }
      throw new Error(response.message);
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  // Get analytics query
  const analyticsQuery = useQuery({
    queryKey: [
      "transactions",
      "analytics",
      mergedFilters.startDate,
      mergedFilters.endDate,
    ],
    queryFn: async () => {
      const period =
        mergedFilters.startDate && mergedFilters.endDate ? undefined : "30";
      const response = await transactionApi.getAnalytics(period);
      if (response.success && response.data) {
        setAnalytics(response.data);
        return response.data;
      }
      throw new Error(response.message);
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  // Get categories query
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await transactionApi.getCategories();
      if (response.success && response.data) {
        return response.data.categories;
      }
      throw new Error(response.message);
    },
  });

  // Create transaction mutation
  const createTransactionMutation = useMutation({
    mutationFn: transactionApi.createTransaction,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert("Succès", "Transaction créée avec succès");
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        queryClient.invalidateQueries({ queryKey: ["wallets"] });
        queryClient.invalidateQueries({ queryKey: ["children"] });
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors de la création"
      );
    },
  });

  // Update transaction mutation
  const updateTransactionMutation = useMutation({
    mutationFn: ({
      transactionId,
      data,
    }: {
      transactionId: number;
      data: any;
    }) => transactionApi.updateTransaction(transactionId, data),
    onSuccess: (response, variables) => {
      if (response.success && response.data) {
        updateTransaction(variables.transactionId, response.data);
        Alert.alert("Succès", "Transaction mise à jour");
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors de la mise à jour"
      );
    },
  });

  // Delete transaction mutation
  const deleteTransactionMutation = useMutation({
    mutationFn: transactionApi.deleteTransaction,
    onSuccess: (response, transactionId) => {
      if (response.success) {
        removeTransaction(transactionId);
        Alert.alert("Succès", "Transaction supprimée");
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors de la suppression"
      );
    },
  });

  // Export transactions mutation
  const exportTransactionsMutation = useMutation({
    mutationFn: ({
      format,
      filters,
    }: {
      format: "csv" | "pdf";
      filters: TransactionFilters;
    }) => transactionApi.exportTransactions(format, filters),
    onSuccess: () => {
      Alert.alert("Succès", "Export généré avec succès");
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors de l'export"
      );
    },
  });

  // Helper functions
  const createTransaction = useCallback(
    (data: CreateTransactionRequest) => {
      return createTransactionMutation.mutateAsync(data);
    },
    [createTransactionMutation]
  );

  const updateTransactionData = useCallback(
    (transactionId: number, data: any) => {
      return updateTransactionMutation.mutateAsync({ transactionId, data });
    },
    [updateTransactionMutation]
  );

  const deleteTransaction = useCallback(
    (transactionId: number) => {
      return deleteTransactionMutation.mutateAsync(transactionId);
    },
    [deleteTransactionMutation]
  );

  const exportTransactions = useCallback(
    (format: "csv" | "pdf" = "csv", exportFilters: TransactionFilters = {}) => {
      return exportTransactionsMutation.mutateAsync({
        format,
        filters: exportFilters,
      });
    },
    [exportTransactionsMutation]
  );

  const updateFilters = useCallback(
    (newFilters: Partial<TransactionFilters>) => {
      setFilters(newFilters);
    },
    [setFilters]
  );

  const refreshTransactions = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey: ["transactions"] });
  }, [queryClient]);

  const refreshAnalytics = useCallback(() => {
    return queryClient.invalidateQueries({
      queryKey: ["transactions", "analytics"],
    });
  }, [queryClient]);

  return {
    // State
    transactions,
    analytics,
    isLoading:
      isLoading || transactionsQuery.isLoading || analyticsQuery.isLoading,
    error:
      error ||
      transactionsQuery.error?.message ||
      analyticsQuery.error?.message,
    filters: mergedFilters,
    pagination,

    // Actions
    createTransaction,
    updateTransaction: updateTransactionData,
    deleteTransaction,
    exportTransactions,
    updateFilters,
    clearFilters,
    refreshTransactions,
    refreshAnalytics,

    // Mutation states
    isCreating: createTransactionMutation.isPending,
    isUpdating: updateTransactionMutation.isPending,
    isDeleting: deleteTransactionMutation.isPending,
    isExporting: exportTransactionsMutation.isPending,

    // Query states
    isAnalyticsLoading: analyticsQuery.isLoading,
  };
};

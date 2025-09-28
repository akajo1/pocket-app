import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Alert } from "react-native";
import { walletApi } from "../api/walletApi";
import { useWalletStore } from "../stores/walletStore";
import { TopUpWalletRequest } from "../types";

export const useWallets = () => {
  const queryClient = useQueryClient();
  const {
    wallets,
    selectedWallet,
    isLoading,
    error,
    setWallets,
    setSelectedWallet,
    addWallet,
    updateWallet,
    removeWallet,
    setLoading,
    setError,
    updateBalance,
  } = useWalletStore();

  // Get wallets query
  const walletsQuery = useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      const response = await walletApi.getWallets();
      if (response.success && response.data) {
        setWallets(response.data.wallets);
        return response.data.wallets;
      }
      throw new Error(response.message);
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  // Create wallet mutation
  const createWalletMutation = useMutation({
    mutationFn: walletApi.createWallet,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert("Succès", "Portefeuille créé avec succès");
        queryClient.invalidateQueries({ queryKey: ["wallets"] });
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors de la création"
      );
    },
  });

  // Top up wallet mutation
  const topUpMutation = useMutation({
    mutationFn: walletApi.topUpWallet,
    onSuccess: (response, variables) => {
      if (response.success && response.data) {
        updateBalance(variables.walletId, variables.amount, "add");
        Alert.alert(
          "Succès",
          `€${variables.amount.toFixed(2)} ajoutés avec succès`
        );
        queryClient.invalidateQueries({ queryKey: ["wallets"] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors du rechargement"
      );
    },
  });

  // Update wallet mutation
  const updateWalletMutation = useMutation({
    mutationFn: ({ walletId, data }: { walletId: number; data: any }) =>
      walletApi.updateWallet(walletId, data),
    onSuccess: (response, variables) => {
      if (response.success && response.data) {
        updateWallet(variables.walletId, response.data);
        Alert.alert("Succès", "Portefeuille mis à jour");
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors de la mise à jour"
      );
    },
  });

  // Delete wallet mutation
  const deleteWalletMutation = useMutation({
    mutationFn: walletApi.deleteWallet,
    onSuccess: (response, walletId) => {
      if (response.success) {
        removeWallet(walletId);
        Alert.alert("Succès", "Portefeuille supprimé");
        queryClient.invalidateQueries({ queryKey: ["wallets"] });
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors de la suppression"
      );
    },
  });

  // Set primary wallet mutation
  const setPrimaryMutation = useMutation({
    mutationFn: walletApi.setPrimaryWallet,
    onSuccess: (response, walletId) => {
      if (response.success) {
        // Update all wallets to set only this one as primary
        wallets.forEach((wallet) => {
          updateWallet(wallet.id, { isPrimary: wallet.id === walletId });
        });
        Alert.alert("Succès", "Portefeuille principal défini");
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors de la définition"
      );
    },
  });

  // Toggle wallet status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: walletApi.toggleWalletStatus,
    onSuccess: (response, walletId) => {
      if (response.success) {
        const wallet = wallets.find((w) => w.id === walletId);
        if (wallet) {
          updateWallet(walletId, { isActive: !wallet.isActive });
          Alert.alert(
            "Succès",
            `Portefeuille ${!wallet.isActive ? "activé" : "désactivé"}`
          );
        }
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors du changement de statut"
      );
    },
  });

  // Helper functions
  const createWallet = useCallback(
    (data: any) => {
      return createWalletMutation.mutateAsync(data);
    },
    [createWalletMutation]
  );

  const topUpWallet = useCallback(
    (data: TopUpWalletRequest) => {
      return topUpMutation.mutateAsync(data);
    },
    [topUpMutation]
  );

  const updateWalletData = useCallback(
    (walletId: number, data: any) => {
      return updateWalletMutation.mutateAsync({ walletId, data });
    },
    [updateWalletMutation]
  );

  const deleteWallet = useCallback(
    (walletId: number) => {
      return deleteWalletMutation.mutateAsync(walletId);
    },
    [deleteWalletMutation]
  );

  const setPrimaryWallet = useCallback(
    (walletId: number) => {
      return setPrimaryMutation.mutateAsync(walletId);
    },
    [setPrimaryMutation]
  );

  const toggleWalletStatus = useCallback(
    (walletId: number) => {
      return toggleStatusMutation.mutateAsync(walletId);
    },
    [toggleStatusMutation]
  );

  const refreshWallets = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey: ["wallets"] });
  }, [queryClient]);

  return {
    // State
    wallets,
    selectedWallet,
    isLoading: isLoading || walletsQuery.isLoading,
    error: error || walletsQuery.error?.message,

    // Actions
    setSelectedWallet,
    createWallet,
    topUpWallet,
    updateWallet: updateWalletData,
    deleteWallet,
    setPrimaryWallet,
    toggleWalletStatus,
    refreshWallets,

    // Mutation states
    isCreating: createWalletMutation.isPending,
    isToppingUp: topUpMutation.isPending,
    isUpdating: updateWalletMutation.isPending,
    isDeleting: deleteWalletMutation.isPending,
    isSettingPrimary: setPrimaryMutation.isPending,
    isTogglingStatus: toggleStatusMutation.isPending,
  };
};

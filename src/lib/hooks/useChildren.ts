import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useChildrenStore } from '../stores/childrenStore';
import { childrenApi } from '../api/childrenApi';
import { CreateChildRequest, SendMoneyRequest, GiveRewardRequest, UpdateSpendingLimitsRequest } from '../types';
import { Alert } from 'react-native';

export const useChildren = () => {
  const queryClient = useQueryClient();
  const { 
    children, 
    selectedChild, 
    isLoading,
    error,
    setChildren, 
    setSelectedChild, 
    addChild, 
    updateChild,
    removeChild,
    setLoading, 
    setError,
    updateChildBalance,
    updateChildSpending
  } = useChildrenStore();

  // Get children query
  const childrenQuery = useQuery({
    queryKey: ['children'],
    queryFn: async () => {
      const response = await childrenApi.getChildren();
      if (response.success && response.data) {
        setChildren(response.data.children);
        return response.data.children;
      }
      throw new Error(response.message);
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  // Get child details query
  const useChildDetails = (childId: number) => {
    return useQuery({
      queryKey: ['children', childId, 'details'],
      queryFn: async () => {
        const response = await childrenApi.getChildDetails(childId);
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.message);
      },
      enabled: !!childId,
    });
  };

  // Create child mutation
  const createChildMutation = useMutation({
    mutationFn: childrenApi.createChild,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert('Succès', 'Portefeuille enfant créé avec succès');
        queryClient.invalidateQueries({ queryKey: ['children'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la création');
    },
  });

  // Send money mutation
  const sendMoneyMutation = useMutation({
    mutationFn: ({ childId, data }: { childId: number; data: SendMoneyRequest }) =>
      childrenApi.sendMoney(childId, data),
    onSuccess: (response, variables) => {
      if (response.success && response.data) {
        updateChildBalance(variables.childId, variables.data.amount, 'add');
        Alert.alert('Succès', `€${variables.data.amount.toFixed(2)} envoyés avec succès`);
        queryClient.invalidateQueries({ queryKey: ['children'] });
        queryClient.invalidateQueries({ queryKey: ['wallets'] });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de l\'envoi');
    },
  });

  // Give reward mutation
  const giveRewardMutation = useMutation({
    mutationFn: ({ childId, data }: { childId: number; data: GiveRewardRequest }) =>
      childrenApi.giveReward(childId, data),
    onSuccess: (response, variables) => {
      if (response.success && response.data) {
        updateChildBalance(variables.childId, variables.data.amount, 'add');
        Alert.alert('Succès', `Récompense de €${variables.data.amount.toFixed(2)} donnée`);
        queryClient.invalidateQueries({ queryKey: ['children'] });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de l\'attribution');
    },
  });

  // Update child mutation
  const updateChildMutation = useMutation({
    mutationFn: ({ childId, data }: { childId: number; data: any }) =>
      childrenApi.updateChild(childId, data),
    onSuccess: (response, variables) => {
      if (response.success && response.data) {
        updateChild(variables.childId, response.data);
        Alert.alert('Succès', 'Enfant mis à jour');
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la mise à jour');
    },
  });

  // Update spending limits mutation
  const updateSpendingLimitsMutation = useMutation({
    mutationFn: ({ childId, data }: { childId: number; data: UpdateSpendingLimitsRequest }) =>
      childrenApi.updateSpendingLimits(childId, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        Alert.alert('Succès', 'Limites mises à jour');
        queryClient.invalidateQueries({ queryKey: ['children', variables.childId, 'details'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la mise à jour');
    },
  });

  // Delete child mutation
  const deleteChildMutation = useMutation({
    mutationFn: childrenApi.deleteChild,
    onSuccess: (response, childId) => {
      if (response.success) {
        removeChild(childId);
        Alert.alert('Succès', 'Portefeuille enfant supprimé');
        queryClient.invalidateQueries({ queryKey: ['children'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la suppression');
    },
  });

  // Toggle child status mutation
  const toggleChildStatusMutation = useMutation({
    mutationFn: childrenApi.toggleChildStatus,
    onSuccess: (response, childId) => {
      if (response.success) {
        const child = children.find(c => c.id === childId);
        if (child) {
          updateChild(childId, { isActive: !child.isActive });
          Alert.alert('Succès', `Portefeuille ${!child.isActive ? 'activé' : 'désactivé'}`);
        }
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors du changement de statut');
    },
  });

  // Helper functions
  const createChild = useCallback((data: CreateChildRequest) => {
    return createChildMutation.mutateAsync(data);
  }, [createChildMutation]);

  const sendMoney = useCallback((childId: number, data: SendMoneyRequest) => {
    return sendMoneyMutation.mutateAsync({ childId, data });
  }, [sendMoneyMutation]);

  const giveReward = useCallback((childId: number, data: GiveRewardRequest) => {
    return giveRewardMutation.mutateAsync({ childId, data });
  }, [giveRewardMutation]);

  const updateChildData = useCallback((childId: number, data: any) => {
    return updateChildMutation.mutateAsync({ childId, data });
  }, [updateChildMutation]);

  const updateSpendingLimits = useCallback((childId: number, data: UpdateSpendingLimitsRequest) => {
    return updateSpendingLimitsMutation.mutateAsync({ childId, data });
  }, [updateSpendingLimitsMutation]);

  const deleteChild = useCallback((childId: number) => {
    return deleteChildMutation.mutateAsync(childId);
  }, [deleteChildMutation]);

  const toggleChildStatus = useCallback((childId: number) => {
    return toggleChildStatusMutation.mutateAsync(childId);
  }, [toggleChildStatusMutation]);

  const refreshChildren = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey: ['children'] });
  }, [queryClient]);

  return {
    // State
    children,
    selectedChild,
    isLoading: isLoading || childrenQuery.isLoading,
    error: error || childrenQuery.error?.message,

    // Actions
    setSelectedChild,
    createChild,
    sendMoney,
    giveReward,
    updateChild: updateChildData,
    updateSpendingLimits,
    deleteChild,
    toggleChildStatus,
    refreshChildren,
    useChildDetails,

    // Mutation states
    isCreating: createChildMutation.isPending,
    isSendingMoney: sendMoneyMutation.isPending,
    isGivingReward: giveRewardMutation.isPending,
    isUpdating: updateChildMutation.isPending,
    isUpdatingLimits: updateSpendingLimitsMutation.isPending,
    isDeleting: deleteChildMutation.isPending,
    isTogglingStatus: toggleChildStatusMutation.isPending,
  };
};
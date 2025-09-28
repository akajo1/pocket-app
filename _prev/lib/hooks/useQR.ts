import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { qrApi } from '../api/qrApi';
import { GenerateQRCodeRequest, ProcessQRPaymentRequest } from '../types';
import { Alert } from 'react-native';

export const useQR = () => {
  const queryClient = useQueryClient();

  // Get user's QR codes query
  const qrCodesQuery = useQuery({
    queryKey: ['qr', 'codes'],
    queryFn: async () => {
      const response = await qrApi.getUserQRCodes();
      if (response.success && response.data) {
        return response.data.qrCodes;
      }
      throw new Error(response.message);
    },
  });

  // Generate QR code mutation
  const generateQRCodeMutation = useMutation({
    mutationFn: qrApi.generateQRCode,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert('Succès', 'QR code généré avec succès');
        queryClient.invalidateQueries({ queryKey: ['qr', 'codes'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la génération');
    },
  });

  // Process QR payment mutation
  const processQRPaymentMutation = useMutation({
    mutationFn: qrApi.processPayment,
    onSuccess: (response) => {
      if (response.success && response.data) {
        Alert.alert('Succès', `Paiement de €${response.data.amount.toFixed(2)} effectué`);
        queryClient.invalidateQueries({ queryKey: ['wallets'] });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors du paiement');
    },
  });

  // Deactivate QR code mutation
  const deactivateQRCodeMutation = useMutation({
    mutationFn: qrApi.deactivateQRCode,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert('Succès', 'QR code désactivé');
        queryClient.invalidateQueries({ queryKey: ['qr', 'codes'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la désactivation');
    },
  });

  // Update QR code mutation
  const updateQRCodeMutation = useMutation({
    mutationFn: ({ qrId, data }: { qrId: number; data: any }) =>
      qrApi.updateQRCode(qrId, data),
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert('Succès', 'QR code mis à jour');
        queryClient.invalidateQueries({ queryKey: ['qr', 'codes'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la mise à jour');
    },
  });

  // Delete QR code mutation
  const deleteQRCodeMutation = useMutation({
    mutationFn: qrApi.deleteQRCode,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert('Succès', 'QR code supprimé');
        queryClient.invalidateQueries({ queryKey: ['qr', 'codes'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la suppression');
    },
  });

  // Get QR code stats query
  const useQRCodeStats = (qrId: number) => {
    return useQuery({
      queryKey: ['qr', 'stats', qrId],
      queryFn: async () => {
        const response = await qrApi.getQRCodeStats(qrId);
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.message);
      },
      enabled: !!qrId,
    });
  };

  // Helper functions
  const generateQRCode = useCallback((data: GenerateQRCodeRequest) => {
    return generateQRCodeMutation.mutateAsync(data);
  }, [generateQRCodeMutation]);

  const processQRPayment = useCallback((data: ProcessQRPaymentRequest) => {
    return processQRPaymentMutation.mutateAsync(data);
  }, [processQRPaymentMutation]);

  const deactivateQRCode = useCallback((qrId: number) => {
    return deactivateQRCodeMutation.mutateAsync(qrId);
  }, [deactivateQRCodeMutation]);

  const updateQRCode = useCallback((qrId: number, data: any) => {
    return updateQRCodeMutation.mutateAsync({ qrId, data });
  }, [updateQRCodeMutation]);

  const deleteQRCode = useCallback((qrId: number) => {
    return deleteQRCodeMutation.mutateAsync(qrId);
  }, [deleteQRCodeMutation]);

  const refreshQRCodes = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey: ['qr', 'codes'] });
  }, [queryClient]);

  return {
    // State
    qrCodes: qrCodesQuery.data,
    isLoading: qrCodesQuery.isLoading,
    error: qrCodesQuery.error?.message,

    // Actions
    generateQRCode,
    processQRPayment,
    deactivateQRCode,
    updateQRCode,
    deleteQRCode,
    refreshQRCodes,
    useQRCodeStats,

    // Mutation states
    isGenerating: generateQRCodeMutation.isPending,
    isProcessingPayment: processQRPaymentMutation.isPending,
    isDeactivating: deactivateQRCodeMutation.isPending,
    isUpdating: updateQRCodeMutation.isPending,
    isDeleting: deleteQRCodeMutation.isPending,
  };
};
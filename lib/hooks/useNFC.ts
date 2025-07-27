import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Platform, Alert } from 'react-native';
import { nfcService, NFCPaymentData } from '../services/NFCService';
import { nfcApi } from '../api/nfcApi';
import { LinkNFCDeviceRequest, ProcessNFCPaymentRequest } from '../types';

export const useNFC = () => {
  const queryClient = useQueryClient();

  // Get all NFC devices query
  const devicesQuery = useQuery({
    queryKey: ['nfc', 'devices'],
    queryFn: async () => {
      const response = await nfcApi.getAllDevices();
      if (response.success && response.data) {
        return response.data.devices;
      }
      throw new Error(response.message);
    },
  });

  // Get devices for specific child
  const useChildDevices = (childId: number) => {
    return useQuery({
      queryKey: ['nfc', 'children', childId, 'devices'],
      queryFn: async () => {
        const response = await nfcApi.getDevices(childId);
        if (response.success && response.data) {
          return response.data.devices;
        }
        throw new Error(response.message);
      },
      enabled: !!childId,
    });
  };

  // Link NFC device mutation
  const linkDeviceMutation = useMutation({
    mutationFn: ({ childId, data }: { childId: number; data: LinkNFCDeviceRequest }) =>
      nfcApi.linkDevice(childId, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        Alert.alert('Succès', `Appareil NFC lié avec succès`);
        queryClient.invalidateQueries({ queryKey: ['nfc', 'children', variables.childId, 'devices'] });
        queryClient.invalidateQueries({ queryKey: ['nfc', 'devices'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la liaison');
    },
  });

  // Toggle device mutation
  const toggleDeviceMutation = useMutation({
    mutationFn: nfcApi.toggleDevice,
    onSuccess: (response) => {
      if (response.success && response.data) {
        Alert.alert('Succès', `Appareil ${response.data.isActive ? 'activé' : 'désactivé'}`);
        queryClient.invalidateQueries({ queryKey: ['nfc'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors du changement de statut');
    },
  });

  // Remove device mutation
  const removeDeviceMutation = useMutation({
    mutationFn: nfcApi.removeDevice,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert('Succès', 'Appareil supprimé');
        queryClient.invalidateQueries({ queryKey: ['nfc'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la suppression');
    },
  });

  // Process payment mutation
  const processPaymentMutation = useMutation({
    mutationFn: nfcApi.processPayment,
    onSuccess: (response) => {
      if (response.success && response.data) {
        Alert.alert('Succès', `Paiement de €${response.data.amount.toFixed(2)} effectué`);
        queryClient.invalidateQueries({ queryKey: ['children'] });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors du paiement');
    },
  });

  // Update device mutation
  const updateDeviceMutation = useMutation({
    mutationFn: ({ deviceId, data }: { deviceId: number; data: any }) =>
      nfcApi.updateDevice(deviceId, data),
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert('Succès', 'Appareil mis à jour');
        queryClient.invalidateQueries({ queryKey: ['nfc'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la mise à jour');
    },
  });

  // Get payment history query
  const usePaymentHistory = (nfcId: string) => {
    return useQuery({
      queryKey: ['nfc', 'payments', nfcId],
      queryFn: async () => {
        const response = await nfcApi.getPaymentHistory(nfcId);
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.message);
      },
      enabled: !!nfcId,
    });
  };

  // NFC Service methods (for hardware interaction)
  const scanForDevice = useCallback(async (): Promise<string | null> => {
    if (Platform.OS === 'web') {
      // Simulation for web
      return new Promise((resolve) => {
        setTimeout(() => resolve(`nfc_${Date.now()}`), 2000);
      });
    }
    return nfcService.scanForDevice();
  }, []);

  const startPaymentSession = useCallback(async (): Promise<NFCPaymentData | null> => {
    if (Platform.OS === 'web') {
      // Simulation for web
      return new Promise((resolve) => {
        setTimeout(() => resolve({
          amount: 25.00,
          merchant: 'Terminal NFC',
          userId: 'terminal_001',
          walletId: 'merchant_wallet',
          timestamp: new Date().toISOString()
        }), 3000);
      });
    }
    return nfcService.startPaymentSession();
  }, []);

  const writePaymentData = useCallback(async (data: NFCPaymentData): Promise<boolean> => {
    if (Platform.OS === 'web') {
      // Simulation for web
      console.log('Simulating NFC write:', data);
      return true;
    }
    return nfcService.writePaymentData(data);
  }, []);

  const readPaymentData = useCallback(async (): Promise<NFCPaymentData | null> => {
    if (Platform.OS === 'web') {
      // Simulation for web
      return {
        amount: 15.50,
        merchant: 'Café du Commerce',
        userId: 'user_123',
        walletId: 'wallet_456',
        timestamp: new Date().toISOString()
      };
    }
    return nfcService.readPaymentData();
  }, []);

  const stopScanning = useCallback(async (): Promise<void> => {
    if (Platform.OS !== 'web') {
      return nfcService.stopScanning();
    }
  }, []);

  const initializeNFC = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'web') {
      return true; // Simulation for web
    }
    return nfcService.initialize();
  }, []);

  // Helper functions
  const linkDevice = useCallback((childId: number, data: LinkNFCDeviceRequest) => {
    return linkDeviceMutation.mutateAsync({ childId, data });
  }, [linkDeviceMutation]);

  const toggleDevice = useCallback((deviceId: number) => {
    return toggleDeviceMutation.mutateAsync(deviceId);
  }, [toggleDeviceMutation]);

  const removeDevice = useCallback((deviceId: number) => {
    return removeDeviceMutation.mutateAsync(deviceId);
  }, [removeDeviceMutation]);

  const processPayment = useCallback((data: ProcessNFCPaymentRequest) => {
    return processPaymentMutation.mutateAsync(data);
  }, [processPaymentMutation]);

  const updateDevice = useCallback((deviceId: number, data: any) => {
    return updateDeviceMutation.mutateAsync({ deviceId, data });
  }, [updateDeviceMutation]);

  const refreshDevices = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey: ['nfc'] });
  }, [queryClient]);

  // Check NFC support and status
  const isNFCSupported = Platform.OS !== 'web';
  const isNFCEnabled = Platform.OS !== 'web';

  return {
    // State
    devices: devicesQuery.data,
    isLoading: devicesQuery.isLoading,
    error: devicesQuery.error?.message,

    // NFC Hardware status
    isNFCSupported,
    isNFCEnabled,

    // Hardware methods
    scanForDevice,
    startPaymentSession,
    writePaymentData,
    readPaymentData,
    stopScanning,
    initializeNFC,

    // API methods
    linkDevice,
    toggleDevice,
    removeDevice,
    processPayment,
    updateDevice,
    refreshDevices,
    useChildDevices,
    usePaymentHistory,

    // Mutation states
    isLinking: linkDeviceMutation.isPending,
    isToggling: toggleDeviceMutation.isPending,
    isRemoving: removeDeviceMutation.isPending,
    isProcessingPayment: processPaymentMutation.isPending,
    isUpdating: updateDeviceMutation.isPending,
  };
};
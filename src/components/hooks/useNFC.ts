import { useState, useEffect, useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import { nfcService, NFCPaymentData } from '../services/NFCService';

export interface UseNFCReturn {
  isNFCSupported: boolean;
  isNFCEnabled: boolean;
  isScanning: boolean;
  scanForDevice: () => Promise<string | null>;
  startPaymentSession: () => Promise<NFCPaymentData | null>;
  writePaymentData: (data: NFCPaymentData) => Promise<boolean>;
  readPaymentData: () => Promise<NFCPaymentData | null>;
  stopScanning: () => Promise<void>;
  initializeNFC: () => Promise<boolean>;
}

export const useNFC = (): UseNFCReturn => {
  const [isNFCSupported, setIsNFCSupported] = useState(false);
  const [isNFCEnabled, setIsNFCEnabled] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const initializeNFC = useCallback(async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'web') {
        setIsNFCSupported(true); // Simulation pour le web
        setIsNFCEnabled(true);
        return true;
      }

      const initialized = await nfcService.initialize();
      setIsNFCSupported(initialized);

      if (initialized) {
        const enabled = await nfcService.isEnabled();
        setIsNFCEnabled(enabled);
      }

      return initialized;
    } catch (error) {
      console.error('Error initializing NFC:', error);
      setIsNFCSupported(false);
      setIsNFCEnabled(false);
      return false;
    }
  }, []);

  const scanForDevice = useCallback(async (): Promise<string | null> => {
    try {
      setIsScanning(true);
      
      if (!isNFCSupported) {
        Alert.alert('Erreur', 'NFC non supporté sur cet appareil');
        return null;
      }

      if (!isNFCEnabled && Platform.OS !== 'web') {
        const hasPermission = await nfcService.requestPermissions();
        if (!hasPermission) {
          return null;
        }
      }

      const deviceId = await nfcService.scanForDevice();
      return deviceId;
    } catch (error) {
      console.error('Error scanning for NFC device:', error);
      Alert.alert('Erreur', 'Impossible de scanner l\'appareil NFC');
      return null;
    } finally {
      setIsScanning(false);
    }
  }, [isNFCSupported, isNFCEnabled]);

  const startPaymentSession = useCallback(async (): Promise<NFCPaymentData | null> => {
    try {
      setIsScanning(true);

      if (!isNFCSupported) {
        Alert.alert('Erreur', 'NFC non supporté sur cet appareil');
        return null;
      }

      if (!isNFCEnabled && Platform.OS !== 'web') {
        const hasPermission = await nfcService.requestPermissions();
        if (!hasPermission) {
          return null;
        }
      }

      const paymentData = await nfcService.startPaymentSession();
      return paymentData;
    } catch (error) {
      console.error('Error starting payment session:', error);
      Alert.alert('Erreur', 'Impossible de démarrer la session de paiement');
      return null;
    } finally {
      setIsScanning(false);
    }
  }, [isNFCSupported, isNFCEnabled]);

  const writePaymentData = useCallback(async (data: NFCPaymentData): Promise<boolean> => {
    try {
      if (!isNFCSupported) {
        Alert.alert('Erreur', 'NFC non supporté sur cet appareil');
        return false;
      }

      if (!isNFCEnabled && Platform.OS !== 'web') {
        const hasPermission = await nfcService.requestPermissions();
        if (!hasPermission) {
          return false;
        }
      }

      const success = await nfcService.writePaymentData(data);
      if (success) {
        Alert.alert('Succès', 'Données écrites sur l\'appareil NFC');
      } else {
        Alert.alert('Erreur', 'Impossible d\'écrire sur l\'appareil NFC');
      }
      return success;
    } catch (error) {
      console.error('Error writing payment data:', error);
      Alert.alert('Erreur', 'Erreur lors de l\'écriture des données');
      return false;
    }
  }, [isNFCSupported, isNFCEnabled]);

  const readPaymentData = useCallback(async (): Promise<NFCPaymentData | null> => {
    try {
      if (!isNFCSupported) {
        Alert.alert('Erreur', 'NFC non supporté sur cet appareil');
        return null;
      }

      if (!isNFCEnabled && Platform.OS !== 'web') {
        const hasPermission = await nfcService.requestPermissions();
        if (!hasPermission) {
          return null;
        }
      }

      const data = await nfcService.readPaymentData();
      return data;
    } catch (error) {
      console.error('Error reading payment data:', error);
      Alert.alert('Erreur', 'Impossible de lire l\'appareil NFC');
      return null;
    }
  }, [isNFCSupported, isNFCEnabled]);

  const stopScanning = useCallback(async (): Promise<void> => {
    try {
      await nfcService.stopScanning();
      setIsScanning(false);
    } catch (error) {
      console.error('Error stopping NFC scanning:', error);
    }
  }, []);

  useEffect(() => {
    initializeNFC();

    return () => {
      nfcService.cleanup();
    };
  }, [initializeNFC]);

  return {
    isNFCSupported,
    isNFCEnabled,
    isScanning,
    scanForDevice,
    startPaymentSession,
    writePaymentData,
    readPaymentData,
    stopScanning,
    initializeNFC,
  };
};
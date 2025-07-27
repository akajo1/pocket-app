import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import { Platform, Alert } from 'react-native';

export interface NFCDevice {
  id: string;
  type: 'bracelet' | 'tag';
  name: string;
  linkedAt: string;
  isActive: boolean;
  lastUsed?: string;
  nfcId?: string;
}

export interface NFCPaymentData {
  amount: number;
  merchant: string;
  userId: string;
  walletId: string;
  timestamp: string;
}

class NFCService {
  private isInitialized = false;

  async initialize(): Promise<boolean> {
    try {
      if (Platform.OS === 'web') {
        console.log('NFC not available on web platform');
        return false;
      }

      const isSupported = await NfcManager.isSupported();
      if (!isSupported) {
        console.log('NFC not supported on this device');
        return false;
      }

      await NfcManager.start();
      this.isInitialized = true;
      console.log('NFC Manager initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize NFC:', error);
      return false;
    }
  }

  async isEnabled(): Promise<boolean> {
    try {
      if (Platform.OS === 'web' || !this.isInitialized) {
        return false;
      }
      return await NfcManager.isEnabled();
    } catch (error) {
      console.error('Error checking NFC status:', error);
      return false;
    }
  }

  async requestPermissions(): Promise<boolean> {
    try {
      if (Platform.OS === 'web') {
        return false;
      }

      const isEnabled = await this.isEnabled();
      if (!isEnabled) {
        Alert.alert(
          'NFC désactivé',
          'Veuillez activer le NFC dans les paramètres de votre appareil',
          [
            { text: 'Annuler', style: 'cancel' },
            { text: 'Paramètres', onPress: () => NfcManager.goToNfcSetting() }
          ]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting NFC permissions:', error);
      return false;
    }
  }

  async scanForDevice(): Promise<string | null> {
    try {
      if (Platform.OS === 'web' || !this.isInitialized) {
        // Simulation pour le web
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(`nfc_${Date.now()}`);
          }, 3000);
        });
      }

      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return null;
      }

      // Scanner pour un tag NFC
      await NfcManager.requestTechnology(NfcTech.Ndef);
      
      const tag = await NfcManager.getTag();
      if (tag && tag.id) {
        return tag.id;
      }

      return null;
    } catch (error) {
      console.error('Error scanning NFC device:', error);
      return null;
    } finally {
      try {
        await NfcManager.cancelTechnologyRequest();
      } catch (error) {
        console.error('Error canceling NFC request:', error);
      }
    }
  }

  async writePaymentData(paymentData: NFCPaymentData): Promise<boolean> {
    try {
      if (Platform.OS === 'web' || !this.isInitialized) {
        // Simulation pour le web
        console.log('Simulating NFC write:', paymentData);
        return true;
      }

      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return false;
      }

      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([
        Ndef.textRecord(JSON.stringify(paymentData))
      ]);

      await NfcManager.ndefHandler.writeNdefMessage(bytes);
      return true;
    } catch (error) {
      console.error('Error writing to NFC device:', error);
      return false;
    } finally {
      try {
        await NfcManager.cancelTechnologyRequest();
      } catch (error) {
        console.error('Error canceling NFC request:', error);
      }
    }
  }

  async readPaymentData(): Promise<NFCPaymentData | null> {
    try {
      if (Platform.OS === 'web' || !this.isInitialized) {
        // Simulation pour le web
        return {
          amount: 15.50,
          merchant: 'Café du Commerce',
          userId: 'user_123',
          walletId: 'wallet_456',
          timestamp: new Date().toISOString()
        };
      }

      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return null;
      }

      await NfcManager.requestTechnology(NfcTech.Ndef);

      const tag = await NfcManager.getTag();
      if (tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
        const ndefRecord = tag.ndefMessage[0];
        const text = Ndef.text.decodePayload(ndefRecord.payload);
        
        try {
          const paymentData = JSON.parse(text);
          return paymentData;
        } catch (parseError) {
          console.error('Error parsing NFC data:', parseError);
          return null;
        }
      }

      return null;
    } catch (error) {
      console.error('Error reading NFC device:', error);
      return null;
    } finally {
      try {
        await NfcManager.cancelTechnologyRequest();
      } catch (error) {
        console.error('Error canceling NFC request:', error);
      }
    }
  }

  async startPaymentSession(): Promise<NFCPaymentData | null> {
    try {
      if (Platform.OS === 'web' || !this.isInitialized) {
        // Simulation pour le web
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              amount: 25.00,
              merchant: 'Terminal NFC',
              userId: 'terminal_001',
              walletId: 'merchant_wallet',
              timestamp: new Date().toISOString()
            });
          }, 3000);
        });
      }

      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return null;
      }

      // Démarrer une session de paiement NFC
      await NfcManager.requestTechnology([NfcTech.Ndef, NfcTech.IsoDep]);

      const tag = await NfcManager.getTag();
      if (tag) {
        // Lire les données de paiement du terminal
        const paymentData = await this.readPaymentData();
        return paymentData;
      }

      return null;
    } catch (error) {
      console.error('Error in payment session:', error);
      return null;
    } finally {
      try {
        await NfcManager.cancelTechnologyRequest();
      } catch (error) {
        console.error('Error canceling payment session:', error);
      }
    }
  }

  async stopScanning(): Promise<void> {
    try {
      if (Platform.OS !== 'web' && this.isInitialized) {
        await NfcManager.cancelTechnologyRequest();
      }
    } catch (error) {
      console.error('Error stopping NFC scanning:', error);
    }
  }

  async cleanup(): Promise<void> {
    try {
      if (Platform.OS !== 'web' && this.isInitialized) {
        await NfcManager.stop();
        this.isInitialized = false;
      }
    } catch (error) {
      console.error('Error cleaning up NFC:', error);
    }
  }
}

export const nfcService = new NFCService();
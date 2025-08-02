import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { Wifi, X, Smartphone, CreditCard } from 'lucide-react-native';
import Button from '../atoms/Button';
import { useNFC } from '../hooks/useNFC';

interface NFCLinkingModalProps {
  visible: boolean;
  onClose: () => void;
  childName: string;
  childId: number;
  onLinkSuccess: (nfcId: string, deviceType: string) => void;
}

export default function NFCLinkingModal({
  visible,
  onClose,
  childName,
  childId,
  onLinkSuccess
}: NFCLinkingModalProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDeviceType, setSelectedDeviceType] = useState<'bracelet' | 'tag' | null>(null);
  const { isNFCSupported, isNFCEnabled, scanForDevice } = useNFC();

  const deviceTypes = [
    {
      type: 'bracelet' as const,
      icon: Smartphone,
      title: 'Bracelet NFC',
      description: 'Bracelet connecté pour enfant',
      color: '#4F46E5'
    },
    {
      type: 'tag' as const,
      icon: CreditCard,
      title: 'Tag NFC',
      description: 'Étiquette NFC adhésive',
      color: '#059669'
    }
  ];

  const handleStartScanning = async (deviceType: 'bracelet' | 'tag') => {
    setSelectedDeviceType(deviceType);
    setIsScanning(true);
    
    try {
      if (!isNFCSupported) {
        Alert.alert('Erreur', 'NFC non supporté sur cet appareil');
        setIsScanning(false);
        return;
      }

      const nfcId = await scanForDevice();
      
      if (nfcId) {
        setIsScanning(false);
        onLinkSuccess(nfcId, deviceType);
        onClose();
        Alert.alert(
          'Succès',
          `${deviceType === 'bracelet' ? 'Bracelet' : 'Tag'} NFC lié avec succès à ${childName}!`
        );
      } else {
        setIsScanning(false);
        Alert.alert('Erreur', 'Aucun appareil NFC détecté');
      }
    } catch (error) {
      setIsScanning(false);
      Alert.alert('Erreur', 'Erreur lors de la liaison NFC');
    }
  };

  const handleClose = () => {
    setIsScanning(false);
    setSelectedDeviceType(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Lier un appareil NFC</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Choisissez le type d'appareil à lier pour {childName}
          </Text>

          {!isScanning ? (
            <View style={styles.deviceTypes}>
              {deviceTypes.map((device) => (
                <TouchableOpacity
                  key={device.type}
                  style={[styles.deviceCard, { borderColor: device.color }]}
                  onPress={() => handleStartScanning(device.type)}>
                  <View style={[styles.deviceIcon, { backgroundColor: device.color + '20' }]}>
                    <device.icon size={32} color={device.color} />
                  </View>
                  <Text style={styles.deviceTitle}>{device.title}</Text>
                  <Text style={styles.deviceDescription}>{device.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.scanningContainer}>
              <View style={styles.scanningIcon}>
                <Wifi size={64} color="#4F46E5" />
              </View>
              <Text style={styles.scanningTitle}>Détection en cours...</Text>
              <Text style={styles.scanningDescription}>
                Approchez le {selectedDeviceType === 'bracelet' ? 'bracelet' : 'tag'} NFC de votre appareil
              </Text>
              {!isNFCSupported && (
                <Text style={styles.webSimulationText}>
                  Mode simulation (NFC non disponible sur web)
                </Text>
              )}
              <View style={styles.scanningAnimation}>
                <View style={styles.pulse} />
                <View style={[styles.pulse, styles.pulseDelay1]} />
                <View style={[styles.pulse, styles.pulseDelay2]} />
              </View>
            </View>
          )}

          <View style={styles.instructions}>
            <Text style={styles.instructionsTitle}>Instructions :</Text>
            <Text style={styles.instructionText}>
              • Assurez-vous que le NFC est activé sur votre appareil
            </Text>
            <Text style={styles.instructionText}>
              • Maintenez l'appareil NFC près de votre téléphone
            </Text>
            <Text style={styles.instructionText}>
              • Attendez la confirmation de liaison
            </Text>
          </View>

          {isScanning && (
            <Button
              title="Annuler"
              onPress={handleClose}
              variant="secondary"
              style={styles.cancelButton}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  deviceTypes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  deviceCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginHorizontal: 8,
  },
  deviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  deviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  deviceDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  scanningContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  scanningIcon: {
    position: 'relative',
    marginBottom: 24,
  },
  scanningTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  scanningDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  scanningAnimation: {
    position: 'absolute',
    top: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4F46E5',
    opacity: 0.3,
  },
  pulseDelay1: {
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.2,
  },
  pulseDelay2: {
    width: 140,
    height: 140,
    borderRadius: 70,
    opacity: 0.1,
  },
  instructions: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  cancelButton: {
    marginTop: 8,
  },
  webSimulationText: {
    fontSize: 12,
    color: '#F59E0B',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
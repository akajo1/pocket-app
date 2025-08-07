import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Wifi, X, CircleCheck as CheckCircle, CreditCard } from 'lucide-react-native';
import { useNFC } from '../hooks/useNFC';
import Button from '../atoms/Button';

interface NFCWriteModalProps {
  visible: boolean;
  onClose: () => void;
  onWriteSuccess: (data: any) => void;
}

export default function NFCWriteModal({ visible, onClose, onWriteSuccess }: NFCWriteModalProps) {
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [description, setDescription] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [writeComplete, setWriteComplete] = useState(false);
  const { isNFCSupported, writePaymentData } = useNFC();

  const quickAmounts = [5, 10, 20, 50];

  const handleWriteData = async () => {
    const writeAmount = parseFloat(amount);
    if (!writeAmount || writeAmount <= 0) {
      Alert.alert('Erreur', 'Veuillez entrer un montant valide');
      return;
    }

    if (!merchant.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer le nom du marchand');
      return;
    }

    if (!isNFCSupported) {
      Alert.alert('Erreur', 'NFC non supporté sur cet appareil');
      return;
    }

    setIsWriting(true);

    try {
      const paymentData = {
        amount: writeAmount,
        merchant: merchant.trim(),
        userId: 'merchant_terminal',
        walletId: 'merchant_wallet',
        timestamp: new Date().toISOString()
      };

      const success = await writePaymentData(paymentData);
      
      if (success) {
        setIsWriting(false);
        setWriteComplete(true);
        
        setTimeout(() => {
          onWriteSuccess({
            ...paymentData,
            description: description.trim() || `Paiement ${merchant.trim()}`
          });
          handleClose();
        }, 2000);
      } else {
        setIsWriting(false);
        Alert.alert('Erreur', 'Impossible d\'écrire sur l\'appareil NFC');
      }
    } catch (error) {
      setIsWriting(false);
      Alert.alert('Erreur', 'Erreur lors de l\'écriture des données NFC');
    }
  };

  const handleClose = () => {
    setAmount('');
    setMerchant('');
    setDescription('');
    setIsWriting(false);
    setWriteComplete(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <CreditCard size={24} color="#7C3AED" />
              </View>
              <Text style={styles.modalTitle}>Programmer NFC</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {!isWriting && !writeComplete && (
            <>
              <Text style={styles.subtitle}>
                Programmez un tag NFC avec des données de paiement
              </Text>

              {/* Amount Input */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Montant (€)</Text>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  keyboardType="numeric"
                  placeholderTextColor="#9CA3AF"
                />
                
                <View style={styles.quickAmountsContainer}>
                  <Text style={styles.quickAmountsLabel}>Montants rapides</Text>
                  <View style={styles.quickAmounts}>
                    {quickAmounts.map((quickAmount) => (
                      <TouchableOpacity
                        key={quickAmount}
                        style={styles.quickAmountButton}
                        onPress={() => setAmount(quickAmount.toString())}>
                        <Text style={styles.quickAmountText}>€{quickAmount}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {/* Merchant Input */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Marchand</Text>
                <TextInput
                  style={styles.merchantInput}
                  value={merchant}
                  onChangeText={setMerchant}
                  placeholder="Nom du marchand"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Description Input */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description (optionnel)</Text>
                <TextInput
                  style={styles.descriptionInput}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Description du paiement"
                  multiline
                  numberOfLines={2}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Instructions */}
              <View style={styles.instructions}>
                <Text style={styles.instructionsTitle}>Instructions :</Text>
                <Text style={styles.instructionText}>
                  • Assurez-vous que le NFC est activé sur votre appareil
                </Text>
                <Text style={styles.instructionText}>
                  • Approchez le tag NFC de votre téléphone
                </Text>
                <Text style={styles.instructionText}>
                  • Maintenez la position jusqu'à confirmation
                </Text>
              </View>

              {/* Write Button */}
              <Button
                title="Programmer le tag NFC"
                onPress={handleWriteData}
                disabled={!amount || !merchant.trim()}
                style={styles.writeButton}
              />
            </>
          )}

          {isWriting && (
            <View style={styles.writingContainer}>
              <View style={styles.writingIcon}>
                <Wifi size={64} color="#7C3AED" />
              </View>
              <Text style={styles.writingTitle}>Programmation en cours...</Text>
              <Text style={styles.writingDescription}>
                Maintenez le tag NFC près de votre appareil
              </Text>
              {!isNFCSupported && (
                <Text style={styles.webSimulationText}>
                  Mode simulation (NFC non disponible sur web)
                </Text>
              )}
              <Text style={styles.amountDisplay}>€{amount}</Text>
              <Text style={styles.merchantDisplay}>{merchant}</Text>
            </View>
          )}

          {writeComplete && (
            <View style={styles.successContainer}>
              <View style={styles.successIcon}>
                <CheckCircle size={64} color="#059669" />
              </View>
              <Text style={styles.successTitle}>Tag programmé avec succès !</Text>
              <Text style={styles.successAmount}>€{amount}</Text>
              <Text style={styles.successMerchant}>{merchant}</Text>
              <Text style={styles.successDescription}>
                Le tag NFC est maintenant prêt à être utilisé pour les paiements
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7C3AED' + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  amountInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  merchantInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  descriptionInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    textAlignVertical: 'top',
    minHeight: 60,
  },
  quickAmountsContainer: {
    marginTop: 12,
  },
  quickAmountsLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7C3AED',
  },
  instructions: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
  writeButton: {
    backgroundColor: '#7C3AED',
  },
  writingContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  writingIcon: {
    marginBottom: 24,
  },
  writingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  writingDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  webSimulationText: {
    fontSize: 12,
    color: '#F59E0B',
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  amountDisplay: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginBottom: 8,
  },
  merchantDisplay: {
    fontSize: 16,
    color: '#6B7280',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 16,
    textAlign: 'center',
  },
  successAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  successMerchant: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  successDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
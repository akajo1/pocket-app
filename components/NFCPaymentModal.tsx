import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Zap, X, Wifi, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useNFC } from './hooks/useNFC';

interface NFCPaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onPaymentSuccess: (paymentData: any) => void;
}

export default function NFCPaymentModal({ visible, onClose, onPaymentSuccess }: NFCPaymentModalProps) {
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const { isNFCSupported, isNFCEnabled, startPaymentSession } = useNFC();

  const quickAmounts = [5, 10, 25, 50];

  const handleStartPayment = async () => {
    const paymentAmount = parseFloat(amount);
    if (!paymentAmount || paymentAmount <= 0) {
      Alert.alert('Erreur', 'Veuillez entrer un montant valide');
      return;
    }

    if (!isNFCSupported) {
      Alert.alert('Erreur', 'NFC non supporté sur cet appareil');
      return;
    }

    setIsScanning(true);
    
    try {
      const nfcPaymentData = await startPaymentSession();
      
      if (nfcPaymentData) {
        setIsProcessing(false);
        setPaymentComplete(true);
        
        const paymentData = {
          amount: paymentAmount,
          merchant: merchant || nfcPaymentData.merchant || 'Terminal NFC',
          method: 'NFC',
          timestamp: new Date().toISOString(),
          transactionId: `nfc_${Date.now()}`
        };
        
        setTimeout(() => {
          onPaymentSuccess(paymentData);
          handleClose();
        }, 2000);
      } else {
        setIsProcessing(false);
        Alert.alert('Erreur', 'Aucun terminal NFC détecté');
      }
    } catch (error) {
      setIsProcessing(false);
      Alert.alert('Erreur', 'Erreur lors du paiement NFC');
    }
  };

  const handleClose = () => {
    setAmount('');
    setMerchant('');
    setIsScanning(false);
    setPaymentComplete(false);
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
                <Zap size={24} color="#DC2626" />
              </View>
              <Text style={styles.modalTitle}>Paiement NFC</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {!isScanning && !paymentComplete && (
            <>
              <Text style={styles.subtitle}>
                Configurez votre paiement sans contact
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
                <Text style={styles.sectionTitle}>Marchand (optionnel)</Text>
                <TextInput
                  style={styles.merchantInput}
                  value={merchant}
                  onChangeText={setMerchant}
                  placeholder="Nom du marchand"
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
                  • Approchez votre téléphone du terminal de paiement
                </Text>
                <Text style={styles.instructionText}>
                  • Maintenez la position jusqu'à confirmation
                </Text>
              </View>

              {/* Action Button */}
              <TouchableOpacity 
                style={[
                  styles.payButton,
                  (!amount) && styles.payButtonDisabled
                ]}
                onPress={handleStartPayment}
                disabled={!amount}>
                <Zap size={20} color="#FFFFFF" />
                <Text style={styles.payButtonText}>Commencer le paiement</Text>
              </TouchableOpacity>
            </>
          )}

          {isScanning && (
            <View style={styles.scanningContainer}>
              <View style={styles.scanningIcon}>
                <Wifi size={64} color="#DC2626" />
              </View>
              <Text style={styles.scanningTitle}>Paiement en cours...</Text>
              <Text style={styles.scanningDescription}>
                Maintenez votre appareil près du terminal NFC
              </Text>
              {!isNFCSupported && (
                <Text style={styles.webSimulationText}>
                  Mode simulation (NFC non disponible sur web)
                </Text>
              )}
              <Text style={styles.amountDisplay}>€{amount}</Text>
              <View style={styles.scanningAnimation}>
                <View style={styles.pulse} />
                <View style={[styles.pulse, styles.pulseDelay1]} />
                <View style={[styles.pulse, styles.pulseDelay2]} />
              </View>
            </View>
          )}

          {paymentComplete && (
            <View style={styles.successContainer}>
              <View style={styles.successIcon}>
                <CheckCircle size={64} color="#059669" />
              </View>
              <Text style={styles.successTitle}>Paiement réussi !</Text>
              <Text style={styles.successAmount}>€{amount}</Text>
              <Text style={styles.successMerchant}>
                {merchant || 'Marchand NFC'}
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
    backgroundColor: '#DC2626' + '20',
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
    color: '#DC2626',
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
  payButton: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
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
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  scanningDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  amountDisplay: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#DC2626',
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
    backgroundColor: '#DC2626',
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
  successContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 16,
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
  },
  webSimulationText: {
    fontSize: 12,
    color: '#F59E0B',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
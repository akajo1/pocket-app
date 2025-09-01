import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Smartphone, X, CircleCheck as CheckCircle } from 'lucide-react-native';

interface NetworkCreditModalProps {
  visible: boolean;
  onClose: () => void;
  onPurchaseSuccess: (purchaseData: any) => void;
}

export default function NetworkCreditModal({ visible, onClose, onPurchaseSuccess }: NetworkCreditModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const operators = [
    { id: 'orange', name: 'Orange', color: '#FF6600' },
    { id: 'mtn', name: 'MTN', color: '#FFCC00' },
    { id: 'airtel', name: 'Airtel', color: '#FF0000' },
    { id: 'vodacom', name: 'Vodacom', color: '#E60000' },
  ];

  const creditAmounts = [
    { value: '1000', label: '1 000 FC', euros: 0.50 },
    { value: '2000', label: '2 000 FC', euros: 1.00 },
    { value: '5000', label: '5 000 FC', euros: 2.50 },
    { value: '10000', label: '10 000 FC', euros: 5.00 },
    { value: '20000', label: '20 000 FC', euros: 10.00 },
    { value: '50000', label: '50 000 FC', euros: 25.00 },
  ];

  const handlePurchase = () => {
    if (!phoneNumber || !selectedOperator || !selectedAmount) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (phoneNumber.length < 9) {
      Alert.alert('Erreur', 'Numéro de téléphone invalide');
      return;
    }

    setIsProcessing(true);
    
    // Simuler l'achat de crédit
    setTimeout(() => {
      setIsProcessing(false);
      setPurchaseComplete(true);
      
      const operator = operators.find(op => op.id === selectedOperator);
      const amount = creditAmounts.find(amt => amt.value === selectedAmount);
      
      const purchaseData = {
        phoneNumber,
        operator: operator?.name,
        amount: parseInt(selectedAmount),
        euros: amount?.euros,
        timestamp: new Date().toISOString(),
        transactionId: `credit_${Date.now()}`
      };
      
      setTimeout(() => {
        onPurchaseSuccess(purchaseData);
        handleClose();
      }, 2000);
    }, 3000);
  };

  const handleClose = () => {
    setPhoneNumber('');
    setSelectedOperator('');
    setSelectedAmount('');
    setIsProcessing(false);
    setPurchaseComplete(false);
    onClose();
  };

  const formatPhoneNumber = (text: string) => {
    // Supprimer tous les caractères non numériques
    const cleaned = text.replace(/\D/g, '');
    
    // Limiter à 10 chiffres
    const limited = cleaned.substring(0, 10);
    
    // Formater avec des espaces
    if (limited.length >= 6) {
      return `${limited.substring(0, 3)} ${limited.substring(3, 6)} ${limited.substring(6)}`;
    } else if (limited.length >= 3) {
      return `${limited.substring(0, 3)} ${limited.substring(3)}`;
    }
    return limited;
  };

  const selectedAmountData = creditAmounts.find(amt => amt.value === selectedAmount);

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
                <Smartphone size={24} color="#6B7280" />
              </View>
              <Text style={styles.modalTitle}>Crédit téléphonique</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {!isProcessing && !purchaseComplete && (
            <>
              <Text style={styles.subtitle}>
                Achetez du crédit pour votre téléphone
              </Text>

              {/* Phone Number Input */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Numéro de téléphone</Text>
                <TextInput
                  style={styles.phoneInput}
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
                  placeholder="097 123 4567"
                  keyboardType="phone-pad"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Operator Selection */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Opérateur</Text>
                <View style={styles.operatorsGrid}>
                  {operators.map((operator) => (
                    <TouchableOpacity
                      key={operator.id}
                      style={[
                        styles.operatorButton,
                        selectedOperator === operator.id && {
                          backgroundColor: operator.color + '20',
                          borderColor: operator.color
                        }
                      ]}
                      onPress={() => setSelectedOperator(operator.id)}>
                      <Text style={[
                        styles.operatorText,
                        selectedOperator === operator.id && {
                          color: operator.color,
                          fontWeight: '600'
                        }
                      ]}>
                        {operator.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Amount Selection */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Montant du crédit</Text>
                <View style={styles.amountsGrid}>
                  {creditAmounts.map((amount) => (
                    <TouchableOpacity
                      key={amount.value}
                      style={[
                        styles.amountButton,
                        selectedAmount === amount.value && styles.amountButtonSelected
                      ]}
                      onPress={() => setSelectedAmount(amount.value)}>
                      <Text style={[
                        styles.amountText,
                        selectedAmount === amount.value && styles.amountTextSelected
                      ]}>
                        {amount.label}
                      </Text>
                      <Text style={[
                        styles.amountEuros,
                        selectedAmount === amount.value && styles.amountEurosSelected
                      ]}>
                        €{amount.euros.toFixed(2)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Purchase Summary */}
              {selectedAmountData && (
                <View style={styles.summary}>
                  <Text style={styles.summaryTitle}>Résumé de l'achat</Text>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Crédit</Text>
                    <Text style={styles.summaryValue}>{selectedAmountData.label}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Coût</Text>
                    <Text style={styles.summaryValue}>€{selectedAmountData.euros.toFixed(2)}</Text>
                  </View>
                </View>
              )}

              {/* Purchase Button */}
              <TouchableOpacity 
                style={[
                  styles.purchaseButton,
                  (!phoneNumber || !selectedOperator || !selectedAmount) && styles.purchaseButtonDisabled
                ]}
                onPress={handlePurchase}
                disabled={!phoneNumber || !selectedOperator || !selectedAmount}>
                <Smartphone size={20} color="#FFFFFF" />
                <Text style={styles.purchaseButtonText}>Acheter le crédit</Text>
              </TouchableOpacity>
            </>
          )}

          {isProcessing && (
            <View style={styles.processingContainer}>
              <View style={styles.processingIcon}>
                <Smartphone size={64} color="#6B7280" />
              </View>
              <Text style={styles.processingTitle}>Achat en cours...</Text>
              <Text style={styles.processingDescription}>
                Traitement de votre demande de crédit
              </Text>
              {selectedAmountData && (
                <Text style={styles.processingAmount}>{selectedAmountData.label}</Text>
              )}
            </View>
          )}

          {purchaseComplete && (
            <View style={styles.successContainer}>
              <View style={styles.successIcon}>
                <CheckCircle size={64} color="#059669" />
              </View>
              <Text style={styles.successTitle}>Crédit acheté avec succès !</Text>
              {selectedAmountData && (
                <>
                  <Text style={styles.successAmount}>{selectedAmountData.label}</Text>
                  <Text style={styles.successPhone}>{phoneNumber}</Text>
                  <Text style={styles.successOperator}>
                    {operators.find(op => op.id === selectedOperator)?.name}
                  </Text>
                </>
              )}
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
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 34,
    maxHeight: '90%',
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
    backgroundColor: '#6B7280' + '20',
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
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  phoneInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    textAlign: 'center',
    letterSpacing: 1,
  },
  operatorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  operatorButton: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  operatorText: {
    fontSize: 16,
    color: '#6B7280',
  },
  amountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amountButton: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  amountButtonSelected: {
    backgroundColor: '#6B7280' + '20',
    borderColor: '#6B7280',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  amountTextSelected: {
    color: '#6B7280',
  },
  amountEuros: {
    fontSize: 12,
    color: '#6B7280',
  },
  amountEurosSelected: {
    color: '#6B7280',
    fontWeight: '600',
  },
  summary: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  purchaseButton: {
    backgroundColor: '#6B7280',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  purchaseButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  processingContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  processingIcon: {
    marginBottom: 24,
  },
  processingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  processingDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  processingAmount: {
    fontSize: 18,
    fontWeight: 'bold',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  successPhone: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  successOperator: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
});
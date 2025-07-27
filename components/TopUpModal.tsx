import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Plus, X, CreditCard, Building2, Smartphone } from 'lucide-react-native';

interface TopUpModalProps {
  visible: boolean;
  onClose: () => void;
  onTopUp: (amount: number, method: string) => void;
}

export default function TopUpModal({ visible, onClose, onTopUp }: TopUpModalProps) {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('card');

  const paymentMethods = [
    { id: 'card', label: 'Carte bancaire', icon: CreditCard, color: '#4F46E5' },
    { id: 'bank', label: 'Virement bancaire', icon: Building2, color: '#059669' },
    { id: 'mobile', label: 'Paiement mobile', icon: Smartphone, color: '#DC2626' },
  ];

  const quickAmounts = [10, 20, 50, 100];

  const handleTopUp = () => {
    const topUpAmount = parseFloat(amount);
    if (topUpAmount && topUpAmount > 0) {
      const method = paymentMethods.find(m => m.id === selectedMethod)?.label || 'Carte bancaire';
      onTopUp(topUpAmount, method);
      setAmount('');
      onClose();
    }
  };

  const resetForm = () => {
    setAmount('');
    setSelectedMethod('card');
  };

  const handleClose = () => {
    resetForm();
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
                <Plus size={24} color="#059669" />
              </View>
              <Text style={styles.modalTitle}>Recharger le portefeuille</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Payment Method Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Méthode de paiement</Text>
            <View style={styles.paymentMethods}>
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                const isSelected = selectedMethod === method.id;
                return (
                  <TouchableOpacity
                    key={method.id}
                    style={[
                      styles.paymentMethodButton,
                      isSelected && { backgroundColor: method.color + '20', borderColor: method.color }
                    ]}
                    onPress={() => setSelectedMethod(method.id)}>
                    <IconComponent 
                      size={20} 
                      color={isSelected ? method.color : '#6B7280'} 
                    />
                    <Text style={[
                      styles.paymentMethodText,
                      isSelected && { color: method.color, fontWeight: '600' }
                    ]}>
                      {method.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

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

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleClose}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.topUpButton,
                (!amount) && styles.topUpButtonDisabled
              ]}
              onPress={handleTopUp}
              disabled={!amount}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.topUpButtonText}>Recharger</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#059669' + '20',
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 12,
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
  quickAmountsContainer: {
    marginTop: 16,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  topUpButton: {
    flex: 2,
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  topUpButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  topUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
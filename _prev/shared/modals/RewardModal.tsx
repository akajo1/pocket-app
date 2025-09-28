import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Gift, X, Star, Trophy, Heart, Zap } from 'lucide-react-native';

interface RewardModalProps {
  visible: boolean;
  onClose: () => void;
  childName: string;
  onGiveReward: (amount: number, reason: string, type: string) => void;
}

export default function RewardModal({ visible, onClose, childName, onGiveReward }: RewardModalProps) {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [selectedType, setSelectedType] = useState('achievement');

  const rewardTypes = [
    { id: 'achievement', label: 'Réussite', icon: Trophy, color: '#F59E0B' },
    { id: 'behavior', label: 'Bon comportement', icon: Heart, color: '#EF4444' },
    { id: 'chores', label: 'Tâches ménagères', icon: Star, color: '#10B981' },
    { id: 'special', label: 'Occasion spéciale', icon: Gift, color: '#8B5CF6' },
  ];

  const quickAmounts = [5, 10, 15, 25];

  const quickReasons = [
    'Excellentes notes',
    'Aide à la maison',
    'Bon comportement',
    'Effort particulier',
    'Anniversaire',
    'Réussite sportive'
  ];

  const handleGiveReward = () => {
    const rewardAmount = parseFloat(amount);
    if (rewardAmount && rewardAmount > 0 && reason.trim()) {
      onGiveReward(rewardAmount, reason.trim(), selectedType);
      setAmount('');
      setReason('');
      setSelectedType('achievement');
      onClose();
    }
  };

  const resetForm = () => {
    setAmount('');
    setReason('');
    setSelectedType('achievement');
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
              <View style={styles.giftIconContainer}>
                <Gift size={24} color="#8B5CF6" />
              </View>
              <View>
                <Text style={styles.modalTitle}>Donner une récompense</Text>
                <Text style={styles.modalSubtitle}>à {childName}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Reward Type Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Type de récompense</Text>
              <View style={styles.rewardTypesGrid}>
                {rewardTypes.map((type) => {
                  const IconComponent = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <TouchableOpacity
                      key={type.id}
                      style={[
                        styles.rewardTypeButton,
                        isSelected && { backgroundColor: type.color + '20', borderColor: type.color }
                      ]}
                      onPress={() => setSelectedType(type.id)}>
                      <IconComponent 
                        size={20} 
                        color={isSelected ? type.color : '#6B7280'} 
                      />
                      <Text style={[
                        styles.rewardTypeText,
                        isSelected && { color: type.color, fontWeight: '600' }
                      ]}>
                        {type.label}
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

            {/* Reason Input */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Raison de la récompense</Text>
              <TextInput
                style={styles.reasonInput}
                value={reason}
                onChangeText={setReason}
                placeholder="Pourquoi cette récompense ?"
                multiline
                numberOfLines={3}
                placeholderTextColor="#9CA3AF"
              />
              
              <View style={styles.quickReasonsContainer}>
                <Text style={styles.quickReasonsLabel}>Suggestions</Text>
                <View style={styles.quickReasons}>
                  {quickReasons.map((quickReason, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.quickReasonButton}
                      onPress={() => setReason(quickReason)}>
                      <Text style={styles.quickReasonText}>{quickReason}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleClose}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.rewardButton,
                (!amount || !reason.trim()) && styles.rewardButtonDisabled
              ]}
              onPress={handleGiveReward}
              disabled={!amount || !reason.trim()}>
              <Gift size={20} color="#FFFFFF" />
              <Text style={styles.rewardButtonText}>Donner la récompense</Text>
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
  giftIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8B5CF6' + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
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
  rewardTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rewardTypeButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  rewardTypeText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
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
    color: '#8B5CF6',
  },
  reasonInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  quickReasonsContainer: {
    marginTop: 16,
  },
  quickReasonsLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  quickReasons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickReasonButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  quickReasonText: {
    fontSize: 12,
    color: '#6B7280',
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
  rewardButton: {
    flex: 2,
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  rewardButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  rewardButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, MoveHorizontal as MoreHorizontal, Eye, EyeOff, Lock, Clock as Unlock } from 'lucide-react-native';
import TransactionDetailModal from '@/components/modals/TransactionDetailModal';
import TransactionAnalytics from '@/components/charts/TransactionAnalytics';

export default function CardsScreen() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [showTransactionDetailModal, setShowTransactionDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const cards = [
    {
      id: 1,
      type: 'Principal',
      balance: 2345.67,
      cardNumber: '4567',
      expiry: '12/27',
      gradient: ['#4F46E5', '#7C3AED'],
      isActive: true,
      recentTransactions: [
        {
          id: 1,
          type: 'expense',
          title: 'Supermarché Carrefour',
          description: 'Courses alimentaires',
          amount: 78.90,
          date: '2024-01-15',
          time: '18:20',
          category: 'Alimentation',
          status: 'completed',
          location: 'Carrefour Market, Paris',
          merchant: 'Carrefour Market',
          cardUsed: '•••• 4567',
          reference: 'CAR-2024-001'
        },
        {
          id: 2,
          type: 'expense',
          title: 'Station essence Total',
          description: 'Plein d\'essence',
          amount: 65.40,
          date: '2024-01-14',
          time: '08:15',
          category: 'Transport',
          status: 'completed',
          location: 'Total Access, Avenue de la République',
          merchant: 'Total',
          cardUsed: '•••• 4567',
          reference: 'TOT-2024-001'
        }
      ]
    },
    {
      id: 2,
      type: 'Épargne',
      balance: 8912.34,
      cardNumber: '5678',
      expiry: '09/26',
      gradient: ['#111827', '#374151'],
      isActive: true,
      recentTransactions: [
        {
          id: 3,
          type: 'income',
          title: 'Virement épargne',
          description: 'Transfert automatique',
          amount: 500.00,
          date: '2024-01-15',
          time: '00:01',
          category: 'Épargne',
          status: 'completed',
          location: 'Transfert automatique',
          reference: 'EPA-2024-001'
        }
      ]
    },
    {
      id: 3,
      type: 'Factures',
      balance: 456.78,
      cardNumber: '9012',
      expiry: '03/28',
      gradient: ['#059669', '#10B981'],
      isActive: false,
      recentTransactions: [
        {
          id: 4,
          type: 'expense',
          title: 'Facture électricité',
          description: 'EDF - Paiement mensuel',
          amount: 89.50,
          date: '2024-01-14',
          time: '14:30',
          category: 'Utilities',
          status: 'completed',
          location: 'Paiement automatique',
          merchant: 'EDF',
          cardUsed: '•••• 9012',
          reference: 'EDF-2024-001'
        }
      ]
    },
  ];

  const cardSettings = [
    { icon: Lock, label: 'Bloquer la carte', action: 'block' },
    { icon: Eye, label: 'Afficher le PIN', action: 'showPin' },
    { icon: Plus, label: 'Ajouter au wallet', action: 'addToWallet' },
  ];

  const handleTransactionPress = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetailModal(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mes Cartes</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color="#4F46E5" />
          </TouchableOpacity>
        </View>

        {/* Recent Transactions for Selected Card */}
        {cards[selectedCard].recentTransactions && cards[selectedCard].recentTransactions.length > 0 && (
          <View style={styles.recentTransactions}>
            <Text style={styles.sectionTitle}>Transactions récentes</Text>
            {cards[selectedCard].recentTransactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                style={styles.transactionItem}
                onPress={() => handleTransactionPress(transaction)}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.transactionEmoji}>
                    {transaction.type === 'income' ? '📈' : '💳'}
                  </Text>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <Text style={styles.transactionDate}>{transaction.date} • {transaction.time}</Text>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.type === 'income' ? '#059669' : '#DC2626' }
                ]}>
                  {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Analytics for Selected Card */}
        <TransactionAnalytics transactions={cards[selectedCard].recentTransactions || []} />

        {/* Cards Carousel */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.cardsContainer}>
          {cards.map((card, index) => (
            <TouchableOpacity
              key={card.id}
              onPress={() => setSelectedCard(index)}
              style={styles.cardWrapper}>
              <LinearGradient
                colors={card.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardType}>{card.type}</Text>
                  <TouchableOpacity>
                    <MoreHorizontal size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.cardBalance}>
                  €{card.balance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                </Text>
                
                <Text style={styles.cardNumber}>
                  •••• •••• •••• {card.cardNumber}
                </Text>
                
                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.cardLabel}>Expire</Text>
                    <Text style={styles.cardExpiry}>{card.expiry}</Text>
                  </View>
                  <View style={styles.cardStatus}>
                    {card.isActive ? (
                      <Unlock size={16} color="#FFFFFF" />
                    ) : (
                      <Lock size={16} color="#FFFFFF" />
                    )}
                    <Text style={styles.statusText}>
                      {card.isActive ? 'Active' : 'Bloquée'}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Card Indicators */}
        <View style={styles.indicators}>
          {cards.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                { backgroundColor: selectedCard === index ? '#4F46E5' : '#E5E7EB' }
              ]}
            />
          ))}
        </View>

        {/* Card Details */}
        <View style={styles.cardDetails}>
          <Text style={styles.sectionTitle}>Détails de la carte</Text>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Numéro de carte</Text>
            <View style={styles.detailValue}>
              <Text style={styles.detailText}>
                •••• •••• •••• {cards[selectedCard].cardNumber}
              </Text>
              <TouchableOpacity>
                <Eye size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date d'expiration</Text>
            <Text style={styles.detailText}>{cards[selectedCard].expiry}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>CVV</Text>
            <View style={styles.detailValue}>
              <Text style={styles.detailText}>•••</Text>
              <TouchableOpacity>
                <Eye size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Card Actions */}
        <View style={styles.cardActions}>
          <Text style={styles.sectionTitle}>Actions</Text>
          {cardSettings.map((setting, index) => (
            <TouchableOpacity key={index} style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <setting.icon size={20} color="#6B7280" />
              </View>
              <Text style={styles.actionLabel}>{setting.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add New Card */}
        <TouchableOpacity style={styles.addCardButton}>
          <LinearGradient
            colors={['#F3F4F6', '#E5E7EB']}
            style={styles.addCardGradient}>
            <Plus size={32} color="#9CA3AF" />
            <Text style={styles.addCardText}>Ajouter une nouvelle carte</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        visible={showTransactionDetailModal}
        onClose={() => setShowTransactionDetailModal(false)}
        transaction={selectedTransaction}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardsContainer: {
    paddingLeft: 20,
    marginVertical: 16,
  },
  cardWrapper: {
    marginRight: 16,
  },
  card: {
    width: 320,
    height: 200,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardType: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.9,
  },
  cardBalance: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    opacity: 0.8,
    marginBottom: 20,
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  cardExpiry: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cardStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  cardDetails: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  detailValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
    marginRight: 8,
  },
  cardActions: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  actionIcon: {
    marginRight: 16,
  },
  actionLabel: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  addCardButton: {
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  addCardGradient: {
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 16,
  },
  addCardText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 8,
  },
  recentTransactions: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionEmoji: {
    fontSize: 18,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  transactionDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
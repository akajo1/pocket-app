import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Search, Filter, TrendingUp, TrendingDown, Calendar, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import TransactionDetailModal from '@/components/modals/TransactionDetailModal';
import TransactionAnalytics from '@/components/charts/TransactionAnalytics';

export default function TransactionsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filters = [
    { key: 'all', label: 'Toutes' },
    { key: 'income', label: 'Revenus' },
    { key: 'expenses', label: 'Dépenses' },
    { key: 'transfers', label: 'Transferts' },
  ];

  const transactions = [
    {
      id: 1,
      type: 'income',
      title: 'Salaire mensuel',
      description: 'Virement automatique',
      amount: 2500.00,
      date: '2024-01-15',
      time: '09:00',
      category: 'Salaire',
      status: 'completed',
      location: 'Virement automatique',
      merchant: 'Entreprise ABC',
      cardUsed: '•••• 4567',
      reference: 'SAL-2024-001',
    },
    {
      id: 2,
      type: 'expense',
      title: 'Facture électricité',
      description: 'EDF - Paiement automatique',
      amount: 89.50,
      date: '2024-01-14',
      time: '14:30',
      category: 'Utilities',
      status: 'completed',
      location: 'Paiement en ligne',
      merchant: 'EDF',
      cardUsed: '•••• 4567',
      reference: 'EDF-2024-001',
    },
    {
      id: 3,
      type: 'transfer',
      title: 'Transfert vers Emma',
      description: 'Argent de poche',
      amount: 25.00,
      date: '2024-01-14',
      time: '10:15',
      category: 'Famille',
      status: 'completed',
      location: 'Transfert interne',
      reference: 'TRF-2024-001',
    },
    {
      id: 4,
      type: 'income',
      title: 'Remboursement',
      description: 'Assurance santé',
      amount: 156.80,
      date: '2024-01-13',
      time: '16:45',
      category: 'Remboursement',
      status: 'completed',
      location: 'Virement automatique',
      merchant: 'Assurance Santé Plus',
      reference: 'RMB-2024-001',
    },
    {
      id: 5,
      type: 'expense',
      title: 'Courses alimentaires',
      description: 'Carrefour Market',
      amount: 78.90,
      date: '2024-01-12',
      time: '18:20',
      category: 'Alimentation',
      status: 'completed',
      location: 'Carrefour Market, Paris',
      merchant: 'Carrefour Market',
      cardUsed: '•••• 4567',
      reference: 'CAR-2024-001',
    },
    {
      id: 6,
      type: 'transfer',
      title: 'Transfert vers Lucas',
      description: 'Activité scolaire',
      amount: 15.00,
      date: '2024-01-12',
      time: '08:30',
      category: 'Famille',
      status: 'pending',
      location: 'Transfert interne',
      reference: 'TRF-2024-002',
    },
    {
      id: 7,
      type: 'expense',
      title: 'Restaurant',
      description: 'Dîner en famille',
      amount: 45.80,
      date: '2024-01-11',
      time: '19:30',
      category: 'Alimentation',
      status: 'completed',
      location: 'Restaurant Le Petit Bistro',
      merchant: 'Le Petit Bistro',
      cardUsed: '•••• 4567',
      reference: 'RES-2024-001',
    },
    {
      id: 8,
      type: 'expense',
      title: 'Essence',
      description: 'Station Total',
      amount: 65.40,
      date: '2024-01-11',
      time: '08:15',
      category: 'Transport',
      status: 'completed',
      location: 'Total Access, Avenue de la République',
      merchant: 'Total',
      cardUsed: '•••• 4567',
      reference: 'TOT-2024-001',
    },
    {
      id: 9,
      type: 'income',
      title: 'Freelance',
      description: 'Projet web',
      amount: 800.00,
      date: '2024-01-10',
      time: '14:00',
      category: 'Freelance',
      status: 'completed',
      location: 'Virement client',
      merchant: 'Client XYZ',
      reference: 'FRE-2024-001',
    },
    {
      id: 10,
      type: 'expense',
      title: 'Pharmacie',
      description: 'Médicaments',
      amount: 23.50,
      date: '2024-01-10',
      time: '16:20',
      category: 'Santé',
      status: 'completed',
      location: 'Pharmacie du Centre',
      merchant: 'Pharmacie du Centre',
      cardUsed: '•••• 4567',
      reference: 'PHA-2024-001',
    },
  ];

  const stats = {
    totalIncome: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
    totalTransfers: transactions.filter(t => t.type === 'transfer').reduce((sum, t) => sum + t.amount, 0),
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income':
        return ArrowDownLeft;
      case 'expense':
        return ArrowUpRight;
      case 'transfer':
        return ArrowUpRight;
      default:
        return ArrowUpRight;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'income':
        return '#059669';
      case 'expense':
        return '#DC2626';
      case 'transfer':
        return '#7C3AED';
      default:
        return '#6B7280';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'income' && transaction.type === 'income') ||
      (selectedFilter === 'expenses' && transaction.type === 'expense') ||
      (selectedFilter === 'transfers' && transaction.type === 'transfer');
    
    const matchesSearch = transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleTransactionPress = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Transactions</Text>
          <TouchableOpacity style={styles.calendarButton}>
            <Calendar size={24} color="#4F46E5" />
          </TouchableOpacity>
        </View>

        {/* Analytics Charts */}
        <TransactionAnalytics transactions={transactions} />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher une transaction..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#4F46E5" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#DCFCE7' }]}>
            <TrendingUp size={24} color="#059669" />
            <Text style={styles.statLabel}>Revenus</Text>
            <Text style={[styles.statAmount, { color: '#059669' }]}>
              +€{stats.totalIncome.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#FEF2F2' }]}>
            <TrendingDown size={24} color="#DC2626" />
            <Text style={styles.statLabel}>Dépenses</Text>
            <Text style={[styles.statAmount, { color: '#DC2626' }]}>
              -€{stats.totalExpenses.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#F3E8FF' }]}>
            <ArrowUpRight size={24} color="#7C3AED" />
            <Text style={styles.statLabel}>Transferts</Text>
            <Text style={[styles.statAmount, { color: '#7C3AED' }]}>
              €{stats.totalTransfers.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </ScrollView>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterTab,
                { backgroundColor: selectedFilter === filter.key ? '#4F46E5' : '#FFFFFF' }
              ]}
              onPress={() => setSelectedFilter(filter.key)}>
              <Text style={[
                styles.filterText,
                { color: selectedFilter === filter.key ? '#FFFFFF' : '#6B7280' }
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Transactions List */}
        <View style={styles.transactionsList}>
          <Text style={styles.sectionTitle}>
            {filteredTransactions.length} transaction{filteredTransactions.length > 1 ? 's' : ''}
          </Text>
          
          {filteredTransactions.map((transaction) => {
            const IconComponent = getTransactionIcon(transaction.type);
            const color = getTransactionColor(transaction.type);
            
            return (
              <TouchableOpacity 
                key={transaction.id} 
                style={styles.transactionItem}
                onPress={() => handleTransactionPress(transaction)}>
                <View style={[styles.transactionIcon, { backgroundColor: color + '20' }]}>
                  <IconComponent size={20} color={color} />
                </View>
                
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <View style={styles.transactionMeta}>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                    <Text style={styles.transactionTime}>{transaction.time}</Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: transaction.status === 'completed' ? '#DCFCE7' : '#FEF3C7' }
                    ]}>
                      <Text style={[
                        styles.statusText,
                        { color: transaction.status === 'completed' ? '#059669' : '#D97706' }
                      ]}>
                        {transaction.status === 'completed' ? 'Terminé' : 'En attente'}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.transactionAmount}>
                  <Text style={[styles.amountText, { color }]}>
                    {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
                  </Text>
                  <Text style={styles.categoryText}>{transaction.category}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      
      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        visible={showDetailModal}
        onClose={() => setShowDetailModal(false)}
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
  calendarButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsContainer: {
    paddingLeft: 20,
    marginVertical: 16,
  },
  statCard: {
    width: 160,
    padding: 20,
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 4,
  },
  statAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filtersContainer: {
    paddingLeft: 20,
    marginVertical: 16,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionsList: {
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginRight: 8,
  },
  transactionTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
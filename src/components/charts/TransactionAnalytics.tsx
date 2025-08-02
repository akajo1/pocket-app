import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, TrendingUp, TrendingDown, ChartPie as PieChartIcon } from 'lucide-react-native';
import SpendingChart from './SpendingChart';

interface Transaction {
  id: number;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  category: string;
  date: string;
}

interface TransactionAnalyticsProps {
  transactions: Transaction[];
}

export default function TransactionAnalytics({ transactions }: TransactionAnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedChart, setSelectedChart] = useState('spending');

  const periods = [
    { key: 'week', label: '7 jours' },
    { key: 'month', label: '30 jours' },
    { key: 'year', label: '1 an' },
  ];

  const chartTypes = [
    { key: 'spending', label: 'Dépenses', icon: TrendingDown },
    { key: 'income', label: 'Revenus', icon: TrendingUp },
    { key: 'categories', label: 'Catégories', icon: PieChartIcon },
  ];

  // Préparer les données pour les graphiques
  const prepareSpendingData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    const dailySpending = last7Days.map(date => {
      const dayTransactions = transactions.filter(t => 
        t.date === date && t.type === 'expense'
      );
      return dayTransactions.reduce((sum, t) => sum + t.amount, 0);
    });

    return {
      labels: last7Days.map(date => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { weekday: 'short' });
      }),
      datasets: [{
        data: dailySpending,
        color: (opacity = 1) => `rgba(220, 38, 38, ${opacity})`,
        strokeWidth: 3,
      }],
    };
  };

  const prepareIncomeData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    const dailyIncome = last7Days.map(date => {
      const dayTransactions = transactions.filter(t => 
        t.date === date && t.type === 'income'
      );
      return dayTransactions.reduce((sum, t) => sum + t.amount, 0);
    });

    return {
      labels: last7Days.map(date => {
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { weekday: 'short' });
      }),
      datasets: [{
        data: dailyIncome,
        color: (opacity = 1) => `rgba(5, 150, 105, ${opacity})`,
        strokeWidth: 3,
      }],
    };
  };

  const prepareCategoriesData = () => {
    const categoryTotals = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
      }, {} as Record<string, number>);

    const colors = [
      '#4F46E5', '#DC2626', '#059669', '#F59E0B', 
      '#7C3AED', '#EF4444', '#10B981', '#F97316'
    ];

    return Object.entries(categoryTotals)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 6)
      .map(([category, amount], index) => ({
        name: category,
        amount: amount,
        color: colors[index % colors.length],
        legendFontColor: '#374151',
        legendFontSize: 12,
      }));
  };

  const getChartData = () => {
    switch (selectedChart) {
      case 'spending':
        return prepareSpendingData();
      case 'income':
        return prepareIncomeData();
      case 'categories':
        return prepareCategoriesData();
      default:
        return prepareSpendingData();
    }
  };

  const getChartType = () => {
    switch (selectedChart) {
      case 'categories':
        return 'pie';
      case 'income':
        return 'line';
      default:
        return 'bar';
    }
  };

  const getChartTitle = () => {
    switch (selectedChart) {
      case 'spending':
        return 'Dépenses par jour';
      case 'income':
        return 'Revenus par jour';
      case 'categories':
        return 'Dépenses par catégorie';
      default:
        return 'Analyse des transactions';
    }
  };

  // Calculer les statistiques
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <View style={styles.container}>
      {/* Statistics Summary */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: '#DCFCE7' }]}>
          <TrendingUp size={20} color="#059669" />
          <Text style={styles.statLabel}>Revenus</Text>
          <Text style={[styles.statValue, { color: '#059669' }]}>
            +€{totalIncome.toFixed(2)}
          </Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: '#FEF2F2' }]}>
          <TrendingDown size={20} color="#DC2626" />
          <Text style={styles.statLabel}>Dépenses</Text>
          <Text style={[styles.statValue, { color: '#DC2626' }]}>
            -€{totalExpenses.toFixed(2)}
          </Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: netBalance >= 0 ? '#DCFCE7' : '#FEF2F2' }]}>
          <Calendar size={20} color={netBalance >= 0 ? '#059669' : '#DC2626'} />
          <Text style={styles.statLabel}>Solde net</Text>
          <Text style={[styles.statValue, { color: netBalance >= 0 ? '#059669' : '#DC2626' }]}>
            {netBalance >= 0 ? '+' : ''}€{netBalance.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Period Selection */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodContainer}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.key}
            style={[
              styles.periodButton,
              selectedPeriod === period.key && styles.activePeriodButton
            ]}
            onPress={() => setSelectedPeriod(period.key)}>
            <Text style={[
              styles.periodText,
              selectedPeriod === period.key && styles.activePeriodText
            ]}>
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Chart Type Selection */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartTypeContainer}>
        {chartTypes.map((chart) => {
          const IconComponent = chart.icon;
          return (
            <TouchableOpacity
              key={chart.key}
              style={[
                styles.chartTypeButton,
                selectedChart === chart.key && styles.activeChartTypeButton
              ]}
              onPress={() => setSelectedChart(chart.key)}>
              <IconComponent 
                size={16} 
                color={selectedChart === chart.key ? '#FFFFFF' : '#6B7280'} 
              />
              <Text style={[
                styles.chartTypeText,
                selectedChart === chart.key && styles.activeChartTypeText
              ]}>
                {chart.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Chart */}
      <SpendingChart
        type={getChartType()}
        data={getChartData()}
        title={getChartTitle()}
        height={selectedChart === 'categories' ? 200 : 220}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  periodContainer: {
    paddingLeft: 20,
    marginBottom: 16,
  },
  periodButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  activePeriodButton: {
    backgroundColor: '#4F46E5',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activePeriodText: {
    color: '#FFFFFF',
  },
  chartTypeContainer: {
    paddingLeft: 20,
    marginBottom: 16,
  },
  chartTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  activeChartTypeButton: {
    backgroundColor: '#4F46E5',
  },
  chartTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 6,
  },
  activeChartTypeText: {
    color: '#FFFFFF',
  },
});
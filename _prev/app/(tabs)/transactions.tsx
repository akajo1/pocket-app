import TransactionDetailModal from "@/src/components/modals/TransactionDetailModal";
import TransactionItem from "@/src/components/molecules/TransactionItem";
import { height, sign } from "@/src/lib/constants";
import { useTransactions } from "@/src/lib/hooks/useTransactions";
import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TransactionsScreen() {
  const { transactions, pagination } = useTransactions();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filters = [
    { key: "all", label: "Toutes" },
    { key: "income", label: "Revenus" },
    { key: "load", label: "Approvisionnements" },
    { key: "transfer", label: "Transferts" },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "income" &&
        transaction?.typeTransaction === "income") ||
      (selectedFilter === "load" && transaction?.typeTransaction === "load") ||
      (selectedFilter === "transfer" &&
        transaction?.typeTransaction === "transfer");

    const matchesSearch = transaction.description
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleTransactionPress = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const SummaryTransactions = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statsContainer}
      >
        <View style={[styles.statCard, { backgroundColor: "#DCFCE7" }]}>
          <TrendingUp size={24} color="#059669" />
          <Text style={styles.statLabel}>Revenus</Text>
          <Text style={[styles.statAmount, { color: "#059669" }]}>
            +{sign}
            {pagination.totalIncomeAndLoad?.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
            })}
          </Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: "#FEF2F2" }]}>
          <TrendingDown size={24} color="#DC2626" />
          <Text style={styles.statLabel}>Transferts</Text>
          <Text style={[styles.statAmount, { color: "#DC2626" }]}>
            -{sign}
            {pagination.totalTransfer.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
            })}
          </Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: "#F3E8FF" }]}>
          <ArrowUpRight size={24} color="#3a67edff" />
          <Text style={styles.statLabel}>Retrait</Text>
          <Text style={[styles.statAmount, { color: "#3a67edff" }]}>
            {sign}0,00
          </Text>
        </View>
      </ScrollView>
    );
  };

  const filterbtn = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              {
                backgroundColor:
                  selectedFilter === filter.key ? "#4F46E5" : "#FFFFFF",
              },
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color: selectedFilter === filter.key ? "#FFFFFF" : "#6B7280",
                },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
      </View>
      {SummaryTransactions()}
      {filterbtn()}
      <Text style={styles.sectionTitle}>
        {filteredTransactions.length} transaction
        {filteredTransactions.length > 1 ? "s" : ""}
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.transactionsList}
      >
        {filteredTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onPress={() => handleTransactionPress(transaction)}
          />
        ))}
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
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 26,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
  calendarButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 8,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#111827",
  },
  filterButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    paddingLeft: 20,
    marginTop: 16,
    height: 160,
  },
  statCard: {
    width: 160,
    padding: 20,
    borderRadius: 16,
    marginRight: 16,
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    marginBottom: 4,
  },
  statAmount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  filtersContainer: {
    paddingLeft: 20,
    marginVertical: 16,
    paddingBottom: 5,
    height: 80,
  },
  filterTab: {
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
  },
  transactionsList: {
    paddingHorizontal: 20,
    marginBottom: 16,
    height: height / 1.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
    marginLeft: 16,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  transactionMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionDate: {
    fontSize: 12,
    color: "#9CA3AF",
    marginRight: 8,
  },
  transactionTime: {
    fontSize: 12,
    color: "#9CA3AF",
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
});

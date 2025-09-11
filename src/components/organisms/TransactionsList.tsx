import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NoData from "../molecules/NoData";
import TransactionItem from "../molecules/TransactionItem";
interface Transaction {
  id: number;
  type: "received" | "sent";
  amount: number;
  description: string;
  time: string;
  status?: "completed" | "pending";
  date?: string;
  category?: string;
  location?: string;
  merchant?: string;
  cardUsed?: string;
  reference?: string;
}

interface TransactionsListProps {
  title: string;
  transactions: Transaction[];
  onTransactionPress?: (transaction: Transaction) => void;
  onViewAll?: () => void;
  showViewAll?: boolean;
}

export default function TransactionsList({
  title,
  transactions,
  onTransactionPress,
  onViewAll,
  showViewAll = true,
}: TransactionsListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {!transactions.length ? (
        <NoData
          icon={<FontAwesome5 name="history" size={44} color="black" />}
          description="Vous n’avez effectué aucune transaction pour le moment"
        />
      ) : (
        <>
          {transactions.slice(0, 3).map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onPress={
                onTransactionPress
                  ? () => onTransactionPress(transaction)
                  : undefined
              }
            />
          ))}
          {showViewAll && onViewAll && (
            <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll}>
              <Text style={styles.viewAllText}>Voir tout</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  viewAllButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  viewAllText: {
    color: "#4F46E5",
    fontSize: 16,
    fontWeight: "600",
  },
});

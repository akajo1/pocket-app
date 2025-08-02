import { Send } from "lucide-react-native";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Badge from "../atoms/Badge";

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

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

export default function TransactionItem({
  transaction,
  onPress,
}: TransactionItemProps) {
  const getIconColor = () => {
    return transaction.type === "received" ? "#059669" : "#DC2626";
  };

  const getIconBackgroundColor = () => {
    return transaction.type === "received" ? "#DCFCE7" : "#FEF2F2";
  };

  const getAmountColor = () => {
    return transaction.type === "received" ? "#059669" : "#DC2626";
  };

  const getAmountPrefix = () => {
    return transaction.type === "received" ? "+" : "-";
  };
  const amount = transaction?.amount || transaction?.amount_encrypted;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: getIconBackgroundColor() },
        ]}
      >
        <Send
          size={16}
          color={getIconColor()}
          style={{
            transform: [
              { rotate: transaction.type === "received" ? "180deg" : "0deg" },
            ],
          }}
        />
      </View>

      <View style={styles.details}>
        <Text style={[styles.description, { marginBottom: 2 }]}>
          {transaction?.title}
        </Text>
        <Text style={[styles.time, { textTransform: "capitalize" }]}>
          {transaction.description}
        </Text>
        <View style={styles.meta}>
          <Text style={[styles.time, { marginTop: 4, fontSize: 12 }]}>
            {moment
              .utc(transaction?.transaction_date)
              .format("DD/MM/YYYY hh:mm")}
          </Text>
          {transaction.status && (
            <Badge
              text={
                transaction.status === "completed" ? "Terminé" : "En attente"
              }
              variant={
                transaction.status === "completed" ? "success" : "warning"
              }
              size="small"
            />
          )}
        </View>
      </View>

      <View style={{ justifyContent: "center" }}>
        <Text style={[styles.amount, { color: getAmountColor() }]}>
          {getAmountPrefix()}${parseFloat(amount?.toString())?.toFixed(2)}
        </Text>
        <Text style={styles.time}>{transaction.payment_method}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    // marginBottom: 4,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: 14,
    color: "#6B7280",
    marginRight: 8,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

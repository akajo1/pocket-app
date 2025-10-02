import { pallete } from "@/src/utils/pallete";
import { Send } from "lucide-react-native";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Badge } from "../atoms";

interface Transaction {
  id: number;
  type: "income" | "sent";
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
    return transaction?.typeTransaction !== "transfer"
      ? pallete.green
      : pallete.red;
  };

  const getIconBackgroundColor = () => {
    return transaction?.typeTransaction !== "transfer"
      ? pallete.franc
      : pallete.red;
  };

  const getAmountColor = () => {
    return transaction?.typeTransaction !== "transfer"
      ? pallete.franc
      : pallete.red;
  };

  const getAmountPrefix = () => {
    return transaction?.typeTransaction !== "transfer" ? "+" : "-";
  };
  const displayPay = () => {
    return transaction?.typeTransaction !== "transfer" ? "Reçu" : "Envoyé";
  };
  const amount = transaction?.amount;

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
          color={pallete.white}
          style={{
            transform: [
              { rotate: transaction.type === "income" ? "180deg" : "0deg" },
            ],
          }}
        />
      </View>

      <View style={styles.details}>
        <Text style={[styles.title, { textTransform: "capitalize" }]}>
          {transaction.description}
        </Text>
        <View style={styles.meta}>
          <Text style={[styles.time, { marginTop: 4, fontSize: 12 }]}>
            {moment.utc(transaction?.created_at).format("DD/MM/YYYY HH:mm")}
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
        <Text style={[styles.time, { alignSelf: "flex-end", marginRight: 0 }]}>
          {displayPay()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: pallete.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
  title: {
    fontWeight: "700",
    color: pallete.black,
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    color: pallete.grey,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: 14,
    color: pallete.black,
    marginRight: 8,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

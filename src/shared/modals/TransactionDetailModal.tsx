import { Calendar, Clock, Hash, User2Icon, X } from "lucide-react-native";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Transaction {
  id: number;
  type: "income" | "expense" | "transfer";
  title: string;
  description: string;
  amount: number;
  date: string;
  time: string;
  category: string;
  status: "completed" | "pending";
  location?: string;
  merchant?: string;
  cardUsed?: string;
  reference: string;
}

interface TransactionDetailModalProps {
  visible: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export default function TransactionDetailModal({
  visible,
  onClose,
  transaction,
}: TransactionDetailModalProps) {
  if (!transaction) return null;

  const getTransactionColor = (type: string) => {
    console.log("-type", type);
    return type !== "transfer" ? "#059669" : "#DC2626";
  };

  const displayTransactionType = () => {
    switch (transaction.typeTransaction) {
      case "load":
      case "income":
        return "Mode d'approvisionnement";
      case "transfer":
        return "Mode de paiement";
      default:
        return "Mode de paiement";
    }
  };

  const displayModePayment = () => {
    switch (transaction.payment_method) {
      case "card":
        return "Carte de crédit";
      case "mobil_transfer":
        return "Mobile money";
      case "paypal":
        return "PayPal";
      case "bank_transfer":
        return "Virement bancaire";
      case "W2W":
        return "Recharge smart";
      default:
        return transaction.payment_method;
    }
  };
  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case "income":
        return "Revenu";
      case "load":
        return "Approvisionnement";
      case "transfer":
        return "Transfert";
      default:
        return "Transaction";
    }
  };

  const color = getTransactionColor(transaction?.typeTransaction);
  const amount = transaction?.amount;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Détails de la transaction</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Amount Section */}
          <View style={styles.amountSection}>
            <Text style={[styles.amount, { color }]}>
              {transaction.type !== "transfer" ? "+" : "-"}
              {transaction?.wallet_currency === "USD" ? "$" : "Fc"}
              {parseFloat(amount.toString()).toFixed(2)}
            </Text>
            <Text style={styles.transactionType}>
              {getTransactionTypeLabel(transaction.typeTransaction)}
            </Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    transaction.status === "completed" ? "#DCFCE7" : "#FEF3C7",
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      transaction.status === "completed"
                        ? "#059669"
                        : "#D97706",
                  },
                ]}
              >
                {transaction.status === "completed" ? "Terminé" : "En attente"}
              </Text>
            </View>
          </View>

          {/* Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Informations</Text>
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <View
                  style={[styles.categoryDot, { backgroundColor: color }]}
                />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>
                  {displayTransactionType()}
                </Text>
                <Text style={styles.detailValue}>{displayModePayment()}</Text>
              </View>
            </View>
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Hash size={20} color="#6B7280" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Référence</Text>
                <Text style={styles.detailValue}>
                  {transaction?.reference_number?.toUpperCase()}
                </Text>
              </View>
            </View>

            {transaction.from_id && (
              <View style={styles.detailItem}>
                <View style={styles.detailIcon}>
                  <User2Icon size={20} color="#6B7280" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Expéditeur</Text>
                  <Text style={styles.detailValue}>
                    {transaction.from_user_first_name}{" "}
                    {transaction.from_user_last_name}
                  </Text>
                </View>
              </View>
            )}

            {transaction.to_id && (
              <View style={styles.detailItem}>
                <View style={styles.detailIcon}>
                  <User2Icon size={20} color="#6B7280" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Bénéficiaire</Text>
                  <Text style={styles.detailValue}>
                    {transaction.to_user_first_name}{" "}
                    {transaction.to_user_last_name}
                  </Text>
                </View>
              </View>
            )}

            {transaction.raison_id && (
              <View style={styles.detailItem}>
                <View style={styles.detailIcon}>
                  <User2Icon size={20} color="#6B7280" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Raison</Text>
                  <Text style={styles.detailValue}>
                    {transaction.raison_label}
                  </Text>
                </View>
              </View>
            )}

            {/* {transaction.merchant && (
              <View style={styles.detailItem}>
                <View style={styles.detailIcon}>
                  <Building size={20} color="#6B7280" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Marchand</Text>
                  <Text style={styles.detailValue}>{transaction.merchant}</Text>
                </View>
              </View>
            )} */}

            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Calendar size={20} color="#6B7280" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Date Heure</Text>
                <Text style={styles.detailValue}>
                  {transaction.created_at
                    .split(" ")[0]
                    .split("-")
                    .reverse()
                    .join("/")}
                </Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Clock size={20} color="#6B7280" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Heure</Text>
                <Text style={styles.detailValue}>
                  {transaction.created_at.split(" ")[1]}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
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
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  amountSection: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  amount: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
  },
  transactionType: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 12,
    alignSelf: "center",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  infoSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
  },
  detailsSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
});

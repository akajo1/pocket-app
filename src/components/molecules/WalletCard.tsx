import { colors } from "@/src/lib/colors";
import { sign } from "@/src/lib/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Eye, EyeOff } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconButton from "../atoms/IconButton";

interface WalletCardProps {
  title: string;
  balance: number;
  isBalanceVisible: boolean;
  onToggleVisibility: () => void;
  onPress?: () => void;
  gradient?: string[];
}

export default function WalletCard({
  title,
  balance,
  isBalanceVisible,
  onToggleVisibility,
  onPress,
  gradient = [colors.blue, colors.red],
}: WalletCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <IconButton
            icon={
              isBalanceVisible ? (
                <EyeOff size={20} color="#FFFFFF" />
              ) : (
                <Eye size={20} color="#FFFFFF" />
              )
            }
            onPress={onToggleVisibility}
            variant="ghost"
            size="small"
          />
        </View>

        <Text style={styles.balance}>
          {isBalanceVisible ? `${sign} ${balance.toFixed(2)}` : "••••••"}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 16,
  },
  card: {
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    opacity: 0.9,
  },
  balance: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardNumber: {
    color: "#FFFFFF",
    fontSize: 18,
    opacity: 0.8,
    marginBottom: 20,
    letterSpacing: 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardExpiry: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.8,
  },
});

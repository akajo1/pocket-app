import { colors } from "@/src/lib/colors";
import { Plus } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconButton from "../atoms/IconButton";
import SubWalletCard from "../molecules/SubWalletCard";

interface SubWallet {
  id: number;
  name: string;
  balance: number;
  avatar: string;
}

interface SubWalletsListProps {
  title: string;
  wallets: SubWallet[];
  onWalletPress: (wallet: string) => void;
  onAddPress?: () => void;
}

export default function SubWalletsList({
  title,
  wallets,
  onWalletPress,
  onAddPress,
}: SubWalletsListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {onAddPress && (
          <IconButton
            icon={<Plus size={20} color="#4F46E5" />}
            onPress={onAddPress}
            size="medium"
          />
        )}
      </View>

      {wallets?.map((wallet) => (
        <SubWalletCard
          key={wallet.id}
          wallet={wallet}
          onPress={() => onWalletPress(wallet.id.toString())}
        />
      ))}
      {!wallets?.length ? (
        <View style={{ backgroundColor: colors.white, padding: 20 }}>
          <Text style={{ alignSelf: "center" }}>
            Aucun wallet enfant creer pour le moment
          </Text>
          <TouchableOpacity
            style={{
              alignSelf: "center",
              backgroundColor: colors.blue,
              padding: 7,
              paddingHorizontal: 15,
              borderRadius: 8,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                color: colors.white,
                textTransform: "capitalize",
                fontWeight: "700",
              }}
            >
              creer un wallet
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
});

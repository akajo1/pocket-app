import { Wallet } from "lucide-react-native"; // Icône wallet
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onPress: Function;
};
const EmptyChildWalletScreen = ({ onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Wallet size={80} color="#888" strokeWidth={1.5} style={styles.icon} />

      <Text style={styles.title}>Aucun portefeuille</Text>
      <Text style={styles.subtitle}>
        Vous n’avez encore ajouté aucun portefeuille.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => onPress()}>
        <Text style={styles.buttonText}>Ajouter un portefeuille</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyChildWalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e1e1e",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6e6e6e",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#0066ff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

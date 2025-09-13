import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, WalletIcon } from "lucide-react-native";
import moment from "moment";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../lib/colors";
import { height, sign } from "../lib/constants";
import { childrenStyle } from "../lib/styles/childrenStyle";

type Props = {};

const ConfirmationScreen = (props: Props) => {
  const router = useRouter();
  const { form, type, selectedWalletCurrency } = useLocalSearchParams();
  const parsedForm = JSON.parse(form);

  const displayTransactionDetails = () => {
    switch (type) {
      case "create-child":
        return (
          <View
            style={[
              childrenStyle.modalContent,
              { left: "5%", backgroundColor: colors.bg },
            ]}
          >
            <Text style={{ fontSize: 14 }}>Nom complet</Text>
            <Text style={styles.text}>{parsedForm?.fullname}</Text>

            <Text style={{ fontSize: 14 }}>Date de naissance</Text>
            <Text style={styles.text}>
              {moment(parsedForm?.age)?.format("DD/MM/YYYY")}
            </Text>

            <Text style={{ fontSize: 14 }}>Montant</Text>
            <Text style={styles.text}>
              {sign}
              {parseFloat(parsedForm?.amount.toString()).toFixed(2)}
            </Text>
          </View>
        );

      default:
        break;
    }
  };
  return (
    <SafeAreaView style={[childrenStyle.container]}>
      <View style={[childrenStyle.header, { flexDirection: "row-reverse" }]}>
        <Text
          style={[
            childrenStyle.headerTitle,
            { fontSize: 18, textTransform: "capitalize", marginLeft: -8 },
          ]}
        >
          Confirmez la transaction
        </Text>
        <TouchableOpacity
          style={childrenStyle.addButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={colors.blue} />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 24 }}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Type de transaction</Text>
          <Text style={styles.type}>
            {type === "create-child" ? "Création de dependant" : "Inconnu"}
          </Text>
        </View>
        <View style={styles.from}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <WalletIcon size={20} color={colors.dollars} />
            <Text
              style={[{ fontSize: 14, color: colors.white, marginLeft: 8 }]}
            >
              Depuis le Portemonnaie
            </Text>
          </View>
          <Text style={styles.wallet}>{selectedWalletCurrency}</Text>
        </View>
      </View>
      {displayTransactionDetails()}

      <View style={[childrenStyle.modalContent, styles.transaction]}>
        <Text style={{ fontSize: 14 }}>Frais de transaction</Text>
        <Text style={styles.text}>
          {sign}
          {((parseFloat(parsedForm?.amount.toString()) * 1.2) / 100).toFixed(2)}
        </Text>
      </View>

      <View style={[childrenStyle.modalContent, styles.container]}>
        <Text style={{ fontSize: 14 }}>Total à payer</Text>
        <Text style={{ fontSize: 20, marginTop: 5, fontWeight: "500" }}>
          {sign}
          {(
            parseFloat(parsedForm?.amount.toString()) +
            (parseFloat(parsedForm?.amount.toString()) * 1.2) / 100
          ).toFixed(2)}
        </Text>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity
          style={[childrenStyle.createButton]}
          onPress={() => {}}
        >
          <Text style={childrenStyle.createButtonText}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    left: "5%",
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: colors.bg,
  },
  transaction: {
    left: "5%",
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: colors.bg,
  },
  wallet: {
    fontSize: 32,
    color: colors.gray,
    fontWeight: "900",
    marginLeft: 28,
  },
  from: {
    backgroundColor: colors.blue,
    height: height / 10,
    borderRadius: 20,
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 12,
    marginTop: 5,
    fontWeight: "500",
  },
  containerTitle: {
    backgroundColor: colors.orange,
    height: 60,
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    marginLeft: 8,
    color: colors.white,
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    marginLeft: 8,
    color: colors.white,
    fontWeight: "500",
  },
  btn: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    paddingHorizontal: 24,
  },
});

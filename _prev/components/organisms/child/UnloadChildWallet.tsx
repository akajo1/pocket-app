import { colors } from "@/src/lib/colors";
import { sign } from "@/src/lib/constants";
import { useChildren } from "@/src/lib/hooks/useChildren";
import { childrenStyle } from "@/src/lib/styles/childrenStyle";
import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  isShown: boolean;
  selectedChildIndex: number;
  handleHidemodal: Function;
};

const UnloadChildWallet = ({
  isShown,
  selectedChildIndex,
  handleHidemodal,
}: Props) => {
  const { children } = useChildren();
  const [form, setForm] = useState({
    amount: 0,
  });
  const unLoadChildWallet = () => {
    if (form.amount) {
      // Logique de création du wallet enfant
      handleHidemodal(false);
    }
  };
  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <Modal visible={isShown} animationType="slide" transparent={true}>
      <View style={childrenStyle.modalOverlay}>
        <View style={childrenStyle.modalContent}>
          <Text style={childrenStyle.modalTitle}>
            Retirer de l'argent du wallet de{" "}
            {children[selectedChildIndex]?.name}
          </Text>

          <View style={childrenStyle.balanceInfo}>
            <View style={childrenStyle.balanceItem}>
              <Text style={childrenStyle.balanceLabel}>Solde enfant</Text>
              <Text style={childrenStyle.balanceValue}>
                {sign}
                {parseFloat(
                  children[selectedChildIndex]?.balance.toString()
                )?.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={childrenStyle.inputContainer}>
            <Text style={childrenStyle.inputLabel}>
              Montant à retirer ({sign})
            </Text>
            <TextInput
              style={childrenStyle.textInput}
              value={form.amount.toString()}
              onChangeText={(value) => handleChange("amount", value)}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>

          <View style={childrenStyle.quickAmountsContainer}>
            <Text style={childrenStyle.inputLabel}>Montants rapides</Text>
            <View style={childrenStyle.quickAmounts}>
              {[5, 10, 20, 50].map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={childrenStyle.quickAmountButton}
                  onPress={() => handleChange("amount", amount.toString())}
                >
                  <Text style={childrenStyle.quickAmountText}>
                    {sign}
                    {amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={childrenStyle.modalButtons}>
            <TouchableOpacity
              style={childrenStyle.cancelButton}
              onPress={() => handleHidemodal(false)}
            >
              <Text style={childrenStyle.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                childrenStyle.createButton,
                { backgroundColor: colors.red },
              ]}
              onPress={unLoadChildWallet}
            >
              <Text style={childrenStyle.createButtonText}>Retirer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UnloadChildWallet;

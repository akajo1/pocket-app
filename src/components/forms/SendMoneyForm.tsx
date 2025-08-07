import { useChildren } from "@/src/lib/hooks/useChildren";
import { useWallets } from "@/src/lib/hooks/useWallets";
import { SendMoneyFormData, sendMoneySchema } from "@/src/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Euro, MessageSquare } from "lucide-react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

interface SendMoneyFormProps {
  childId: number;
  childName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function SendMoneyForm({
  childId,
  childName,
  onSuccess,
  onCancel,
}: SendMoneyFormProps) {
  const { sendMoney, isSendingMoney } = useChildren();
  const { wallets } = useWallets();

  const primaryWallet = wallets.find((w) => w.isPrimary) || wallets[0];

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<SendMoneyFormData>({
    resolver: zodResolver(sendMoneySchema),
    mode: "onChange",
    defaultValues: {
      amount: 0,
      message: "",
      walletId: primaryWallet?.id || 0,
    },
  });

  const amount = watch("amount");
  const quickAmounts = [5, 10, 20, 50];
  const quickMessages = [
    "Argent de poche",
    "Bon comportement",
    "Aide à la maison",
    "Excellentes notes",
    "Activité scolaire",
    "Sortie avec amis",
  ];

  const onSubmit = async (data: SendMoneyFormData) => {
    try {
      await sendMoney(childId, data);
      reset();
      onSuccess();
    } catch (error) {
      console.error("Send money error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Envoyer de l'argent à {childName}</Text>

      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Montant (€)"
            placeholder="0.00"
            value={value?.toString() || ""}
            onChangeText={(text) => onChange(parseFloat(text) || 0)}
            onBlur={onBlur}
            keyboardType="numeric"
            icon={<Euro size={20} color="#9CA3AF" />}
            error={errors.amount?.message}
          />
        )}
      />

      {/* Quick Amount Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Montants rapides</Text>
        <View style={styles.quickButtons}>
          {quickAmounts.map((quickAmount) => (
            <TouchableOpacity
              key={quickAmount}
              style={[
                styles.quickButton,
                amount === quickAmount && styles.quickButtonSelected,
              ]}
              onPress={() => setValue("amount", quickAmount)}
            >
              <Text
                style={[
                  styles.quickButtonText,
                  amount === quickAmount && styles.quickButtonTextSelected,
                ]}
              >
                €{quickAmount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Controller
        control={control}
        name="message"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Message (optionnel)"
            placeholder="Ajouter un message..."
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            multiline
            numberOfLines={3}
            icon={<MessageSquare size={20} color="#9CA3AF" />}
            error={errors.message?.message}
          />
        )}
      />

      {/* Quick Message Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Messages rapides</Text>
        <View style={styles.quickMessages}>
          {quickMessages.map((quickMessage, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickMessageButton}
              onPress={() => setValue("message", quickMessage)}
            >
              <Text style={styles.quickMessageText}>{quickMessage}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Wallet Info */}
      {primaryWallet && (
        <View style={styles.walletInfo}>
          <Text style={styles.walletLabel}>Depuis le portefeuille :</Text>
          <Text style={styles.walletName}>{primaryWallet.name}</Text>
          <Text style={styles.walletBalance}>
            Solde disponible : €{primaryWallet.balance.toFixed(2)}
          </Text>
        </View>
      )}

      <View style={styles.actions}>
        <Button
          title="Annuler"
          onPress={onCancel}
          variant="secondary"
          style={styles.actionButton}
        />
        <Button
          title={isSendingMoney ? "Envoi..." : "Envoyer"}
          onPress={handleSubmit(onSubmit)}
          disabled={
            !isValid ||
            isSendingMoney ||
            !primaryWallet ||
            primaryWallet.balance < (amount || 0)
          }
          style={styles.actionButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
  },
  quickButtons: {
    flexDirection: "row",
    gap: 8,
  },
  quickButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  quickButtonSelected: {
    backgroundColor: "#EEF2FF",
    borderColor: "#4F46E5",
  },
  quickButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  quickButtonTextSelected: {
    color: "#4F46E5",
  },
  quickMessages: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  quickMessageButton: {
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  quickMessageText: {
    fontSize: 12,
    color: "#6B7280",
  },
  walletInfo: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  walletLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  walletName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  walletBalance: {
    fontSize: 14,
    color: "#059669",
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});

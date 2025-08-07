import { useChildren } from "@/src/lib/hooks/useChildren";
import { CreateChildFormData, createChildSchema } from "@/src/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Euro, User } from "lucide-react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

interface CreateChildFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CreateChildForm({
  onSuccess,
  onCancel,
}: CreateChildFormProps) {
  const { createChild, isCreating } = useChildren();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<CreateChildFormData>({
    resolver: zodResolver(createChildSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      age: 0,
      avatar: "👶",
      initialAmount: 0,
      weeklyLimit: 20,
      dailyLimit: 10,
    },
  });

  const avatarOptions = ["👶", "👧", "👦", "👩", "👨", "🧒", "🧑"];
  const quickAmounts = [0, 10, 20, 50, 100];
  const quickLimits = [10, 20, 30, 50];

  const onSubmit = async (data: CreateChildFormData) => {
    try {
      await createChild(data);
      reset();
      onSuccess();
    } catch (error) {
      console.error("Create child error:", error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Créer un portefeuille enfant</Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Nom de l'enfant"
            placeholder="Entrez le nom"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            icon={<User size={20} color="#9CA3AF" />}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="age"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Âge"
            placeholder="Âge de l'enfant"
            value={value?.toString() || ""}
            onChangeText={(text) => onChange(parseInt(text) || 0)}
            onBlur={onBlur}
            keyboardType="numeric"
            icon={<Calendar size={20} color="#9CA3AF" />}
            error={errors.age?.message}
          />
        )}
      />

      {/* Avatar Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Avatar</Text>
        <View style={styles.avatarGrid}>
          {avatarOptions.map((avatar) => (
            <Controller
              key={avatar}
              control={control}
              name="avatar"
              render={({ field: { value } }) => (
                <TouchableOpacity
                  style={[
                    styles.avatarOption,
                    value === avatar && styles.avatarSelected,
                  ]}
                  onPress={() => setValue("avatar", avatar)}
                >
                  <Text style={styles.avatarEmoji}>{avatar}</Text>
                </TouchableOpacity>
              )}
            />
          ))}
        </View>
      </View>

      <Controller
        control={control}
        name="initialAmount"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Montant initial (€)"
            placeholder="0.00"
            value={value?.toString() || ""}
            onChangeText={(text) => onChange(parseFloat(text) || 0)}
            onBlur={onBlur}
            keyboardType="numeric"
            icon={<Euro size={20} color="#9CA3AF" />}
            error={errors.initialAmount?.message}
          />
        )}
      />

      {/* Quick Amount Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Montants rapides</Text>
        <View style={styles.quickButtons}>
          {quickAmounts.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={styles.quickButton}
              onPress={() => setValue("initialAmount", amount)}
            >
              <Text style={styles.quickButtonText}>€{amount}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Controller
        control={control}
        name="weeklyLimit"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Limite hebdomadaire (€)"
            placeholder="20.00"
            value={value?.toString() || ""}
            onChangeText={(text) => onChange(parseFloat(text) || 0)}
            onBlur={onBlur}
            keyboardType="numeric"
            icon={<Euro size={20} color="#9CA3AF" />}
            error={errors.weeklyLimit?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="dailyLimit"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Limite quotidienne (€)"
            placeholder="10.00"
            value={value?.toString() || ""}
            onChangeText={(text) => onChange(parseFloat(text) || 0)}
            onBlur={onBlur}
            keyboardType="numeric"
            icon={<Euro size={20} color="#9CA3AF" />}
            error={errors.dailyLimit?.message}
          />
        )}
      />

      {/* Quick Limit Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Limites rapides</Text>
        <View style={styles.quickButtons}>
          {quickLimits.map((limit) => (
            <TouchableOpacity
              key={limit}
              style={styles.quickButton}
              onPress={() => {
                setValue("weeklyLimit", limit);
                setValue("dailyLimit", Math.round(limit / 7));
              }}
            >
              <Text style={styles.quickButtonText}>€{limit}/sem</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title="Annuler"
          onPress={onCancel}
          variant="secondary"
          style={styles.actionButton}
        />
        <Button
          title={isCreating ? "Création..." : "Créer"}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isCreating}
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  avatarOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  avatarSelected: {
    borderColor: "#4F46E5",
    backgroundColor: "#EEF2FF",
  },
  avatarEmoji: {
    fontSize: 24,
  },
  quickButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  quickButton: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  quickButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4F46E5",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    marginBottom: 40,
  },
  actionButton: {
    flex: 1,
  },
});

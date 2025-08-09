import { colors } from "@/src/lib/colors";
import { AlertContext } from "@/src/lib/context/AlertContext";
import { useAuth } from "@/src/lib/hooks/useAuth";
import { RegisterFormData, registerSchema } from "@/src/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Phone, User } from "lucide-react-native";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { register, isLoading, isRegisterSuccess } = useAuth();
  const message = useContext(AlertContext);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      register(data);
      if (isRegisterSuccess) reset();

      message?.setAlertMessage({
        visible: true,
        message: "Inscription effectuer avec succes",
        title: "inscription",
        type: "success",
        onPress: () => onSwitchToLogin(),
        btnText: "Se connecter",
      });
    } catch (error: any) {
      message?.setAlertMessage({
        visible: true,
        message: error.message || "Une erreur est survenue",
        title: "Erreur d'inscription",
        type: "error",
        onPress: () => {},
        btnText: "D'accord",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameRow}>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Prénom"
              placeholder="Prénom"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              icon={<User size={20} color="#9CA3AF" />}
              error={errors.firstName?.message}
              containerStyle={styles.halfInput}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Nom"
              placeholder="Nom"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              icon={<User size={20} color="#9CA3AF" />}
              error={errors.lastName?.message}
              containerStyle={styles.halfInput}
            />
          )}
        />
      </View>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Adresse email"
            placeholder="votre@email.com"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="email-address"
            autoCapitalize="none"
            icon={<Mail size={20} color="#9CA3AF" />}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Téléphone (optionnel)"
            placeholder="+33 6 12 34 56 78"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="phone-pad"
            icon={<Phone size={20} color="#9CA3AF" />}
            error={errors.phone?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Mot de passe"
            placeholder="Minimum 8 caractères"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            icon={<Lock size={20} color="#9CA3AF" />}
            error={errors.password?.message}
          />
        )}
      />

      {password && password.length > 0 && (
        <View style={styles.passwordRequirements}>
          <PasswordStrengthIndicator password={password} />
        </View>
      )}

      <Button
        title={isLoading ? "Création..." : "Créer le compte"}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || isLoading}
        icon={
          isLoading ? (
            <ActivityIndicator size={20} color={colors.white} />
          ) : null
        }
        style={styles.submitButton}
      />

      <Button
        title="Déjà un compte ? Se connecter"
        onPress={onSwitchToLogin}
        variant="secondary"
        style={styles.linkButton}
      />
    </View>
  );
}

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const requirements = [
    { label: "Au moins 8 caractères", met: password.length >= 8 },
    { label: "Une majuscule", met: /[A-Z]/.test(password) },
    { label: "Une minuscule", met: /[a-z]/.test(password) },
    { label: "Un chiffre", met: /\d/.test(password) },
  ];

  return (
    <View style={styles.requirements}>
      {requirements.map((req, index) => (
        <View key={index} style={styles.requirement}>
          <View
            style={[
              styles.requirementDot,
              { backgroundColor: req.met ? "#059669" : "#DC2626" },
            ]}
          />
          <Text
            style={[
              styles.requirementText,
              { color: req.met ? "#059669" : "#DC2626" },
            ]}
          >
            {req.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  nameRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  passwordRequirements: {
    marginBottom: 16,
  },
  requirements: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  requirement: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  requirementDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  requirementText: {
    fontSize: 12,
    fontWeight: "500",
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  linkButton: {
    paddingVertical: 8,
  },
});

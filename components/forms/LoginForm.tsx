import { useAuth } from "@/lib/hooks/useAuth";
import { LoginFormData, loginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

export default function LoginForm({
  onSuccess,
  onSwitchToRegister,
  onForgotPassword,
}: LoginFormProps) {
  const { login, isLoginLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      reset();
      onSuccess();
    } catch (error: any) {
      Alert.alert(
        "Erreur de connexion",
        error.message || "Une erreur est survenue"
      );
    }
  };

  return (
    <View style={styles.container}>
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
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Mot de passe"
            placeholder="Votre mot de passe"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            icon={<Lock size={20} color="#9CA3AF" />}
            error={errors.password?.message}
          />
        )}
      />

      <Button
        title={isLoginLoading ? "Connexion..." : "Se connecter"}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || isLoginLoading}
        style={styles.submitButton}
      />

      <View style={styles.links}>
        <Button
          title="Mot de passe oublié ?"
          onPress={onForgotPassword}
          variant="ghost"
          style={styles.linkButton}
        />

        <Button
          title="Créer un compte"
          onPress={onSwitchToRegister}
          variant="secondary"
          style={{ ...styles.linkButton }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  links: {
    gap: 8,
  },
  linkButton: {
    paddingVertical: 8,
  },
});

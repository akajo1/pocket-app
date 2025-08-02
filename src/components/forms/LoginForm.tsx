import { colors } from "@/src/lib/colors";
import { useAuth } from "@/src/lib/hooks/useAuth";
import { LoginFormData, loginSchema } from "@/src/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

export default function LoginForm({
  onSwitchToRegister,
  onForgotPassword,
}: LoginFormProps) {
  const { login, isLoading, error } = useAuth();
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
    login(data);
    if (!error) reset();
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
            editable={!isLoading}
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
            editable={!isLoading}
          />
        )}
      />

      <Button
        title={isLoading ? "Connexion..." : "Se connecter"}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || isLoading}
        style={styles.submitButton}
        icon={
          isLoading ? (
            <ActivityIndicator size={20} color={colors.white} />
          ) : null
        }
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

import { colors } from "@/src/lib/colors";
import { useAuth } from "@/src/lib/hooks/useAuth";
import { LoginFormData, loginSchema } from "@/src/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import PhoneInput from "react-native-international-phone-number";
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
  const { login, isLoading, error, isLoginSuccess } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const phone = `${selectedCountry?.idd?.root}${data.phone.replaceAll(
      " ",
      ""
    )}`;
    login({ ...data, phone });
    if (isLoginSuccess) reset();
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Téléphone</Text>
            <PhoneInput
              value={value}
              defaultCountry="CD"
              onChangePhoneNumber={onChange}
              placeholderTextColor="#9CA3AF"
              language="fra"
              placeholder="XXX XXX XXX"
              selectedCountry={selectedCountry}
              onChangeSelectedCountry={(country) => setSelectedCountry(country)}
              onBlur={onBlur}
              phoneInputStyles={{
                divider: { display: "none" },
                caret: { display: "none" },
                container: {
                  backgroundColor: "#F9FAFB",
                  borderWidth: 0,
                  borderRadius: 10,
                },
                flagContainer: {
                  width: 80,
                },
                callingCode: { fontSize: 11, color: "#374151" },
              }}
            />
          </View>
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
});

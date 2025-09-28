import { colors } from "@/src/lib/colors";
import { AlertContext } from "@/src/lib/context/AlertContext";
import { useAuth } from "@/src/lib/hooks/useAuth";
import { RegisterFormData, registerSchema } from "@/src/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Checkbox from "expo-checkbox";
import { Lock, Mail, User } from "lucide-react-native";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput from "react-native-international-phone-number";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import TermsAndConditionsModal from "../modals/TermsConditionsModal";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { register, isLoading, isRegisterSuccess } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isChecked, setIsChecked] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
      const phone = `${selectedCountry?.idd?.root}${data.phone.replaceAll(
        " ",
        ""
      )}`;
      if (data.email) {
        if (
          !data.email?.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ) {
          message?.setAlertMessage({
            visible: true,
            message: "Format d'email incorrect",
            title: "Erreur d'inscription",
            type: "error",
            onPress: () => {},
            btnText: "D'accord",
          });
          return;
        }
      }

      await register.mutate({
        ...data,
        phone,
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

  useEffect(() => {
    if (isRegisterSuccess) {
      reset();
      message?.setAlertMessage({
        visible: true,
        message: "Inscription effectuer avec succes",
        title: "inscription",
        type: "success",
        onPress: () => onSwitchToLogin(),
        btnText: "Se connecter",
      });
    }
  }, [isRegisterSuccess]);

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
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Adresse email (optionnel)"
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

      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setIsChecked}
        />
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <Text style={styles.paragraph}>Termes et conditions</Text>
        </TouchableOpacity>
      </View>
      <Button
        title={isLoading ? "Création..." : "Créer le compte"}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || isLoading || !isChecked}
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

      <TermsAndConditionsModal
        visible={isOpen}
        accepted={isChecked}
        onAccept={(accept) => {
          setIsChecked(accept);
        }}
        onClose={() => setIsOpen(false)}
        pdfUrl={Platform.select({
          ios: "sandbox:/mnt/data/termes_conditions_wallet.pdf",
          android: "sandbox:/mnt/data/termes_conditions_wallet.pdf",
        })}
        brandName="IllicoCash / SmartPocket"
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
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 14,
    color: "#374151",
    textTransform: "capitalize",
    textDecorationLine: "underline",
  },
  checkbox: {
    margin: 8,
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
});

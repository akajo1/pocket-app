import images from "@/src/assets/images";
import { Wrapper } from "@/src/shared/components";
import {
  SmartImage,
  SmartKeyboardAvoidView,
  SmartText,
} from "@/src/shared/components/atoms";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import {
  CheckBoxInput,
  Header,
  Input,
  PhoneInput,
} from "@/src/shared/components/molecules";
import { pallete } from "@/src/utils/pallete";
import { yupResolver } from "@hookform/resolvers/yup";
import { Lock } from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ICountry } from "react-native-international-phone-number";
import useAuth from "../hook/useAuth";
import { loginSchema } from "../services/schema";
import { AuthNavigationProps, authNavigationType } from "../services/types";
import {useAuthManager} from "@/src/entities/auth/hook/useAuthManager";

const Login = ({ onChangeScreen }: AuthNavigationProps) => {
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [accepted, setAccepted] = useState(false);
  const auth = useAuthManager();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      phone: "",
      password: "",
    },
  });
  const onSubmit = (data: any) => {
    const phone = `${selectedCountry?.idd?.root}${data.phone.replaceAll(
      " ",
      ""
    )}`;
    auth.login({ ...data, phone });
  };

  return (
    <Wrapper>
      <Header
        left={<View style={{ width: 30 }} />}
        right={<View style={{ width: 30 }} />}
        title="Connexion"
      />

      <SmartImage
        source={images.fullLogo}
        containerStyle={styles.containerLogo}
      />

      <SmartKeyboardAvoidView>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 10 }}>
              <PhoneInput
                title="Numéro de Téléphone"
                rest={{
                  onChangeSelectedCountry: (country) =>
                    setSelectedCountry(country),
                  value,
                  selectedCountry,
                  onChangePhoneNumber: (phone) => onChange(phone),
                  onBlur,
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
              icon={<Lock size={20} color={pallete.black} />}
              error={errors.password?.message}
              editable={!auth.isPending}
            />
          )}
        />
        <CheckBoxInput
          accepted={accepted}
          isRight
          setAccepted={setAccepted}
          label="Se souvenir de moi"
        />
        <SmartButton
          title={auth.loading? "Connexion..." : "Connectez-vous"}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || auth.loading}
          icon={
            auth.loading? (
              <ActivityIndicator size={20} color={pallete.white} />
            ) : null
          }
        />

        <View style={styles.links}>
          <SmartText
            style={[styles.forgot, { marginBottom: 8 }]}
            isPressable
            onPress={() => {}}
          >
            Mot de passe oublié ?
          </SmartText>
          <SmartText style={[styles.registerTitle]}>
            Vous n'avez pas encore de compte ?
          </SmartText>
          <SmartText
            style={styles.forgot}
            isPressable
            onPress={() => onChangeScreen(authNavigationType.TERMS)}
          >
            S'inscrire maintenant!!
          </SmartText>
        </View>
      </SmartKeyboardAvoidView>
    </Wrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  containerLogo: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  container: {
    width: "90%",
    marginHorizontal: "auto",
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  links: {
    gap: 8,
    marginTop: 40,
  },
  linkButton: {
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: pallete.black,
    marginBottom: 8,
  },
  forgot: {
    textDecorationLine: "underline",
    alignSelf: "center",
    color: pallete.blue,
  },
  registerTitle: {
    color: pallete.black,
    alignSelf: "center",
  },
});

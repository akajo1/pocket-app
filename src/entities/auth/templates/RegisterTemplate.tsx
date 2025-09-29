import images from "@/src/assets/images";
import {
  IconButton,
  SmartImage,
  SmartKeyboardAvoidView,
} from "@/src/shared/components/atoms";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import { Header, Input, PhoneInput } from "@/src/shared/components/molecules";
import Wrapper from "@/src/shared/components/Wrapper";
import { pallete } from "@/src/utils/pallete";
import { useRouter } from "expo-router";
import { ChevronLeft, Lock, Mail, User } from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { ICountry } from "react-native-international-phone-number";

type Props = {};

const RegisterTemplate = (props: Props) => {
  const navigation = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    // resolver: yupResolver(),
    mode: "onSubmit",
    // defaultValues: {
    //   phone: "",
    //   password: "",
    // },
  });
  return (
    <Wrapper>
      <Header
        left={
          <IconButton
            icon={<ChevronLeft />}
            onPress={() => navigation.back()}
            variant="ghost"
            size="medium"
          />
        }
        right={<View style={{ width: 30 }} />}
        title="Création de compte"
      />

      <SmartKeyboardAvoidView>
        <SmartImage
          source={images.fullLogo}
          containerStyle={styles.containerLogo}
        />
        <Controller
          control={control}
          name="nom"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Nom"
              placeholder="Votre nom"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              icon={<User size={20} color={pallete.black} />}
              // error={errors.password?.message}
              // editable={!auth.isPending}
            />
          )}
        />

        <Controller
          control={control}
          name="prenom"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Prénom"
              placeholder="Votre prénom"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              icon={<User size={20} color={pallete.black} />}
              // error={errors.password?.message}
              // editable={!auth.isPending}
            />
          )}
        />

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
          name="Email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              placeholder="Votre email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              icon={<Mail size={20} color={pallete.black} />}
              // error={errors.password?.message}
              // editable={!auth.isPending}
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
              icon={<Lock size={20} color={pallete.black} />}
              // error={errors.password?.message}
              // editable={!auth.isPending}
            />
          )}
        />

        <Controller
          control={control}
          name="cpassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Confirmation du Mot de passe"
              placeholder="Retaper le mot de passe"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              icon={<Lock size={20} color={pallete.black} />}
              // error={errors.password?.message}
              // editable={!auth.isPending}
            />
          )}
        />
        <SmartButton
          title="Créer mon compte"
          onPress={() => {}}
          // disabled={!isValid || auth.isPending}
          // icon={
          //   auth.isPending ? (
          //     <ActivityIndicator size={20} color={pallete.white} />
          //   ) : null
          // }
        />
      </SmartKeyboardAvoidView>
    </Wrapper>
  );
};

export default RegisterTemplate;

const styles = StyleSheet.create({
  containerLogo: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  container: {
    width: "90%",
    marginHorizontal: "auto",
    paddingBottom: 500,
  },
});

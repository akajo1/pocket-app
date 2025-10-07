import images from "@/src/assets/images";
import { useWallet } from "@/src/entities/dashboard/hook/useWallet";
import { Wrapper } from "@/src/shared/components";
import {
  IconButton,
  SmartImage,
  SmartKeyboardAvoidView,
  SmartText,
} from "@/src/shared/components/atoms";
import {
  Header,
  Input,
  SmartDatePicker,
} from "@/src/shared/components/molecules";
import { WalletCarousel } from "@/src/shared/components/organims";
import { pallete } from "@/src/utils/pallete";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { Calendar, ChevronLeft, User } from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { childrenSchema } from "../services/schema";

type Props = {};

const CreateChild = (props: Props) => {
  const navigation = useRouter();
  const { data } = useWallet();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShownAge, setIsShownAge] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(childrenSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      age: "",
      initialAmount: 0,
      currency: "",
      weeklyLimit: 30,
      dailyLimit: 10,
    },
  });
  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const width = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

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
        right={
          <SmartImage
            source={images.Logo}
            containerStyle={styles.containerLogo}
          />
        }
        title="Nouveau dépendant"
      />

      <WalletCarousel
        title="Depuis le portemonnaie"
        wallets={data?.wallets || []}
        currentIndex={currentIndex}
        handleMomentumScrollEnd={handleMomentumScrollEnd}
      />
      <SmartKeyboardAvoidView>
        <SmartText
          style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12 }}
        >
          Nouveau dependant
        </SmartText>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Nom dépendant"
              placeholder="Nom complet dépendant"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              icon={<User size={20} color={pallete.black} />}
              error={errors.name?.message}
              // editable={!register.isPending}
            />
          )}
        />

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input
                label="Age du dependant"
                placeholder="Age du dependant"
                type="date"
                value={value}
                onBlur={onBlur}
                icon={<Calendar size={20} color={pallete.black} />}
                error={errors.age?.message}
                onPress={() => setIsShownAge(true)}
                // editable={!register.isPending}
              />
              <SmartDatePicker
                isShown={isShownAge}
                onChange={(date) => {
                  onChange("age", date);
                  setIsShownAge(false);
                }}
                value={value}
              />
            </>
          )}
        />
      </SmartKeyboardAvoidView>
    </Wrapper>
  );
};

export default CreateChild;
const styles = StyleSheet.create({
  containerLogo: {
    width: 40,
    height: 40,
  },
});

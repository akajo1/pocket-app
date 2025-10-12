import images from "@/src/assets/images";
import { useWallet } from "@/src/entities/dashboard/hook/useWallet";
import { Wrapper } from "@/src/shared/components";
import {
  IconButton,
  SmartImage,
  SmartKeyboardAvoidView,
  SmartText,
} from "@/src/shared/components/atoms";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import {
  Header,
  Input,
  SmartDatePicker,
} from "@/src/shared/components/molecules";
import { WalletCarousel } from "@/src/shared/components/organims";
import { pallete } from "@/src/utils/pallete";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import {
  Banknote,
  Calendar,
  ChevronLeft,
  CurrencyIcon,
  User,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { childrenSchema } from "../services/schema";
import {DateType} from "react-native-ui-datepicker";
import {useAlert} from "@/src/shared/provider/AlertProvider";

type Props = {};

const CreateChild = (props: Props) => {
  const navigation = useRouter();
    const message = useAlert();

    const { data } = useWallet();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShownAge, setIsShownAge] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(childrenSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      initialAmount: 0,
      currency: "",
      weeklyLimit: 0,
      dailyLimit: 0,
    },
  });
  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const width = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
    setValue("currency", data?.wallets[index]?.currency);
  };
  const handleChangeDate = (date: any) => {
      setCurrentDate(date)
      setIsShownAge(false)
      setValue("age", date)
  }
  useEffect(() => {
    setValue("currency", data?.wallets[currentIndex]?.currency);
  }, [currentIndex]);

    const handleCloseModal = () =>
        message.setAlertMessage({
            visible: false,
            message: "",
            title: "",
            type: "info",
            onPress: () => {},
            btnText: "",
        });

  const onSubmit = (dataForm: any) => {
    const currentBalance:number = parseFloat(data?.wallets[currentIndex]?.balance).toFixed(2);
if(dataForm.initialAmount >= currentBalance ){
    message?.setAlertMessage({
        visible: true,
        message: "Solde insuffisant pour effectuer cette opération",
        title: "Attention!!",
        type: "warning",
        onPress: () => handleCloseModal(),
        btnText: "D'accord",
    });
    return
}
      navigation.navigate({pathname:"/(transactions)/confirmationScreen", params:{
              form: JSON.stringify({...dataForm, walletId: data?.wallets[currentIndex]?.id}),
              type: "createChild",
          } }  )


  };
console.log(errors)
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
          name="age"
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
            </>
          )}
        />

        <Controller
          control={control}
          name="currency"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Type de wallet"
              placeholder="Sélectionner un type de wallet"
              type="dropdown"
              value={value}
              onBlur={onBlur}
              icon={<CurrencyIcon size={20} color={pallete.black} />}
              error={errors.currency?.message}

              // editable={!register.isPending}
            />
          )}
        />

        <Controller
          control={control}
          name="initialAmount"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Montant initial"
              placeholder="0.00"
              value={value}
              keyboardType="numeric"
              onChangeText={onChange}
              onBlur={onBlur}
              icon={<Banknote size={20} color={pallete.black} />}
              error={errors.initialAmount?.message}
              // editable={!register.isPending}
            />
          )}
        />

        <Controller
          control={control}
          name="dailyLimit"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Montant quotidien"
              placeholder="0.00"
              value={value}
              keyboardType="numeric"
              onChangeText={onChange}
              onBlur={onBlur}
              icon={<Banknote size={20} color={pallete.black} />}
              error={errors.dailyLimit?.message}
              // editable={!register.isPending}
            />
          )}
        />

        <Controller
          control={control}
          name="weeklyLimit"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Montant hebdomadaire"
              placeholder="0.00"
              value={value}
              keyboardType="numeric"
              onChangeText={onChange}
              onBlur={onBlur}
              icon={<Banknote size={20} color={pallete.black} />}
              error={errors.weeklyLimit?.message}
              // editable={!register.isPending}
            />
          )}
        />
        <SmartButton
          title="Créer un dépendant"
          onPress={handleSubmit(onSubmit)}
           disabled={!isValid }
          // icon={
          //   register.isPending ? (
          //     <ActivityIndicator size={20} color={pallete.white} />
          //   ) : null
          // }
        />
      </SmartKeyboardAvoidView>
      <SmartDatePicker
        isShown={isShownAge}
        onChange={(date) => handleChangeDate(date)}
        value={currentDate}
        onCloseModal={() => setIsShownAge(false)}
      />
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

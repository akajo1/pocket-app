import {Wrapper} from "@/src/shared/components";
import {Header, Input, PhoneInput} from "@/src/shared/components/molecules";
import {IconButton, SmartImage, SmartKeyboardAvoidView} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import {Banknote, ChevronDown, ChevronLeft, CreditCard} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import React, {useEffect, useState} from "react";
import {NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View} from "react-native";
import {useRouter} from "expo-router";
import {useWallet} from "@/src/entities/dashboard/hook/useWallet";
import {BrandList, SelectBoxModal, WalletCarousel} from "@/src/shared/components/organims";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loadSchema} from "@/src/features/sendmoney/services/schema";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import {ICountry} from "react-native-international-phone-number";
import {
    cardBrand,
    dropDownData,
    illicoBrand,
    MobilMoneyBrand,
    sendMoneyType,
    typeTransaction
} from "@/src/utils/method";
import {useFocusEffect} from "@react-navigation/native";

interface DataType {
    label: string;
    value: string;
}

type FormTypeData = {
    phone: string
    mode: string
    amount: number
}

export default function LoadToWallet(){
    const navigation = useRouter();
    const {
        data: walletsData,
        isLoading: walletsLoading,
        refetch: refetchWallets,
    } = useWallet();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
    const [currentBrand, setCurrentBrand] = useState(null);
    const [currentBrandList, setCurrentBrandList] = useState<any[]>([])
    const [selectedRaison, setSelectedRaison] = useState<DataType>({} as DataType);
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleMomentumScrollEnd = (
        event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const width = event.nativeEvent.layoutMeasurement.width;
        const index = Math.round(offsetX / width);
        setCurrentIndex(index);
    };
    const handleChangeList = (data: DataType) => {
        setSelectedRaison(data)
        setValue("mode", data.label)
    }
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        setValue
    } = useForm({
        resolver: yupResolver(loadSchema),
        mode: "onSubmit",
        defaultValues: {
            phone: "",
            amount: 0,
            mode: "",
        },
    });

    useFocusEffect(() => {
        refetchWallets();
    })

    useEffect(() => {
        setSelectedRaison(dropDownData[0])
        setValue("mode", dropDownData[0].label)
    }, []);

    useEffect(() => {
        if (selectedRaison) {
            onSelectedRaisonBrand(selectedRaison.value)
        }
    }, [selectedRaison]);


    const onSelectedRaisonBrand = (value: string) => {

        switch (selectedRaison.value) {
            case "MOBILE_MONEY":
                setCurrentBrandList(MobilMoneyBrand)
                setCurrentBrand(MobilMoneyBrand[0].value)
                break
            case "CARD":
                setCurrentBrandList(cardBrand)
                setCurrentBrand(cardBrand[0].value)
                break
            case "ILLICO":
                setCurrentBrandList(illicoBrand)
                setCurrentBrand(illicoBrand[0].value)
                break
            default:
                setCurrentBrandList(null)
                setCurrentBrand(null)
                break
        }
    }
    const onSubmit = (datas: SubmitHandler<FormTypeData>) => {
        const phone = selectedRaison.value !== "CARD" ? `${selectedCountry?.idd?.root.replace("+", "00")}${datas.phone.replaceAll(
            " ",
            ""
        )}` : datas.phone;
  
        const currency = walletsData[currentIndex].currency
        const walletId = walletsData[currentIndex].id
        const currentData = {...datas, currency, phone, walletId, mode: selectedRaison.value, brand: currentBrand};

        navigation.navigate({
            pathname: "/(transactions)/confirmationScreen",
            params: {
                form: JSON.stringify(currentData),
                transactionType: typeTransaction.loadWallet,
                type: sendMoneyType.load
            }
        })
    }


    return <Wrapper>
        <Header
            right={
                <SmartImage
                    source={images.Logo}
                    containerStyle={styles.containerLogo}
                />
            }
            left={
                <IconButton
                    icon={<ChevronLeft size={24} color={pallete.grey} />}
                    onPress={() => navigation.back()}
                    size="medium"
                />
            }
            title="Approvisionnement"
        />
       <ScrollView style={{paddingVertical: 20}}>
           <SmartKeyboardAvoidView>
               <Controller
                   control={control}
                   name="mode"
                   render={({ field: { onChange, onBlur, value } }) => (
                       <Input
                           label="Mode d'approvisionnement"
                           placeholder="Sélectionner un mode d'approvisionnement"
                           type="dropdown"
                           value={value}
                           onBlur={onBlur}
                           icon={<ChevronDown size={20} color={pallete.black}/>}
                           error={errors.mode?.message}
                           onPress={() => setShowModal(true)}
                           // editable={!register.isPending}
                       />
                   )}
               />
               {
                   currentBrandList?.length && <BrandList
                   brands={currentBrandList}
                   currenBrandSelected={currentBrand}
                   onCurrentBrandSelected={setCurrentBrand}
                 />
               }
               {
                   selectedRaison.value !== "CARD" ? <Controller
                       control={control}
                       name="phone"
                       render={({field: {onChange, onBlur, value}}) => (
                           <View style={{marginBottom: 10}}>
                               <PhoneInput
                                   title="Numéro du Bénéficiare"
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
                   /> : <Controller
                       control={control}
                       name="phone"
                       render={({field: {onChange, onBlur, value}}) => (
                           <Input
                               label={`Numéro carte du Bénéficiare`}
                               placeholder="XXXX XXXX XXXX XXXX"
                               value={value}
                               keyboardType="numeric"
                               onChangeText={onChange}
                               onBlur={onBlur}
                               icon={<CreditCard size={20} color={pallete.black}/>}
                               error={errors.phone?.message}
                               // editable={!register.isPending}
                           />
                       )}
                   />
               }
               <Controller
                   control={control}
                   name="amount"
                   render={({ field: { onChange, onBlur, value } }) => (
                       <Input
                           label="Montant"
                           placeholder="0.00"

                           value={value}
                           keyboardType="numeric"
                           onChangeText={onChange}
                           onBlur={onBlur}
                           icon={<Banknote size={20} color={pallete.black} />}
                           error={errors.amount?.message}
                           // editable={!register.isPending}
                       />
                   )}
               />


           </SmartKeyboardAvoidView>
           <WalletCarousel
               title="Sélectionnez le PorteMonnaie"
               wallets={walletsData}
               currentIndex={currentIndex}
               handleMomentumScrollEnd={handleMomentumScrollEnd}

           />

       </ScrollView>
        <SmartButton title="Approvisioner" onPress={handleSubmit(onSubmit)}  disabled={!isValid} style={styles.floating} />

        <SelectBoxModal  data={dropDownData} isOpen={showModal} onClose={()=> setShowModal(false)} title="Mode de retrait" currentChoose={selectedRaison} onChangeCurrentChoose={(item: DataType) =>handleChangeList(item)}/>

    </Wrapper>
}

const styles = StyleSheet.create({
    containerLogo: {
        width: 40,
        height: 40,
        alignSelf: "center",
    },
    floating: {marginTop: 20, position: 'absolute', bottom: 50, width: '90%', left: '5%'}

});

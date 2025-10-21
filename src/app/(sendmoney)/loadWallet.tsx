import {Wrapper} from "@/src/shared/components";
import {Header, Input, PhoneInput} from "@/src/shared/components/molecules";
import {IconButton, SmartImage, SmartKeyboardAvoidView} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import {Banknote, ChevronDown, ChevronLeft} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import React, {useState} from "react";
import {NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View} from "react-native";
import { useRouter} from "expo-router";
import {useWallet} from "@/src/entities/dashboard/hook/useWallet";
import {SelectBoxModal, WalletCarousel} from "@/src/shared/components/organims";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loadSchema} from "@/src/features/sendmoney/services/schema";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import {ICountry} from "react-native-international-phone-number";
import {sendMoneyType, typeTransaction} from "@/src/utils/method";

interface DataType {
    label: string;
    value: string;
}

type FormTypeData = {
    phone: string
    mode: string
    amount: number
}
const dropDownData= [
    {
        label: "Mobile Money",
        value: "mobil",
    },
    {
        label: "Visa - Mastercard",
        value: "card",
    },
    {
        label: "Illicocash",
        value: "illico",
    },

]
export default function LoadToWallet(){
    const navigation = useRouter();
    const { data } = useWallet();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);


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
    const onSubmit = (datas: SubmitHandler<FormTypeData>) => {
        const currency = data?.wallets[currentIndex].currency
        const walletId = data?.wallets[currentIndex].id
        const currentData = {...datas, currency, walletId};

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

               <Controller
                   control={control}
                   name="phone"
                   render={({ field: { onChange, onBlur, value } }) => (
                       <View style={{ marginBottom: 10 }}>
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
               />
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
               wallets={data?.wallets || []}
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

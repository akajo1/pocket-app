import {Wrapper} from "@/src/shared/components";
import {Header, Input, PhoneInput} from "@/src/shared/components/molecules";
import {IconButton, SmartImage, SmartKeyboardAvoidView} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import {Banknote, ChevronDown, ChevronLeft, CurrencyIcon} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import React, {useState} from "react";
import {NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from "react-native";
import { useRouter} from "expo-router";
import {useWallet} from "@/src/entities/dashboard/hook/useWallet";
import {SelectBoxModal, WalletCarousel} from "@/src/shared/components/organims";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "@/src/entities/auth/services/schema";
import {ICountry} from "react-native-international-phone-number";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import {w2WSchema} from "@/src/features/sendmoney/services/schema";

interface DataType {
    label: string;
    value: string;
}
export default function SendMoneyToWallet(){
    const navigation = useRouter();
    const { data } = useWallet();
    const [currentIndex, setCurrentIndex] = useState(0);
    const dropDownData= [
        {
            label: "Dette",
            value: "dette",
        },
        {
            label: "recharge argent",
            value: "rechargeargent",
        },
    ]
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
    const [selectedRaison, setSelectedRaison] = useState<DataType>({} as DataType);
    const [showModal, setShowModal] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(w2WSchema),
        mode: "onSubmit",
        defaultValues: {
            phone: "",
            amount: 0,
            raison: "",
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

    const onSubmit = (data: any) => {
        const phone = `${selectedCountry?.idd?.root}${data.phone.replaceAll(
            " ",
            ""
        )}`;

    };

const handleChangeList = (data: DataType) => {
    setSelectedRaison(data)
    setValue("raison", data.label)
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
            title="Envoi d'argent"
        />
        <WalletCarousel
            wallets={data?.wallets || []}
            currentIndex={currentIndex}
            handleMomentumScrollEnd={handleMomentumScrollEnd}
        />
        <SmartKeyboardAvoidView>
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
            <Controller
                control={control}
                name="raison"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Raison"
                        placeholder="Sélectionner une raison"
                        type="dropdown"
                        value={value}
                        onBlur={onBlur}
                        icon={<ChevronDown size={20} color={pallete.black}/>}
                        error={errors.raison?.message}
                        onPress={() => setShowModal(true)}
                        // editable={!register.isPending}
                    />
                )}
            />
        </SmartKeyboardAvoidView>
        <SmartButton title="Envoyer" onPress={()=> navigation.dismissTo("/(dashboard)/children")}  style={styles.floating} />
    <SelectBoxModal data={dropDownData} isOpen={showModal} onClose={()=> setShowModal(false)} title="Liste des raisons" currentChoose={selectedRaison} onChangeCurrentChoose={(item: DataType) =>handleChangeList(item)}/>
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

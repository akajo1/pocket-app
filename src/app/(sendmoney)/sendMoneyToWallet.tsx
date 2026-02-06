import {Wrapper} from "@/src/shared/components";
import {Header, Input, PhoneInput} from "@/src/shared/components/molecules";
import {IconButton, SmartImage, SmartKeyboardAvoidView} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import {Banknote, ChevronDown, ChevronLeft} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import React, {useState} from "react";
import {NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from "react-native";
import {useRouter} from "expo-router";
import {useWallet} from "@/src/entities/dashboard/hook/useWallet";
import {SelectBoxModal, WalletCarousel} from "@/src/shared/components/organims";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ICountry} from "react-native-international-phone-number";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import {w2WSchema} from "@/src/features/sendmoney/services/schema";
import {useRaison} from "@/src/shared/hooks/useRaison";
import {sendMoneyType, typeTransaction} from "@/src/utils/method";
import {useAuthManager} from "@/src/entities/auth/hook/useAuthManager";
import {useAlert} from "@/src/shared/provider/AlertProvider";

interface DataType {
    label: string;
    value: string;
}

export default function SendMoneyToWallet() {
    const {user} = useAuthManager()
    const navigation = useRouter();
    const {
        data: walletsLists,
    } = useWallet();
    const data = walletsLists?.data || []
    const message = useAlert();
    const [currentIndex, setCurrentIndex] = useState(0);
    const {data: raisonLists, isLoading: raisonLoading} = useRaison({
        typeReason: "TRANSFER",
        onlyActives: 1
    })
    const raisonList= raisonLists?.data || [];

    const dropDownData = raisonList?.length ? raisonList.map(item => ({
        label: item.label,
        value: item.id
    })) : []

    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
    const [selectedRaison, setSelectedRaison] = useState<DataType>({} as DataType);
    const [showModal, setShowModal] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
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

    const handleCloseModal = () =>
        message.setAlertMessage({
            visible: false,
            message: "",
            title: "",
            type: "info",
            onPress: () => {
            },
            btnText: "",
        });


    const onSubmit = (datas: any) => {
        const phone = `${selectedCountry?.idd?.root.replace("+", "00")}${datas.phone.replaceAll(
            " ",
            ""
        )}`;

        if (user?.user?.phone === phone) {
            message?.setAlertMessage({
                visible: true,
                message: "Vous ne pouvez pas vous envoyer a vous-meme!",
                title: "Envoi d'argent",
                type: "warning",
                onPress: () => handleCloseModal(),
                btnText: "D'accord",
            });
            return
        }

        const currency = data[currentIndex].currency
        const walletId = data[currentIndex].id
        const currentData = {...datas, phone, currency, walletId, raison: selectedRaison};

        navigation.navigate({
            pathname: "/(transactions)/confirmationScreen",
            params: {
                form: JSON.stringify(currentData),
                transactionType: typeTransaction.walletToWallet,
                type: sendMoneyType.w2w
            }
        })

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
                    icon={<ChevronLeft size={24} color={pallete.grey}/>}
                    onPress={() => navigation.back()}
                    size="medium"
                />
            }
            title="Envoi d'argent"
        />
        <WalletCarousel
            wallets={data || []}
            currentIndex={currentIndex}
            handleMomentumScrollEnd={handleMomentumScrollEnd}
        />
        <SmartKeyboardAvoidView>
            <Controller
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
            />
            <Controller
                control={control}
                name="amount"
                render={({field: {onChange, onBlur, value}}) => (
                    <Input
                        label="Montant"
                        placeholder="0.00"
                        value={value}
                        keyboardType="numeric"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        icon={<Banknote size={20} color={pallete.black}/>}
                        error={errors.amount?.message}
                        // editable={!register.isPending}
                    />
                )}
            />
            <Controller
                control={control}
                name="raison"
                render={({field: {onChange, onBlur, value}}) => (
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
        <SmartButton
            title="Envoyer"
            onPress={handleSubmit(onSubmit)}
            disabled={raisonLoading}
            style={styles.floating}
        />
        <SelectBoxModal
            data={dropDownData}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Liste des raisons" currentChoose={selectedRaison}
            onChangeCurrentChoose={(item: DataType) => handleChangeList(item)}
        />
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

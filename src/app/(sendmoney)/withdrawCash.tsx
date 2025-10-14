import {Wrapper} from "@/src/shared/components";
import {Header, Input} from "@/src/shared/components/molecules";
import {IconButton, SmartImage, SmartKeyboardAvoidView} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import {Banknote, ChevronLeft} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import React, {useState} from "react";
import {NativeScrollEvent, NativeSyntheticEvent, StyleSheet} from "react-native";
import { useRouter} from "expo-router";
import {useWallet} from "@/src/entities/dashboard/hook/useWallet";
import {WalletCarousel} from "@/src/shared/components/organims";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "@/src/entities/auth/services/schema";
import SmartButton from "@/src/shared/components/atoms/SmartButton";

export default function WithdrawCash() {
    const navigation = useRouter();
    const { data } = useWallet();
    const [currentIndex, setCurrentIndex] = useState(0);
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
    const handleMomentumScrollEnd = (
        event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const width = event.nativeEvent.layoutMeasurement.width;
        const index = Math.round(offsetX / width);
        setCurrentIndex(index);
    };

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
            title="Retrait"
        />
        <WalletCarousel
            wallets={data?.wallets || []}
            currentIndex={currentIndex}
            handleMomentumScrollEnd={handleMomentumScrollEnd}
        />
        <SmartKeyboardAvoidView>
        <Controller
            control={control}
            name="initialAmount"
            render={({ field: { onChange, onBlur, value } }) => (
                <Input
                    label="Montant"
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
        </SmartKeyboardAvoidView>
        <SmartButton title="Retirer" onPress={()=> navigation.dismissTo("/(dashboard)/children")}  style={styles.floating} />

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

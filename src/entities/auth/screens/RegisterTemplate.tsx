import images from "@/src/assets/images";
import {IconButton, SmartImage, SmartKeyboardAvoidView,} from "@/src/shared/components/atoms";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import {Header, Input, PhoneInput} from "@/src/shared/components/molecules";
import Wrapper from "@/src/shared/components/Wrapper";
import {pallete} from "@/src/utils/pallete";
import {yupResolver} from "@hookform/resolvers/yup";
import {ChevronLeft, Lock, Mail, User} from "lucide-react-native";
import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {ICountry} from "react-native-international-phone-number";
import useRegister from "../hook/useRegister";
import {registerSchema} from "../services/schema";
import {AuthNavigationProps, authNavigationType} from "../services/types";

const RegisterTemplate = ({onChangeScreen}: AuthNavigationProps) => {
    const register = useRegister(onChangeScreen);
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);

    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
        reset,
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            phone: "",
            password: "",
        },
    });
    const onSubmit = (formData: any) => {
        const phone = `${selectedCountry?.idd?.root.replace("+", "00")}${formData.phone.replaceAll(
            " ",
            ""
        )}`;
        register.mutate({...formData, phone});
    };
    return (
        <Wrapper>
            <Header
                left={
                    <IconButton
                        icon={<ChevronLeft/>}
                        onPress={() => onChangeScreen(authNavigationType.TERMS)}
                        variant="ghost"
                        size="medium"
                    />
                }
                right={<View style={{width: 30}}/>}
                title="Création de compte"
            />

            <SmartKeyboardAvoidView>
                <SmartImage
                    source={images.fullLogo}
                    containerStyle={styles.containerLogo}
                />
                <Controller
                    control={control}
                    name="last_name"
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            label="Nom"
                            placeholder="Votre nom"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            icon={<User size={20} color={pallete.black}/>}
                            error={errors.last_name?.message}
                            editable={!register.isPending}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="first_name"
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            label="Prénom"
                            placeholder="Votre prénom"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            icon={<User size={20} color={pallete.black}/>}
                            error={errors.first_name?.message}
                            editable={!register.isPending}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="phone"
                    render={({field: {onChange, onBlur, value}}) => (
                        <View style={{marginBottom: 10}}>
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
                    name="email"
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            label="Email (optionel)"
                            placeholder="Votre email"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            icon={<Mail size={20} color={pallete.black}/>}
                            error={errors.email?.message}
                            editable={!register.isPending}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            label="Mot de passe"
                            placeholder="Votre mot de passe"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry
                            icon={<Lock size={20} color={pallete.black}/>}
                            error={errors.password?.message}
                            editable={!register.isPending}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="cpassword"
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            label="Confirmation du Mot de passe"
                            placeholder="Retaper le mot de passe"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry
                            icon={<Lock size={20} color={pallete.black}/>}
                            error={errors.cpassword?.message}
                            editable={!register.isPending}
                        />
                    )}
                />
                <SmartButton
                    title="Créer mon compte"
                    onPress={handleSubmit(onSubmit)}
                    disabled={!isValid || register.isPending}
                    icon={
                        register.isPending ? (
                            <ActivityIndicator size={20} color={pallete.white}/>
                        ) : null
                    }
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

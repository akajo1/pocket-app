import {Wrapper} from "@/src/shared/components";
import {Header, Input} from "@/src/shared/components/molecules";
import {IconButton, SmartImage, SmartKeyboardAvoidView} from "@/src/shared/components/atoms";
import {Banknote, ChevronLeft} from "lucide-react-native";
import images from "@/src/assets/images";
import {WalletCarousel} from "@/src/shared/components/organims";
import {Controller, useForm} from "react-hook-form";
import {pallete} from "@/src/utils/pallete";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import React from "react";
import {useLocalSearchParams, useRouter} from "expo-router";
import {StyleSheet, View} from "react-native";
import {useWallet} from "@/src/entities/dashboard/hook/useWallet";
import {useChildren} from "@/src/features/children/hook/useChildren";
import {ChildrenCarousel} from "@/src/features/children/components/organisms";
import {yupResolver} from "@hookform/resolvers/yup";
import {approChild} from "@/src/features/children/services/schema";
import {sendMoneyType, typeTransaction} from "@/src/utils/method";

type UnloadChildProps = {
    currency: string;
    childId: string;
}

function UnloadChild() {
    const {currency, childId} = useLocalSearchParams<UnloadChildProps>();
    const navigation = useRouter();

    const {
        data: walletsLists,
        refetch: refetchWallets,
    } = useWallet();

    const walletsData =  walletsLists?.data || []
    const {data: childrenLists, isLoading: loadingChildren, refetch: refetchChildren} = useChildren();
    const children = childrenLists?.data || [];
    const walletList = walletsData?.filter((wallet) => wallet.currency === currency)
    const childrenList = children?.filter((child) => child.id === childId)

    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm({
        resolver: yupResolver(approChild),
        mode: "onChange",
        defaultValues: {
            amount: 0,
        },
    });

    const onSubmit = (datas) => {
        const parentWalletId = walletList[0].id
        const childId = childrenList[0].id
        const currentData = {...datas, currency, parentWalletId, childId};

        navigation.navigate({
            pathname: "/(transactions)/confirmationScreen",
            params: {
                form: JSON.stringify(currentData),
                transactionType: typeTransaction.unloadChild,
                type: sendMoneyType.c2w,
                direct: "unloadChild",
            }
        })
    }
    return <Wrapper>
        <Header
            left={
                <IconButton
                    icon={<ChevronLeft/>}
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
            title="Appro. parent"
        />
        <SmartKeyboardAvoidView containerStyle={{}}>
        <ChildrenCarousel
            children={childrenList}
            currentIndex={0}
            handleMomentumScrollEnd={() => {
            }}
        />

        <WalletCarousel
            title="A mon portemonnaie"
            wallets={walletList || []}
            currentIndex={0}
            handleMomentumScrollEnd={() => {
            }}
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
                        containerStyle={{paddingHorizontal: 20 }}
                        // editable={!register.isPending}
                    />
                )}
            />


           <View style={{paddingHorizontal: 20 }}>
               <SmartButton
                   title="Retirez"
                   onPress={handleSubmit(onSubmit)}
                   disabled={!isValid}

                   // icon={
                   //   register.isPending ? (
                   //     <ActivityIndicator size={20} color={pallete.white} />
                   //   ) : null
                   // }
               />
           </View>
        </SmartKeyboardAvoidView>

    </Wrapper>
}

const styles = StyleSheet.create({
    containerLogo: {
        width: 40,
        height: 40,
    },
});

export default UnloadChild;
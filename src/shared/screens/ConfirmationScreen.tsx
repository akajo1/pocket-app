import {Wrapper} from "@/src/shared/components";
import {Header} from "@/src/shared/components/molecules";
import {IconButton, SmartImage} from "@/src/shared/components/atoms";
import {ChevronLeft} from "lucide-react-native";
import images from "@/src/assets/images";
import React from "react";
import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {pallete} from "@/src/utils/pallete";
import {height, ParamsType, typeTransaction, width} from "@/src/utils/method";
import useCreateChild from "@/src/features/children/hook/useCreateChild";
import {useFee} from "@/src/shared/hooks/useFee";
import moment from "moment";
import {ChildConfirmation} from "@/src/features/children/screens";
import {CashoutConfirmation, LoadConfirmation, WalletToWalletConfirmation} from "@/src/features/sendmoney/screens";
import useLoadWallet from "@/src/features/sendmoney/hooks/useLoadWallet";
import useSendMoneyToWallet from "@/src/features/sendmoney/hooks/useSendMoneyToWallet";
import {useConfirmationUserInfo} from "@/src/shared/hooks/useConfirmationUserInfo";
import {useAuthManager} from "@/src/entities/auth/hook/useAuthManager";
import useCashout from "@/src/features/sendmoney/hooks/useCashout";


function ConfirmationScreen() {
    const {user} = useAuthManager()
    const {form, type, transactionType} = useLocalSearchParams<ParamsType>();
    const parsedForm = JSON.parse(form)
    const createChildMutate = useCreateChild()
    const loadWalletMutate = useLoadWallet()
    const cashoutMutate = useCashout()
    const sendMoneyToWalletMutate = useSendMoneyToWallet()
    const {
        data: beneficiaryInfo,
        isLoading: beneficiaryLoading
    } = useConfirmationUserInfo(transactionType === typeTransaction.walletToWallet ? parsedForm?.phone : "")

    const navigation = useRouter()

    const {data: fee, isLoading} = useFee({
        type: transactionType,
        method: type,
        currency: parsedForm?.currency
    })
 

    const handleConfirmationClick = () => {
        switch (transactionType) {
            case typeTransaction.createChild:
                return createChildMutate.mutate({...parsedForm, age: moment(parsedForm?.age)?.format("YYYY-MM-DD")})
            case typeTransaction.loadWallet:
                return loadWalletMutate.mutate(parsedForm)
            case typeTransaction.cashout:
                return cashoutMutate.mutate(parsedForm)
            case typeTransaction.walletToWallet:
                return sendMoneyToWalletMutate.mutate({
                    ...parsedForm,
                    userId: user?.id,
                    raison: parsedForm?.raison.value,
                    paymentMethod: type
                })

            default:
                return

        }
    }

    const displayTransactionDetails = () => {
        switch (transactionType) {
            case typeTransaction.createChild:
                return <ChildConfirmation
                    formData={parsedForm}
                    fee={fee}
                    isLoading={createChildMutate.isPending || isLoading}
                    onSubmit={() => handleConfirmationClick()}
                />
            case typeTransaction.loadWallet:
                return <LoadConfirmation
                    formData={parsedForm}
                    fee={fee}
                    isLoading={loadWalletMutate.isPending || isLoading}
                    onSubmit={() => handleConfirmationClick()}
                />
            case typeTransaction.walletToWallet:
                return <WalletToWalletConfirmation
                    formData={{...parsedForm, beneficiaryInfo}}
                    fee={fee}
                    isLoading={sendMoneyToWalletMutate.isPending || isLoading}
                    onSubmit={() => handleConfirmationClick()}
                />
            case typeTransaction.cashout:
                return <CashoutConfirmation
                    formData={parsedForm}
                    fee={fee}
                    isLoading={cashoutMutate.isPending || isLoading}
                    onSubmit={() => handleConfirmationClick()}
                />
            default:
                return null

        }
    };

    if (isLoading || beneficiaryLoading) {
        return <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <SmartImage
                source={images.fullLogo}
                containerStyle={{...styles.containerLogo, width: 200, height: 200}}
            />
            <ActivityIndicator size="large"/>
        </View>
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
            title="Confirmez la transaction"
        />
        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
            {displayTransactionDetails()}
        </ScrollView>
    </Wrapper>
}

export default ConfirmationScreen
const styles = StyleSheet.create({
    containerLogo: {
        width: 40,
        height: 40,
    },
    contentContainer: {
        flex: 1
    },
    container: {
        width: width - 50,
        marginHorizontal: "auto",
        paddingVertical: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: "600",
        color: pallete.blue,
    },

    text: {
        fontSize: 14,
        color: pallete.black
    },
    subTitle: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 3,
        color: pallete.black
    },
    transaction: {

        paddingVertical: 3,

        borderRadius: 8,

        flexDirection: "row",
        justifyContent: "space-between",
    },
    type: {},
    wallet: {
        fontSize: 32,
        color: pallete.gray,
        fontWeight: "900",
        marginLeft: 28,
    },
    from: {
        backgroundColor: pallete.grey,
        height: height / 10,
        width: width - 25,
        marginHorizontal: "auto",
        borderRadius: 20,
        padding: 20,
    },
})
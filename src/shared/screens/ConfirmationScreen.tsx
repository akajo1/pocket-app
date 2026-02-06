import {Wrapper} from "@/src/shared/components";
import {Header} from "@/src/shared/components/molecules";
import {IconButton, SmartImage, SmartText} from "@/src/shared/components/atoms";
import {ChevronLeft, ChevronLeftIcon, InfoIcon} from "lucide-react-native";
import images from "@/src/assets/images";
import React from "react";
import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {pallete} from "@/src/utils/pallete";
import {height, ParamsType, typeTransaction, width} from "@/src/utils/method";
import useCreateChild from "@/src/features/children/hook/useCreateChild";
import {useFee} from "@/src/shared/hooks/useFee";
import moment from "moment";
import {ChildConfirmation, LoadChildConfirmation, UnloadChildConfirmation} from "@/src/features/children/screens";
import {CashoutConfirmation, LoadConfirmation, WalletToWalletConfirmation} from "@/src/features/sendmoney/screens";
import useLoadWallet from "@/src/features/sendmoney/hooks/useLoadWallet";
import useSendMoneyToWallet from "@/src/features/sendmoney/hooks/useSendMoneyToWallet";
import {useConfirmationUserInfo} from "@/src/shared/hooks/useConfirmationUserInfo";
import {useAuthManager} from "@/src/entities/auth/hook/useAuthManager";
import useCashout from "@/src/features/sendmoney/hooks/useCashout";
import useLoadChild from "@/src/features/children/hook/useLoadChild";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import useUnloadChild from "@/src/features/children/hook/useUnloadChild";


function ConfirmationScreen() {
    const {form, type, transactionType, direct} = useLocalSearchParams<ParamsType>();
    const parsedForm = JSON.parse(form)
    const createChildMutate = useCreateChild()
    const loadChildMutate = useLoadChild()
    const unloadChildMutate = useUnloadChild()
    const loadWalletMutate = useLoadWallet()
    const cashoutMutate = useCashout()
    const sendMoneyToWalletMutate = useSendMoneyToWallet()
    const {
        data: beneficiaryInfos,
        isLoading: beneficiaryLoading,
        error: beneficiaryError,
    } = useConfirmationUserInfo(transactionType === typeTransaction.walletToWallet ? parsedForm?.phone : "")
    const beneficiaryInfo = beneficiaryInfos?.data || null

    const navigation = useRouter()
    const {data: feeList, isLoading, isError} = useFee({
        type: transactionType,
        method: type,
        currency: parsedForm?.currency
    })
    const fee = feeList?.data || null



    const handleConfirmationClick = () => {
        switch (transactionType) {
            case typeTransaction.createChild:
                if (direct === "loadChild") return loadChildMutate.mutate(parsedForm)
                return createChildMutate.mutate({...parsedForm, age: moment(parsedForm?.age)?.format("YYYY-MM-DD")})
            case typeTransaction.unloadChild:
                if (direct === "unloadChild") return unloadChildMutate.mutate(parsedForm)
            case typeTransaction.loadWallet:
                return loadWalletMutate.mutate(parsedForm)
            case typeTransaction.cashout:
                return cashoutMutate.mutate(parsedForm)
            case typeTransaction.walletToWallet:

                return sendMoneyToWalletMutate.mutate({
                    ...parsedForm,
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
                if (direct === "loadChild") {
                    return <LoadChildConfirmation
                        formData={parsedForm}
                        fee={fee}
                        isLoading={loadChildMutate.isPending || isLoading}
                        onSubmit={() => handleConfirmationClick()}
                    />
                }

                return <ChildConfirmation
                    formData={parsedForm}
                    fee={fee}
                    isLoading={createChildMutate.isPending || isLoading}
                    onSubmit={() => handleConfirmationClick()}
                />
            case typeTransaction.unloadChild:
                if (direct === "unloadChild") {
                    return <UnloadChildConfirmation
                        formData={parsedForm}
                        fee={fee}
                        isLoading={loadChildMutate.isPending || isLoading}
                        onSubmit={() => handleConfirmationClick()}
                    />
                }
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

    const beneficiaryNotFound = (message: string) => {

        return  <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <View style={{alignItems:"center"}}>

                <InfoIcon  size={42}/>
                <SmartText style={{textAlign:"center", fontSize: 16}}>
                    {message}
                </SmartText>
                <SmartButton
                    title="Revenir en arrière"
                    icon={<ChevronLeftIcon color={pallete.blue} />}
                    onPress={()=> navigation.back()} style={{marginTop: 20}}
                    variant="ghost"
                />
            </View>
        </View>
    }

    const displayWrapper = () => {
        return <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
            {displayTransactionDetails()}
        </ScrollView>
    }



    const renderScreen = () => {
        if (isLoading || beneficiaryLoading) {
            return <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <SmartImage
                    source={images.fullLogo}
                    containerStyle={{...styles.containerLogo, width: 100, height: 100}}
                />
                <ActivityIndicator size="large"/>
            </View>
        }

        if(parsedForm?.phone && beneficiaryError) return beneficiaryNotFound("Ce bénéficiaire ne dispose pas de compte smartPocket, veuillez utiliser un autre numéro")
        if(isError) return beneficiaryNotFound("Oops!!, Transaction non trouvé, veuillez réessayer plutard")

        return displayWrapper()
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
        {renderScreen()}
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
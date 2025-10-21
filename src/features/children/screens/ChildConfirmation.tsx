import {height, ParamsType, width} from "@/src/utils/method";
import {feeResponse} from "@/src/shared/services/feeApi";
import {StyleSheet, View} from "react-native";
import {WalletIcon} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import {SmartText} from "@/src/shared/components/atoms";
import React from "react";
import {CreateChildConfirm} from "@/src/features/children/components/organisms";
import {TransactionFooter} from "@/src/shared/components";


type Props = {
    formData: ParamsType
    fee: feeResponse
    isLoading: boolean
    onSubmit: () => void
}
export default function ChildConfirmation({formData, fee, isLoading, onSubmit}: Props) {
    const currency = formData.currency === "USD" ? "$" : "Fc";
    const feeAmount = (parseFloat(formData?.initialAmount.toString()) * parseFloat(fee?.percentage?.toString()))/ 100
    const total = parseFloat(formData?.initialAmount.toString()) + feeAmount

    const currencyDisplay = () => {
        return <View style={styles.from}>
            <View style={{flexDirection:"row"}}>
                <WalletIcon size={20} color={pallete.dollars}/>
                <SmartText style={{fontSize: 14, color: pallete.white, marginLeft: 8}}>
                    Depuis le Portemonnaie
                </SmartText>
            </View>
            <SmartText style={styles.wallet}>{formData.currency}</SmartText>
        </View>
    }

    return <>
        {currencyDisplay()}
        <CreateChildConfirm data={formData} />
        <TransactionFooter currency={currency} isLoading={isLoading} transactionType="Création de dependant" feeAmount={feeAmount} onSubmit={onSubmit} totalAmount={total} />
    </>
}

const styles = StyleSheet.create({
    containerLogo: {
        width: 40,
        height: 40,
    },
    contentContainer:{
        flex:1
    },
    container:{
        width: width - 50,
        marginHorizontal: "auto",
        paddingVertical: 20
    },
    title:{
        fontSize: 24,
        marginBottom: 10,
        fontWeight: "600",
        color: pallete.blue,
    },

    text:{
        fontSize: 14,
        color: pallete.black
    },
    subTitle:{
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
    type:{

    },
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
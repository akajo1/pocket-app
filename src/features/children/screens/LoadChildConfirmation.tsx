import {height, ParamsType, width} from "@/src/utils/method";
import {feeResponse} from "@/src/shared/services/feeApi";
import {StyleSheet, View} from "react-native";
import {WalletIcon} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import {SmartText} from "@/src/shared/components/atoms";
import React from "react";
import {TransactionFooter} from "@/src/shared/components";


type Props = {
    formData: ParamsType
    fee: feeResponse
    isLoading: boolean
    onSubmit: () => void
}
export default function ChildConfirmation({formData, fee, isLoading, onSubmit}: Props) {
    const currency = formData.currency === "USD" ? "$" : "Fc";
    const feeAmount = Number(+formData?.amount * +fee?.percentage).toFixed(2)
    const total = Number(+formData?.amount + +feeAmount).toFixed(2)

    const currencyDisplay = () => {
        return <View style={styles.from}>
            <View style={{flexDirection: "row"}}>
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

        <View
            style={styles.container}
        >
            <SmartText style={styles.title}>Bénéficiaire</SmartText>
            <View style={styles.containerText}>
                <SmartText style={styles.subTitle}>Nom complet</SmartText>
                <SmartText style={styles.text}>{formData?.name}</SmartText>
            </View>
        </View>
        <TransactionFooter currency={currency} isLoading={isLoading} transactionType="Appro. dépendant"
                           feeAmount={feeAmount} onSubmit={onSubmit} totalAmount={total}/>
    </>
}

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
    containerText: {
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 2,
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
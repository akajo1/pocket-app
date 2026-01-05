import {height, ParamsType, width} from "@/src/utils/method";
import {feeResponse} from "@/src/shared/services/feeApi";
import {StyleSheet, View} from "react-native";
import {Phone, WalletIcon} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import {SmartText} from "@/src/shared/components/atoms";
import React from "react";
import {TransactionFooter} from "@/src/shared/components";
import {CurrencyDisplay} from "@/src/shared/components/molecules";


type Props = {
    formData: ParamsType
    fee: feeResponse
    isLoading: boolean
    onSubmit: () => void

}
export default function LoadConfirmation({formData, fee, isLoading, onSubmit}: Props) {
    const currency = formData.currency === "USD" ? "$" : "Fc";
    const feeAmount = Number(+formData?.amount * +fee?.percentage).toFixed(2)
    const total = Number(+formData?.amount + +feeAmount).toFixed(2)


    const currencyDisplay = (icon: any, subTitle: string, title: string) => {
        return <View style={styles.from}>
            <View style={{flexDirection: "row"}}>
                {icon}
                <SmartText style={{fontSize: 14, color: pallete.black, marginLeft: 8}}>
                    {subTitle}
                </SmartText>
            </View>
            <SmartText style={styles.wallet}>{title}</SmartText>
        </View>
    }

    return <>
        <CurrencyDisplay
            icon={<Phone size={20} color={pallete.blue}/>}
            subTitle={"Depuis"}
            title={formData?.mode}
        />
        <CurrencyDisplay
            icon={<WalletIcon size={20} color={pallete.dollars}/>}
            subTitle={"A mon Portemonaie"}
            title={formData?.currency}
        />

        <TransactionFooter
            currency={currency}
            isLoading={isLoading}
            transactionType="Approvisionnement"
            feeAmount={feeAmount}
            onSubmit={onSubmit} totalAmount={total}
        />

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
    transaction: {

        paddingVertical: 3,

        borderRadius: 8,

        flexDirection: "row",
        justifyContent: "space-between",
    },
    type: {},
    wallet: {
        fontSize: 32,
        color: pallete.black,
        fontWeight: "900",
        marginLeft: 28,
    },
    from: {
        backgroundColor: pallete.white,
        height: height / 10,
        width: width - 25,
        marginHorizontal: "auto",
        borderRadius: 20,
        padding: 20,
        marginVertical: 10
    },
})
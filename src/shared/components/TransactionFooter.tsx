import {ActivityIndicator, StyleSheet, View} from "react-native";
import {SmartText} from "@/src/shared/components/atoms";
import {height, width} from "@/src/utils/method";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import {pallete} from "@/src/utils/pallete";
import React from "react";

type Props = {
    transactionType: string,
    currency: string,
    feeAmount: number,
    totalAmount: number,
    isLoading: boolean,
    onSubmit: () => void,
}
export default function TransactionFooter({transactionType, currency, feeAmount, totalAmount,isLoading,onSubmit}: Props): JSX.Element {
    return   <View style={styles.container}>
        <SmartText style={styles.title}>Transaction</SmartText>
        <View style={[styles.container, styles.transaction, {marginBottom: 10}]}>
            <SmartText style={styles.subTitle}>Type de transaction</SmartText>
            <SmartText style={styles.type}>
                {transactionType}
            </SmartText>
        </View>
        <View style={[styles.container, styles.transaction]}>
            <SmartText style={styles.subTitle}>Frais de transaction</SmartText>
            <SmartText style={styles.text}>
                {feeAmount}   {currency}
            </SmartText>
        </View>
        <View style={[styles.container, styles.transaction,{marginTop:10}]}>
            <SmartText style={styles.subTitle}>Total à payer</SmartText>
            <SmartText style={styles.text}>
                {totalAmount} {currency}
            </SmartText>
        </View>

        <SmartButton
            title="Confirmez la transaction"
            disabled={isLoading  || isLoading}
            icon={isLoading ? <ActivityIndicator color={pallete.white} size={20} /> : null}
            onPress={()=>onSubmit()} style={{marginTop: 20}}/>
    </View>
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
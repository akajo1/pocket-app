import {StyleSheet, View} from "react-native";
import {SmartText} from "@/src/shared/components/atoms";
import moment from "moment/moment";
import React from "react";
import { width} from "@/src/utils/method";
import {pallete} from "@/src/utils/pallete";
type Props = {
    data: any;
}
export default function CreateChildConfirm({data}: Props) {
    const currency = data.currency === "USD" ? "$" : "Fc";
        return  <View
            style={styles.container}
        >
        <SmartText style={styles.title}>Bénéficiaire</SmartText>

        <View style={styles.containerText}>
            <SmartText style={styles.subTitle}>Nom complet</SmartText>
            <SmartText style={styles.text}>{data?.name}</SmartText>
        </View>

        <View style={styles.containerText}>
            <SmartText style={styles.subTitle}>Date de naissance</SmartText>
            <SmartText style={styles.text}>
                {moment(data?.age)?.format("DD/MM/YYYY")}

            </SmartText>
        </View>

        <View style={styles.containerText}>
            <SmartText style={styles.subTitle}>Montant</SmartText>
            <SmartText style={styles.text}>
                {parseFloat(data?.initialAmount?.toString())?.toFixed(2)} {currency}
            </SmartText>
        </View>

        <View style={styles.containerText}>
            <SmartText style={styles.subTitle}>Limite/jour</SmartText>
            <SmartText style={styles.text}>
                {parseFloat(data?.dailyLimit?.toString())?.toFixed(2)} {currency}
            </SmartText>
        </View>

        <View style={styles.containerText}>
            <SmartText style={styles.subTitle}>Limite/hebdomadaire</SmartText>
            <SmartText style={styles.text}>
                {parseFloat(data?.weeklyLimit?.toString())?.toFixed(2)} {currency}
            </SmartText>
        </View>
    </View>
}

const styles = StyleSheet.create({

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
    containerText:{
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 2,
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


})
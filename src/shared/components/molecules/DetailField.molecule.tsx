import {StyleSheet, View} from "react-native";
import {SmartText} from "@/src/shared/components/atoms";
import React from "react";
import {pallete} from "@/src/utils/pallete";

type Props = {
    label: string
    value: string
}

export default function DetailField({label, value}: Props) {
    return (
        <View style={styles.containerText}>
            <SmartText style={styles.subTitle}>{label}</SmartText>
            <SmartText style={styles.text}>{value}</SmartText>
        </View>
    )
}
const styles = StyleSheet.create({
    containerText:{
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    text:{
        fontSize: 14,
        color: pallete.black
    },
    subTitle:{
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 3,
        color: pallete.black,
        textTransform: "capitalize"
    },


})
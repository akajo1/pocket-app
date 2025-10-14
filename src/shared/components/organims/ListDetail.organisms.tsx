import {StyleSheet, View} from "react-native";
import {width} from "@/src/utils/method";
import {pallete} from "@/src/utils/pallete";
import {SmartText} from "@/src/shared/components/atoms";
import React from "react";
import {DetailField} from "@/src/shared/components/molecules";

type Props= {
    data: Array<{
        label: string,
        value: string
    }>,
    title?: string,
}

export default function ListDetail({data, title}: Props) {
    if(!data?.length) return <SmartText style={{color: pallete.error}}>Aucune liste des données fournie</SmartText>;
    return (
        <View
            style={styles.container}
        >
            {title ?? <SmartText style={styles.title}>{title}</SmartText>}
            {
                data?.map((item, index) => (
                    <DetailField key={index} label={item.label} value={item.value} />
                ))
            }
        </View>
    )
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
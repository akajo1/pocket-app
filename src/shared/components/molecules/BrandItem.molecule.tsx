import {StyleSheet, TouchableOpacity, View} from "react-native";
import {SmartImage, SmartText} from "@/src/shared/components/atoms";

import React from "react";
import {width} from "@/src/utils/method";
import {pallete} from "@/src/utils/pallete";

type BrandItemType = {
    icon: any,
    value: any,
    label: string
    isSelected: string,
    onSelected: (value: any) => any,
}
type Props = {
    item: BrandItemType
}

function BrandItem({item}: Props) {
    return <TouchableOpacity onPress={() => item.onSelected(item.value)}>
        <View style={styles.container}>
            {
                item.isSelected === item.value && (<View style={styles.check}/>)
            }
            <SmartImage
                source={item.icon}
                containerStyle={styles.contailerIcon}
            />
            <SmartText
                style={styles.textLabel}
            >
                {item.label}
            </SmartText>
        </View>
    </TouchableOpacity>
}

export default BrandItem

const styles = StyleSheet.create({
    container: {
        width: width / 4.6,
        position: "relative",
        marginRight: 3
    },
    contailerIcon: {
        width: width / 5,
        height: width / 5,
        backgroundColor: pallete.white,
        padding: 5,
        borderRadius: 10,
        marginBottom: 5,
        alignSelf: "center",
    },
    check: {
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        backgroundColor: pallete.success,
        position: 'absolute',
        zIndex: 1,
        right: 7,
        top: 5,
    },
    textLabel: {
        color: pallete.black,
        alignSelf: 'center',
        fontWeight: '400',
        textAlign: "center",
        fontSize: 12
    }
})
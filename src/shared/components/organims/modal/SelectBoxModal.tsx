import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {SmartText} from "@/src/shared/components/atoms";
import {X} from "lucide-react-native";
import React from "react";
import {pallete} from "@/src/utils/pallete";
import {height, width} from "@/src/utils/method";

type dataType = {
    label: string,
    value: string,
}
type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    currentChoose: dataType;
    onChangeCurrentChoose: (value: dataType) => void;
    data: dataType[];
    containerStyle?: ViewStyle;
}
export default function SelectBoxModal({isOpen,containerStyle = { height: height - 30}, onClose, title, data, currentChoose, onChangeCurrentChoose}: Props){

    const handleChoose = (value: dataType) => {
        onChangeCurrentChoose(value);
        onClose()
    }
    return   <Modal
        visible={isOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onClose}
    >
        <View style={[styles.container]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <X size={24} color="#6B7280" />
                </TouchableOpacity>
            </View>
        <ScrollView>
            {
                data?.map((item, index) => <View key={index} style={styles.containerView}>
                    <SmartText  isPressable

                               onPress={() => handleChoose(item)}
                               containerStyle={styles.containerText}
                               style={[styles.text, {color:item.value === currentChoose?.value ? pallete.blue : pallete.grey }]}>{item.label}</SmartText>
                    {
                        item.value === currentChoose?.value ?  <View style={styles.dot} /> : null
                    }
                    </View>
                )
            }
        </ScrollView>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: pallete.bg,
        flex: 1,
    },
    containerView: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: pallete.gray,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111827",
    },
    closeButton: {
        padding: 8,
    },
    containerText: {
        flex: 1,
        paddingVertical: 16,

    },
    text: {
        fontSize: 15,
        fontWeight: "500",
        textTransform: "capitalize"
    },
    dot: {backgroundColor: pallete.blue, width: 20, height: 20, borderRadius: 10}
});

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Modal from "react-native-modal";
import {useAlert} from "../provider/AlertProvider";
import {alertType} from "@/src/shared/components/organims/modal/AlertModal";
import {pallete} from "@/src/utils/pallete";

const {width, height} = Dimensions.get("window");

const AlertModal = () => {
    const {alertMessage, setAlertMessage} = useAlert()

    const handleCloseModal = () =>
        setAlertMessage({
            visible: false,
            message: "",
            title: "",
            type: "info",
            onPress: () => {
            },
            btnText: "",
        });

    const iconDisplay = () => {
        switch (alertMessage?.type) {
            case alertType.error:
                return {
                    icon: <MaterialIcons name="error" size={34} color={pallete.white}/>,
                    color: pallete.red,
                };
            case alertType.info:
                return {
                    icon: <Ionicons name="information" size={24} color={pallete.white}/>,
                    color: pallete.blue,
                };
            case alertType.success:
                return {
                    icon: <FontAwesome5 name="check" size={34} color={pallete.white}/>,
                    color: pallete.green,
                };
            case alertType.warning:
                return {
                    icon: <AntDesign name="warning" size={24} color={pallete.white}/>,
                    color: pallete.orange,
                };
            default:
                return {
                    icon: <Ionicons name="information" size={24} color={pallete.white}/>,
                    color: pallete.blue,
                };
        }
    };
    return (
        <Modal
            isVisible={alertMessage?.visible}
            animationIn="bounceIn"
            animationOut="bounceOut"
            backdropColor="#4f4e4e4e"
            onBackdropPress={() => handleCloseModal()}
        >
            <View style={styles.containerFluid}>
                <View style={styles.container}>
                    <View style={[styles.btn, {backgroundColor: iconDisplay().color}]}>
                        {iconDisplay().icon}
                    </View>

                    <Text style={{textAlign: "center"}}>{alertMessage?.title}</Text>
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 24,
                            fontWeight: 900,
                            width: 300,
                        }}
                    >
                        {alertMessage?.message}
                    </Text>
                    <TouchableOpacity
                        style={[styles.btns, {backgroundColor: iconDisplay().color}]}
                        onPress={() => {
                            handleCloseModal();
                            if (alertMessage?.onPress()) alertMessage?.onPress();
                        }}
                    >
                        <Text style={{color: pallete.white, fontWeight: 900}}>
                            {alertMessage?.btnText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    containerFluid: {flex: 1, justifyContent: "center", alignItems: "center"},
    container: {
        backgroundColor: pallete.white,
        borderRadius: 20,
        minWidth: width - 125,
        minHeight: height / 4,
        position: "relative",
        padding: 10,
    },
    btn: {
        alignSelf: "center",
        borderRadius: "100%",
        padding: 15,
        position: "relative",
        top: -40,
    },
    btns: {
        alignSelf: "center",
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 10,
    },
});
export default AlertModal;

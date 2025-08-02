import { AlertMessageContext } from "@/src/app/_layout";
import { colors } from "@/src/lib/colors";
import { alertType, height, width } from "@/src/lib/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
const AlertModal = () => {
  const { alertMessage, setAlertMessage } = useContext(AlertMessageContext);

  const handleCloseModal = () =>
    setAlertMessage({
      visible: false,
      message: "",
      title: "",
      type: "info",
      onPress: () => {},
      btnText: "",
    });

  const iconDisplay = () => {
    switch (alertMessage?.type) {
      case alertType.error:
        return {
          icon: <MaterialIcons name="error" size={34} color={colors.white} />,
          color: colors.red,
        };
      case alertType.info:
        return {
          icon: <Ionicons name="information" size={24} color={colors.white} />,
          color: colors.blue,
        };
      case alertType.success:
        return {
          icon: <FontAwesome5 name="check" size={34} color={colors.white} />,
          color: colors.green,
        };
      case alertType.warning:
        return {
          icon: <AntDesign name="warning" size={24} color={colors.white} />,
          color: colors.orange,
        };
      default:
        return {
          icon: <Ionicons name="information" size={24} color={colors.white} />,
          color: colors.blue,
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
          <View style={[styles.btn, { backgroundColor: iconDisplay().color }]}>
            {iconDisplay().icon}
          </View>

          <Text style={{ textAlign: "center" }}>{alertMessage?.title}</Text>
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
            style={[styles.btns, { backgroundColor: iconDisplay().color }]}
            onPress={() => {
              handleCloseModal();
              if (alertMessage?.onPress()) alertMessage?.onPress();
            }}
          >
            <Text style={{ color: colors.white, fontWeight: 900 }}>
              {alertMessage?.btnText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerFluid: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    backgroundColor: colors.white,
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

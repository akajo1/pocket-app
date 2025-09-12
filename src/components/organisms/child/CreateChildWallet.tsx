import { colors } from "@/src/lib/colors";
import { height } from "@/src/lib/constants";
import { useChildren } from "@/src/lib/hooks/useChildren";
import { childrenStyle } from "@/src/lib/styles/childrenStyle";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";

type Props = {
  isShown: boolean;
  handleHidemodal: (e: boolean) => void;
};

const CreateChildWallet = ({ isShown, handleHidemodal }: Props) => {
  const [form, setForm] = useState({
    fullname: "",
    age: 0,
    amount: 0,
  });
  const defaultStyles = useDefaultStyles();
  const { createChild, createChildError } = useChildren();
  const [isShownAge, setIsShownAge] = useState(false);

  const createChildWallet = async () => {
    if (form.fullname && form.age && form.amount) {
      createChild({
        ...form,
        initialAmount: form.amount,
        age: form.age,
        name: form.fullname,
      });
    }
  };

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (createChildError) {
      handleHidemodal(true);
      return;
    }
    handleHidemodal(false);
  }, [createChildError]);

  return (
    <Modal
      visible={isShown}
      animationType="slide"
      transparent={true}
      style={{ zIndex: 9 }}
    >
      <View style={childrenStyle.modalOverlay}></View>
      <Modal
        visible={isShownAge}
        animationType="fade"
        style={{ height: height / 1.5 }}
        transparent
      >
        <View
          style={{
            backgroundColor: "#00000098",
            borderRadius: 10,
            padding: 16,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DateTimePicker
            mode="single"
            locale="fr-FR"
            date={form.age}
            onChange={({ date }) => {
              handleChange("age", date);
              setIsShownAge(false);
            }}
            styles={defaultStyles}
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 10,
            }}
          />
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: colors.red,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  errorText: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "700",
  },
});
export default CreateChildWallet;

import { pallete } from "@/src/utils/pallete";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Checkbox } from "../atoms";

type Props = {
  accepted: boolean;
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  isRight?: boolean;
};

const CheckBoxInput = ({
  accepted,
  setAccepted,
  label,
  isRight = false,
}: Props) => {
  return (
    <View
      style={[styles.acceptRow, isRight ? { justifyContent: "flex-end" } : {}]}
    >
      {!isRight ? (
        <Checkbox checked={accepted} onToggle={() => setAccepted((v) => !v)} />
      ) : null}
      <Pressable onPress={() => setAccepted((acc) => !acc)}>
        <Text style={styles.acceptText}>{label}</Text>
      </Pressable>
      {isRight ? (
        <Checkbox checked={accepted} onToggle={() => setAccepted((v) => !v)} />
      ) : null}
    </View>
  );
};

export default CheckBoxInput;

const styles = StyleSheet.create({
  acceptRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  acceptText: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: "500",
    color: pallete.black,
  },
});

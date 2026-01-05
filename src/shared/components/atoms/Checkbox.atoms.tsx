import { pallete } from "@/src/utils/pallete";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  checked: boolean;
  onToggle: () => void;
};

const Checkbox = ({ checked, onToggle }: Props) => {
  return (
    <Pressable
      onPress={onToggle}
      style={[styles.checkbox, checked && styles.checkboxOn]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      {checked ? <Text style={styles.checkboxMark}>✓</Text> : null}
    </Pressable>
  );
};

export default Checkbox;
const styles = StyleSheet.create({
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: pallete.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxOn: { backgroundColor: pallete.blue },
  checkboxMark: { color: pallete.blue, fontWeight: "900" },
});

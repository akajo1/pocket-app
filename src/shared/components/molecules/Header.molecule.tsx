import { pallete } from "@/src/utils/pallete";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SmartText } from "../atoms";

type Props = {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title: string;
};

const Header = ({ left, right, title }: Props) => {
  return (
    <View style={styles.container}>
      {left}
      <SmartText style={styles.title}>{title}</SmartText>
      {right}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: pallete.bg,
    borderBottomWidth: 1,
    borderBottomColor: pallete.gray,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});

import { colors } from "@/src/lib/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon: unknown;
  description: string;
};

const NoData = ({ icon, description }: Props) => {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.textStyle}>{description}</Text>
    </View>
  );
};

export default NoData;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
  },
  textStyle: {
    width: 350,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
  },
});

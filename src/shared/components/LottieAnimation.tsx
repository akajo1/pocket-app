import LottieView from "lottie-react-native";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type Props = {
  animationData: any;
  isInfinite?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

const LottieAnimation = ({
  animationData,
  isInfinite = true,
  containerStyle,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <LottieView
        source={animationData}
        autoPlay
        loop={isInfinite}
        style={styles.lottie}
      />
    </View>
  );
};

export default LottieAnimation;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
});

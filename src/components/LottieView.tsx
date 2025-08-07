import { colors } from "@/src/lib/colors";
import { height, width } from "@/src/lib/constants";
import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";

type Props = {};

const LottieViews = (props: Props) => {
  const animation = useRef<LottieView>(null);

  return (
    <View style={styles.animationContainer}>
      <View style={{ backgroundColor: colors.white, borderRadius: 75 }}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 150,
            height: 150,
          }}
          source={require("../assets/Wallet.json")}
        />
      </View>
    </View>
  );
};

export default LottieViews;

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#21212116",
    alignItems: "center",
    justifyContent: "center",
    width,
    height,
    position: "absolute",
    zIndex: 99,
  },
});

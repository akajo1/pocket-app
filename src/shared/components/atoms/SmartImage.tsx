import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  source: ImageSourcePropType;
  containerStyle?: StyleProp<ViewStyle>;
};

const SmartImage = ({ source, containerStyle }: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={source} style={styles.image} />
    </View>
  );
};

export default SmartImage;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

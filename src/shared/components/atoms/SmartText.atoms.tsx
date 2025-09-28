import React from "react";
import { Pressable, StyleProp, Text, TextStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  isPressable?: boolean;
  onPress?: () => void;
};

const SmartText = ({ children, style = {}, isPressable, onPress }: Props) => {
  if (isPressable) {
    return (
      <Pressable onPress={onPress}>
        <Text style={style}>{children}</Text>
      </Pressable>
    );
  }
  return <Text style={style}>{children}</Text>;
};

export default SmartText;

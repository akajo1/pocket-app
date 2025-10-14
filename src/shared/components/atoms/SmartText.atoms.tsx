import React from "react";
import {Pressable, StyleProp, Text, TextStyle, View, ViewStyle} from "react-native";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  isPressable?: boolean;
  onPress?: () => void;
  containerStyle?:  StyleProp<ViewStyle>;
};

const SmartText = ({ children,containerStyle, style = {}, isPressable, onPress }: Props) => {
  if (isPressable) {
    return (
      <Pressable onPress={onPress} style={containerStyle}>
        <Text style={style}>{children}</Text>
      </Pressable>
    );
  }
  return <Text style={style}>{children}</Text>;
};

export default SmartText;

import { pallete } from "@/src/utils/pallete";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BadgeProps {
  text: string;
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  size?: "small" | "medium" | "large";
}

export default function Badge({
  text,
  variant = "neutral",
  size = "medium",
}: BadgeProps) {
  const getContainerStyle = () => {
    const baseStyle = [styles.container, styles[size]];

    switch (variant) {
      case "success":
        baseStyle.push(styles.success);
        break;
      case "warning":
        baseStyle.push(styles.warning);
        break;
      case "error":
        baseStyle.push(styles.error);
        break;
      case "info":
        baseStyle.push(styles.info);
        break;
      default:
        baseStyle.push(styles.neutral);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];

    switch (variant) {
      case "success":
        baseStyle.push(styles.successText);
        break;
      case "warning":
        baseStyle.push(styles.warningText);
        break;
      case "error":
        baseStyle.push(styles.errorText);
        break;
      case "info":
        baseStyle.push(styles.infoText);
        break;
      default:
        baseStyle.push(styles.neutralText);
    }

    return baseStyle;
  };

  return (
    <View style={getContainerStyle()}>
      <Text style={getTextStyle()}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  small: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  large: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  success: {
    backgroundColor: pallete.grey,
  },
  warning: {
    backgroundColor: pallete.grey,
  },
  error: {
    backgroundColor: pallete.red,
  },
  info: {
    backgroundColor: pallete.blue,
  },
  neutral: {
    backgroundColor: pallete.grey,
  },
  text: {
    fontWeight: "600",
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 14,
  },
  successText: {
    color: pallete.green,
  },
  warningText: {
    color: pallete.orange,
  },
  errorText: {
    color: pallete.red,
  },
  infoText: {
    color: pallete.blue,
  },
  neutralText: {
    color: pallete.grey,
  },
});

import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import {pallete} from "@/src/utils/pallete";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export default function SmartButton({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
                                      iconPosition = "left",
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];

    switch (variant) {
      case "secondary":
        baseStyle.push(styles.secondary);
        break;
      case "danger":
        baseStyle.push(styles.danger);
        break;
      case "success":
        baseStyle.push(styles.success);
        break;
      case "ghost":
        baseStyle.push(styles.ghost);
        break;
      default:
        baseStyle.push(styles.primary);
    }

    if (disabled) {
      baseStyle.push(styles.disabled);
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];

    switch (variant) {
      case "secondary":
        baseStyle.push(styles.secondaryText);
        break;
      case "ghost":
        baseStyle.push(styles.ghostText);
        break;
      default:
        baseStyle.push(styles.primaryText);
    }

    if (textStyle) {
      baseStyle.push(textStyle);
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.content}>
        { iconPosition === "left" && icon}
        <Text style={[getTextStyle(), icon && styles.textWithIcon]}>
          {title}
        </Text>
        { iconPosition === "right" && icon}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  primary: {
    backgroundColor: pallete.blue,
  },
  secondary: {
    backgroundColor: "transparent",
  },
  danger: {
    backgroundColor: pallete.red,
  },
  success: {
    backgroundColor: pallete.green,
  },
  ghost: {
    backgroundColor: pallete.gray,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
    textTransform: "capitalize",
  },
  textWithIcon: {
    marginLeft: 8,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryText: {
    color: "#6B7280",
  },
  ghostText: {
    color: pallete.blue,
  },
});

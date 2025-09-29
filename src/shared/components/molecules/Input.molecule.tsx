import { pallete } from "@/src/utils/pallete";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { SmartText } from "../atoms";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerStyle?: any;
  isSecure?: boolean;
  secureTextEntry?: boolean;
}

export default function Input({
  label,
  error,
  icon,
  containerStyle,
  style,
  isSecure,
  secureTextEntry = false,
  ...props
}: InputProps) {
  const [isVisible, setIsVisible] = useState(!secureTextEntry);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.errorContainer]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[styles.input, icon && styles.inputWithIcon, style]}
          placeholderTextColor={pallete.gray}
          {...props}
          secureTextEntry={!isVisible}
        />
        {secureTextEntry && (
          <View style={[styles.iconContainer, { left: -10 }]}>
            <Pressable onPress={() => setIsVisible(!isVisible)}>
              {!isVisible ? <EyeOff /> : <Eye />}
            </Pressable>
          </View>
        )}
      </View>
      {error && <SmartText style={styles.errorText}>{error}</SmartText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: pallete.black,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: pallete.white,
    borderRadius: 12,
    height: 48,
  },
  errorContainer: {
    borderColor: "#DC2626",
  },
  iconContainer: {
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  inputWithIcon: {
    paddingLeft: 12,
  },
  errorText: {
    fontSize: 14,
    color: "#DC2626",
    marginTop: 4,
  },
});

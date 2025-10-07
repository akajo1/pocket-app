import { pallete } from "@/src/utils/pallete";
import { Eye, EyeOff } from "lucide-react-native";
import moment from "moment";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
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
  type?: any;
  value: any;
  onPress?: () => void;
}

export default function Input({
  label,
  error,
  icon,
  containerStyle,
  style,
  isSecure,
  secureTextEntry = false,
  value,
  type,
  onPress,
  ...props
}: InputProps) {
  const [isVisible, setIsVisible] = useState(!secureTextEntry);
  if (type === "date") {
    return (
      <View style={[styles.container, containerStyle]}>
        {label && <SmartText style={styles.label}>{label}</SmartText>}
        <TouchableOpacity onPress={onPress}>
          <View style={styles.inputContainer}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <SmartText
              style={[styles.input, icon && styles.inputWithIcon, style]}
            >
              {value
                ? moment(value).format("DD/MM/YYYY")
                : "Sélectionner une date"}
            </SmartText>
          </View>
        </TouchableOpacity>
        {error && <SmartText style={styles.errorText}>{error}</SmartText>}
      </View>
    );
  }
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <SmartText style={styles.label}>{label}</SmartText>}
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

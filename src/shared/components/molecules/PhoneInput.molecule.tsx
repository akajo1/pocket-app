import { pallete } from "@/src/utils/pallete";
import React from "react";
import { StyleSheet } from "react-native";
import PhoneInput, {
  PhoneInputProps,
} from "react-native-international-phone-number";
import { SmartText } from "../atoms";

type Props = {
  rest: PhoneInputProps;
  title: string;
};

const SmartPhoneInput = ({ title, rest }: Props) => {
  const phoneInputStyles = {
    divider: { display: "none" },
    caret: { display: "none" },
    container: {
      backgroundColor: pallete.white,
      borderWidth: 1,
      borderColor: pallete.bg,
      borderRadius: 10,
    },
    flagContainer: {
      width: 80,
      backgroundColor: pallete.gray,
    },
    callingCode: { fontSize: 11, color: pallete.black },
  };
  return (
    <>
      <SmartText style={styles.label}>{title}</SmartText>
      <PhoneInput
        defaultCountry="CD"
        placeholderTextColor={pallete.gray}
        language="fra"
        placeholder="XXX XXX XXX"
        phoneInputStyles={phoneInputStyles}
        {...rest}
      />
    </>
  );
};

export default SmartPhoneInput;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: pallete.black,
    marginBottom: 8,
  },
});

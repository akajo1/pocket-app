import React, { ReactNode } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

type Props = {
  children: ReactNode;
};

const SmartKeyboardAvoidView = ({ children }: Props) => {
  return (
    <KeyboardAwareScrollView
      disableScrollOnKeyboardHide
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={{ paddingHorizontal: "5%" }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default SmartKeyboardAvoidView;

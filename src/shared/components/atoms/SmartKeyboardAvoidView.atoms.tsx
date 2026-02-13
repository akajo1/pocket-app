import React, { ReactNode } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {StyleProp, ViewStyle} from "react-native";

type Props = {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

const SmartKeyboardAvoidView = ({ children, containerStyle={ paddingHorizontal: "5%" } }: Props) => {
  return (
    <KeyboardAwareScrollView
      disableScrollOnKeyboardHide
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={containerStyle}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default SmartKeyboardAvoidView;

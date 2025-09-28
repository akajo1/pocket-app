import { pallete } from "@/src/utils/pallete";
import React from "react";
import { SafeAreaView } from "react-native";

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  return (
    <SafeAreaView style={{ backgroundColor: pallete.bg, flex: 1 }}>
      {children}
    </SafeAreaView>
  );
};

export default Wrapper;

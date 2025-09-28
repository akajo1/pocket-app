import { IconButton } from "@/src/shared/components/atoms";
import { Header } from "@/src/shared/components/molecules";
import Wrapper from "@/src/shared/components/Wrapper";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

type Props = {};

const RegisterTemplate = (props: Props) => {
  const navigation = useRouter();
  return (
    <Wrapper>
      <Header
        left={
          <IconButton
            icon={<ChevronLeft />}
            onPress={() => navigation.back()}
            variant="ghost"
            size="medium"
          />
        }
        right={<View style={{ width: 30 }} />}
        title="Création de compte"
      />
    </Wrapper>
  );
};

export default RegisterTemplate;

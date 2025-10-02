import { Finance } from "@/src/assets/animate";
import images from "@/src/assets/images";
import { LottieAnimation, Wrapper } from "@/src/shared/components";
import { SmartImage } from "@/src/shared/components/atoms";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import { height } from "@/src/utils/method";
import { pallete } from "@/src/utils/pallete";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthNavigationProps, authNavigationType } from "../services/types";
import useOnBoardingStore from "../store/onBoardingStore";

const OnBoarding = ({ onChangeScreen }: AuthNavigationProps) => {
  const { completeOnBoarding } = useOnBoardingStore.getState();

  const handleOnStart = () => {
    onChangeScreen(authNavigationType.TERMS);
  };
  const handleOnLogin = () => {
    completeOnBoarding();
    onChangeScreen(authNavigationType.LOGIN);
  };

  return (
    <Wrapper>
      <SmartImage
        source={images.fullLogo}
        containerStyle={styles.containerLogo}
      />
      <LottieAnimation
        animationData={Finance}
        containerStyle={styles.containerLottie}
      />
      <View style={styles.containerView}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            color: pallete.black,
          }}
        >
          Administrez vos finances avec prudence
        </Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 13,
            textAlign: "center",
            color: pallete.grey,
          }}
        >
          Suivez vos mouvements d’argent, votre balance et vos transactions de
          tous les jours en toute mobilité.
        </Text>
        <SmartButton
          title="Commencer"
          onPress={() => handleOnStart()}
          variant="primary"
          size="medium"
          style={{ marginTop: 20 }}
        />
        <SmartButton
          title="Se connecter"
          onPress={() => handleOnLogin()}
          variant="ghost"
          size="medium"
          style={{ marginTop: 20 }}
        />
      </View>
    </Wrapper>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  containerLogo: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  containerLottie: {
    height: height / 2.2,
  },
  containerView: {
    paddingHorizontal: 40,
    alignItems: "center",
  },
});

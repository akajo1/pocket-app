import React from "react";
import { OnBoarding, RegisterTemplate, TermsTemplate } from "./screens";
import Login from "./screens/LoginTemplate";
import useOnBoardingStore from "./store/onBoardingStore";

type Props = {};

const AuthNavigation = (props: Props) => {
  const isOnBoarding = useOnBoardingStore.getState()?.isOnBoarding;
  const [currentScreen, setCurrentScreen] = React.useState(
    isOnBoarding ? "login" : "onboarding"
  );

  const handleChangeScreen = (screen: string) => {
    setCurrentScreen(screen);
  };
  const navigation = () => {
    switch (currentScreen) {
      case "onboarding":
        return <OnBoarding onChangeScreen={handleChangeScreen} />;
      case "signup":
        return <RegisterTemplate onChangeScreen={handleChangeScreen} />;
      case "terms":
        return <TermsTemplate onChangeScreen={handleChangeScreen} />;
      default:
        return <Login onChangeScreen={handleChangeScreen} />;
    }
  };
  return navigation();
};

export default AuthNavigation;

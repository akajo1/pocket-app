import React from "react";
import { OnBoarding, RegisterTemplate, TermsTemplate } from "./screens";
import Login from "./screens/LoginTemplate";
import useOnBoardingStore from "./store/onBoardingStore";
import {PinScreen} from "@/src/entities/pin";

type PayloadType = {[key:string]: any}
const AuthNavigation = () => {
  const isOnBoarding = useOnBoardingStore.getState()?.isOnBoarding;
  const [currentScreen, setCurrentScreen] = React.useState(
    isOnBoarding ? "login" : "onboarding"
  );
  const [payload, setPayload] = React.useState<PayloadType>({} as PayloadType)

  const handleChangeScreen = (screen: string, payload:PayloadType= {}) => {
    setCurrentScreen(screen);
    if(payload) {
      setPayload(payload);
    }
  };
  const navigation = () => {
    switch (currentScreen) {
      case "onboarding":
        return <OnBoarding onChangeScreen={handleChangeScreen} />;
      case "signup":
        return <RegisterTemplate onChangeScreen={handleChangeScreen} />;
      case "terms":
        return <TermsTemplate onChangeScreen={handleChangeScreen} />;
      case "pin":
        return <PinScreen onChangeScreen={handleChangeScreen} payload={payload}/>
      case "confirmPin":
        return <PinScreen onChangeScreen={handleChangeScreen} payload={payload}/>
      default:
        return <Login onChangeScreen={handleChangeScreen} />;
    }
  };
  return navigation();
};

export default AuthNavigation;

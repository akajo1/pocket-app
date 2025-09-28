import { Stack } from "expo-router";
import React from "react";
import useOnBoardingStore from "./store/onBoardingStore";

type Props = {};

const AuthNavigation = (props: Props) => {
  const { isOnBoarding } = useOnBoardingStore();
  console.log("--isOnBoarding:", isOnBoarding);
  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName={isOnBoarding ? "onBoarding" : "login"}
    >
      <Stack.Screen name="onBoarding" />
      <Stack.Screen name="login" />
      <Stack.Screen name="terms" />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default AuthNavigation;

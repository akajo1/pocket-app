import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, {useContext, useEffect} from "react";
import useUserStore from "@/src/entities/auth/store/userStore";
import AuthNavigation from "@/src/entities/auth/AuthNavigation";
import {AuthContext} from "@/src/shared/provider/AuthProvider";
import useFetchUser from "@/src/entities/auth/hook/useFetchUser";
import {useAuthManager} from "@/src/entities/auth/hook/useAuthManager";

function LayoutContent() {
   const {user} = useAuthManager()
console.log("--user", user)
  const displayScreen = () => {
    if (!user) return <AuthNavigation />;
    return (
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(dashboard)" />
          <Stack.Screen name="notifications" />
        <Stack.Screen name="+not-found" />
      </Stack>
    );
  };
  return (
    <>
      <StatusBar style="auto" />
      {displayScreen()}
    </>
  );
}

export default LayoutContent;





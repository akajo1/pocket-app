import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import React, {useEffect} from "react";
import { Platform } from "react-native";
import ToastManager from "toastify-react-native";

import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import AuthNavigation from "../entities/auth/AuthNavigation";
import useUserStore from "../entities/auth/store/userStore";
import { AlertModal } from "../shared/components/organims";
import { AlertProvider } from "../shared/provider";
import Notifications from "@/src/app/notifications";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { user } = useUserStore.getState();
  const [isActive, setIsActive] = React.useState(false);

    useEffect(() => {
        console.log("--changement")
        if(user){
            setIsActive(true)
            return
        }
        setIsActive(false)
    }, [user]);

  const screenDisplay = () => {
    console.log("--user", user);
    if (!isActive) {
      return <AuthNavigation />;
    }

    return (
      <Stack
        initialRouteName="(dashboard)"
        screenOptions={{ headerShown: false }}
      >
          <Stack.Screen name="(dashboard)" />
          <Stack.Screen name="notifications" />
      </Stack>
    );
  };

  return (
    <>
      <ToastManager />
      <AlertProvider>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider>
            {screenDisplay()}
            <AlertModal />
            {Platform.OS === "web" && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </KeyboardProvider>
        </QueryClientProvider>
      </AlertProvider>
    </>
  );
}

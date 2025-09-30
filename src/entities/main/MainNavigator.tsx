import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import React, { useEffect } from "react";
import { Platform } from "react-native";
import ToastManager from "toastify-react-native";

import { Stack, useRootNavigationState, useRouter } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import useUserStore from "../entities/auth/store/userStore";
import { AlertModal } from "../shared/components/organims";
import { AlertProvider } from "../shared/provider";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { user } = useUserStore.getState();
  const router = useRouter();
  const navState = useRootNavigationState();
  useEffect(() => {
    if (!navState?.key) return; // navigation pas encore prête

    if (user) {
      router.replace("/(dashboard)");
    } else {
      router.replace("/(auth)");
    }
  }, [user, navState?.key, router]);
  return (
    <>
      <ToastManager />
      <AlertProvider>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider>
            <Stack
              initialRouteName="(auth)"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(dashboard)" />
            </Stack>
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

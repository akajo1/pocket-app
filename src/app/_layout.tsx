import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import React from "react";
import { Platform } from "react-native";
import ToastManager from "toastify-react-native";

import { Stack } from "expo-router";
import useUserStore from "../entities/auth/store/userStore";
import { AlertProvider } from "../shared/provider";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { user } = useUserStore();

  const renderContent = () => {
    if (!user) {
      return <Stack.Screen name="(auth)" />;
    }
    return <Stack.Screen name="(dashboard)" />;
  };

  return (
    <>
      <ToastManager />
      <AlertProvider>
        <QueryClientProvider client={queryClient}>
          <Stack
            initialRouteName="(auth)"
            screenOptions={{ headerShown: false }}
          >
            {renderContent()}
          </Stack>
          {Platform.OS === "web" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </AlertProvider>
    </>
  );
}

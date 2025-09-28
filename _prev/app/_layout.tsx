import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import React from "react";
import { Platform } from "react-native";
import ToastManager from "toastify-react-native";
import { LayoutContent } from "../components/guards";
import { AuthProvider } from "../entities/auth/model/AuthContext";
import { AlertProvider } from "../lib/context/AlertContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <>
      <ToastManager />
      <AlertProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <LayoutContent />
          </AuthProvider>
          {Platform.OS === "web" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </AlertProvider>
    </>
  );
}

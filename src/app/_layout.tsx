import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import React from "react";
import { Platform } from "react-native";
import ToastManager from "toastify-react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { AlertModal } from "../shared/components/organims";
import {AlertProvider, AuthProvider} from "../shared/provider";
import {LayoutContent} from "@/src/shared/guards";

const queryClient = new QueryClient();

export default function RootLayout() {

  return (
    <>
      <ToastManager />
      <AlertProvider>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider>
              <AuthProvider>
                  <LayoutContent />
              </AuthProvider>

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

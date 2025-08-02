import { AuthProvider } from "@/src/components/contexts/AuthContext";
import AuthGuard from "@/src/components/guards/AuthGuard";
import { useFrameworkReady } from "@/src/hooks/useFrameworkReady";
import { alertTypeProp } from "@/src/lib/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createContext, useState } from "react";
type AlertTypo = {
  visible: boolean;
  message: string;
  title?: string;
  type?: alertTypeProp;
  onPress?: () => void;
  btnText: string;
};
const queryClient = new QueryClient();
export const AlertMessageContext = createContext<{
  alertMessage: AlertTypo;
  setAlertMessage: React.Dispatch<React.SetStateAction<AlertTypo>>;
}>({
  alertMessage: {
    visible: false,
    message: "",
    title: "",
    type: "info",
    onPress: () => {},
    btnText: "ok",
  },
  setAlertMessage: () => {},
});
export default function RootLayout() {
  const [alertMessage, setAlertMessage] = useState<AlertTypo>({
    visible: false,
    message: "",
    title: "",
    type: "info",
    onPress: () => {},
    btnText: "",
  });

  useFrameworkReady();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AlertMessageContext value={{ alertMessage, setAlertMessage }}>
          <AuthGuard>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </AuthGuard>
        </AlertMessageContext>
      </AuthProvider>
    </QueryClientProvider>
  );
}

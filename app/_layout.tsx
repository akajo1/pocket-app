import { AuthProvider } from "@/components/contexts/AuthContext";
import AuthGuard from "@/components/guards/AuthGuard";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();

export default function RootLayout() {
  useFrameworkReady();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthGuard>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </AuthGuard>
      </AuthProvider>
    </QueryClientProvider>
  );
}

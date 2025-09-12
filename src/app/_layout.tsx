import { AuthProvider } from "@/src/components/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import ToastManager from "toastify-react-native";
import AlertModal from "../components/modals/AlertModal";
import AuthModal from "../components/modals/AuthModal";
import { AlertProvider, useAlert } from "../lib/context/AlertContext";
import { useAuth } from "../lib/hooks/useAuth";

// Création du client React Query
const queryClient = new QueryClient();

function LayoutContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const { alertMessage } = useAlert();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  const displayScreen = () => {
    if (!isAuthenticated) return <AuthModal />;
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="confirmationScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    );
  };
  return (
    <>
      <StatusBar style="auto" />
      {alertMessage.visible && <AlertModal />}
      {displayScreen()}
    </>
  );
}

export default function RootLayout() {
  return (
    <>
      <ToastManager />
      <AlertProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <LayoutContent />
          </AuthProvider>
        </QueryClientProvider>
      </AlertProvider>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6B7280",
  },
});

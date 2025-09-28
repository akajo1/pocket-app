import { useAlert } from "@/src/lib/context/AlertContext";
import { useAuth } from "@/src/lib/hooks/useAuth";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AlertModal from "../modals/AlertModal";
import AuthModal from "../modals/AuthModal";

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

export default LayoutContent;

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

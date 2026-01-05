import LoginForm from "@/src/components/forms/LoginForm";
import RegisterForm from "@/src/components/forms/RegisterForm";
import ForgotPasswordModal from "@/src/components/modals/ForgotPasswordModal";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { height } = Dimensions.get("screen");

type AuthMode = "login" | "register" | "forgot";

export default function AuthModal() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordClose = () => {
    setShowForgotPassword(false);
  };

  return (
    <>
      <View style={styles.modalOverlay}>
        <View style={styles.mask} />
        <View style={styles.modalContent}>
          <Text style={styles.logo}>Smart Pocket</Text>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {authMode === "login" ? "Connexion" : "Inscription"}
            </Text>
          </View>

          {authMode === "login" ? (
            <LoginForm
              onForgotPassword={handleForgotPassword}
              onSwitchToRegister={() => setAuthMode("register")}
            />
          ) : (
            <RegisterForm onSwitchToLogin={() => setAuthMode("login")} />
          )}
        </View>
      </View>

      <ForgotPasswordModal
        visible={showForgotPassword}
        onClose={handleForgotPasswordClose}
        onSuccess={() => {
          setShowForgotPassword(false);
          setAuthMode("login");
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e16c6ff",
  },
  mask: {
    width: 500,
    height,
    borderStartStartRadius: "100%",
    borderStartEndRadius: "100%",
    position: "absolute",
    top: 0,
    right: -30,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 32,
    color: "#1e16c6ff",
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 50,
  },
  modalContent: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
    width: "90%",
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    alignSelf: "center",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
});

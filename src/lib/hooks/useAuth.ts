import { StorageData } from "@/src/components/services/AsyncStorageService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Alert } from "react-native";
import { authApi } from "../api/authApi";
import { useAlert } from "../context/AlertContext";
import { useAuthStore } from "../stores/authStore";
import {
  ChangePasswordRequest,
  LoginRequest,
  RegisterRequest,
  User,
} from "../types";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const message = useAlert();
  const {
    user,
    isAuthenticated,
    isLoading,
    setUser,
    setTokens,
    setLoading,
    logout: logoutStore,
    updateUser,
  } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      if (response.success && response.data) {
        setUser(response.data.user);
        const tokens = {
          accessToken: response.data.tokens.accessToken,
          refreshToken: response.data.tokens.refreshToken,
        };
        StorageData().set("auth_tokens", tokens);
        setTokens(tokens.accessToken, tokens.refreshToken);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error: any) => {
      message?.setAlertMessage({
        visible: true,
        message: error.response?.data?.message || "Une erreur est survenue",
        title: "Connexion",
        type: "warning",
        onPress: () => {},
        btnText: "D'accord",
      });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onError: (error: any) => {
      Alert.alert(
        "Erreur d'inscription",
        error.response?.data?.message || "Erreur inconnue"
      );
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logoutStore();
      queryClient.clear();
    },
    onError: () => {
      // Even if API call fails, clear local data
      logoutStore();
      queryClient.clear();
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert("Succès", "Mot de passe modifié avec succès");
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message ||
          "Erreur lors du changement de mot de passe"
      );
    },
  });

  // Password reset mutations
  const requestPasswordResetMutation = useMutation({
    mutationFn: authApi.requestPasswordReset,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert("Succès", "Code de réinitialisation envoyé");
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors de l'envoi du code"
      );
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({
      email,
      code,
      newPassword,
    }: {
      email: string;
      code: string;
      newPassword: string;
    }) => authApi.resetPassword(email, code, newPassword),
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert("Succès", "Mot de passe réinitialisé avec succès");
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors de la réinitialisation"
      );
    },
  });

  // 2FA mutations
  const enable2FAMutation = useMutation({
    mutationFn: authApi.enable2FA,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert("Succès", "2FA activé avec succès");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors de l'activation 2FA"
      );
    },
  });

  const verify2FAMutation = useMutation({
    mutationFn: authApi.verify2FA,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert("Succès", "Code 2FA vérifié");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Code 2FA invalide"
      );
    },
  });

  const disable2FAMutation = useMutation({
    mutationFn: authApi.disable2FA,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert("Succès", "2FA désactivé");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors de la désactivation 2FA"
      );
    },
  });

  // Profile update mutation
  const updateProfileMutation = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (response) => {
      if (response.success && response.data) {
        updateUser(response.data);
        Alert.alert("Succès", "Profil mis à jour");
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur lors de la mise à jour"
      );
    },
  });

  // User profile query
  const profileData = useQuery({
    queryKey: ["user", "profile"],
    queryFn: () => authApi.getProfile(),
    enabled: isAuthenticated,
    onSuccess: (response) => {
      if (response.success && response.data) {
        updateUser(response.data);
      }
    },
  });

  // Security logs query
  const { data: securityLogs } = useQuery({
    queryKey: ["user", "security-logs"],
    queryFn: () => authApi.getSecurityLogs(),
    enabled: isAuthenticated,
  });

  // Helper functions
  const login = useCallback(
    (data: LoginRequest) => {
      return loginMutation.mutate(data);
    },
    [loginMutation]
  );

  const register = useCallback(
    (data: RegisterRequest) => {
      return registerMutation.mutate(data);
    },
    [registerMutation]
  );

  const logout = useCallback(() => {
    return logoutMutation.mutate();
  }, [logoutMutation]);

  const changePassword = useCallback(
    (data: ChangePasswordRequest) => {
      return changePasswordMutation.mutate(data);
    },
    [changePasswordMutation]
  );

  const requestPasswordReset = useCallback(
    (email: string) => {
      return requestPasswordResetMutation.mutate(email);
    },
    [requestPasswordResetMutation]
  );

  const resetPassword = useCallback(
    (email: string, code: string, newPassword: string) => {
      return resetPasswordMutation.mutate({ email, code, newPassword });
    },
    [resetPasswordMutation]
  );

  const enable2FA = useCallback(() => {
    return enable2FAMutation.mutate();
  }, [enable2FAMutation]);

  const verify2FA = useCallback(
    (code: string) => {
      return verify2FAMutation.mutate(code);
    },
    [verify2FAMutation]
  );

  const disable2FA = useCallback(
    (password: string) => {
      return disable2FAMutation.mutate(password);
    },
    [disable2FAMutation]
  );

  const updateProfile = useCallback(
    (data: Partial<User>) => {
      return updateProfileMutation.mutate(data);
    },
    [updateProfileMutation]
  );

  return {
    user,
    isAuthenticated,
    isLoading:
      isLoading ||
      loginMutation.isPending ||
      registerMutation.isPending ||
      logoutMutation.isPending ||
      changePasswordMutation.isPending,
    login,
    isLoginSuccess: loginMutation.isSuccess,
    isRegisterSuccess: registerMutation.isSuccess,
    register,
    logout,
    changePassword,
    requestPasswordReset,
    resetPassword,
    enable2FA,
    verify2FA,
    disable2FA,
    updateProfile,
    error: loginMutation.isError,
    securityLogs: securityLogs?.data,
    // Mutation states
  };
};

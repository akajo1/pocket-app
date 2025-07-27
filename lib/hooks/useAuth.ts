import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';
import { authApi } from '../api/authApi';
import { LoginRequest, RegisterRequest, ChangePasswordRequest, User } from '../types';
import { Alert } from 'react-native';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { 
    user, 
    isAuthenticated, 
    isLoading,
    setUser, 
    setTokens, 
    setLoading, 
    logout: logoutStore,
    updateUser 
  } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      if (response.success && response.data) {
        setUser(response.data.user);
        setTokens(response.data.tokens.accessToken, response.data.tokens.refreshToken);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur de connexion', error.response?.data?.message || 'Erreur inconnue');
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      if (response.success && response.data) {
        setUser(response.data.user);
        setTokens(response.data.tokens.accessToken, response.data.tokens.refreshToken);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur d\'inscription', error.response?.data?.message || 'Erreur inconnue');
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
        Alert.alert('Succès', 'Mot de passe modifié avec succès');
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors du changement de mot de passe');
    },
  });

  // Password reset mutations
  const requestPasswordResetMutation = useMutation({
    mutationFn: authApi.requestPasswordReset,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert('Succès', 'Code de réinitialisation envoyé');
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de l\'envoi du code');
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ email, code, newPassword }: { email: string; code: string; newPassword: string }) =>
      authApi.resetPassword(email, code, newPassword),
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert('Succès', 'Mot de passe réinitialisé avec succès');
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la réinitialisation');
    },
  });

  // 2FA mutations
  const enable2FAMutation = useMutation({
    mutationFn: authApi.enable2FA,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert('Succès', '2FA activé avec succès');
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de l\'activation 2FA');
    },
  });

  const verify2FAMutation = useMutation({
    mutationFn: authApi.verify2FA,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert('Succès', 'Code 2FA vérifié');
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Code 2FA invalide');
    },
  });

  const disable2FAMutation = useMutation({
    mutationFn: authApi.disable2FA,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert('Succès', '2FA désactivé');
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la désactivation 2FA');
    },
  });

  // Profile update mutation
  const updateProfileMutation = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (response) => {
      if (response.success && response.data) {
        updateUser(response.data);
        Alert.alert('Succès', 'Profil mis à jour');
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la mise à jour');
    },
  });

  // User profile query
  const { data: profileData } = useQuery({
    queryKey: ['user', 'profile'],
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
    queryKey: ['user', 'security-logs'],
    queryFn: () => authApi.getSecurityLogs(),
    enabled: isAuthenticated,
  });

  // Helper functions
  const login = useCallback((data: LoginRequest) => {
    return loginMutation.mutateAsync(data);
  }, [loginMutation]);

  const register = useCallback((data: RegisterRequest) => {
    return registerMutation.mutateAsync(data);
  }, [registerMutation]);

  const logout = useCallback(() => {
    return logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const changePassword = useCallback((data: ChangePasswordRequest) => {
    return changePasswordMutation.mutateAsync(data);
  }, [changePasswordMutation]);

  const requestPasswordReset = useCallback((email: string) => {
    return requestPasswordResetMutation.mutateAsync(email);
  }, [requestPasswordResetMutation]);

  const resetPassword = useCallback((email: string, code: string, newPassword: string) => {
    return resetPasswordMutation.mutateAsync({ email, code, newPassword });
  }, [resetPasswordMutation]);

  const enable2FA = useCallback(() => {
    return enable2FAMutation.mutateAsync();
  }, [enable2FAMutation]);

  const verify2FA = useCallback((code: string) => {
    return verify2FAMutation.mutateAsync(code);
  }, [verify2FAMutation]);

  const disable2FA = useCallback((password: string) => {
    return disable2FAMutation.mutateAsync(password);
  }, [disable2FAMutation]);

  const updateProfile = useCallback((data: Partial<User>) => {
    return updateProfileMutation.mutateAsync(data);
  }, [updateProfileMutation]);

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,
    login,
    register,
    logout,
    changePassword,
    requestPasswordReset,
    resetPassword,
    enable2FA,
    verify2FA,
    disable2FA,
    updateProfile,
    securityLogs: securityLogs?.data,
    // Mutation states
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    isChangePasswordLoading: changePasswordMutation.isPending,
  };
};
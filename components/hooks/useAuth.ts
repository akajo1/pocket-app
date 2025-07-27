import { useState, useEffect, useCallback } from 'react';
import { authService, User, AuthTokens, LoginCredentials, RegisterData, AuthResponse } from '../services/AuthService';

export interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<AuthResponse>;
  requestPasswordReset: (email: string) => Promise<AuthResponse>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<AuthResponse>;
  enable2FA: () => Promise<{ success: boolean; qrCode?: string; secret?: string }>;
  verify2FA: (code: string) => Promise<AuthResponse>;
  disable2FA: (password: string) => Promise<AuthResponse>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Refresh auth error:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);

      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Erreur lors de la connexion',
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      const response = await authService.register(data);

      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }

      return response;
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        message: 'Erreur lors de l\'inscription',
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (
    currentPassword: string,
    newPassword: string
  ): Promise<AuthResponse> => {
    try {
      return await authService.changePassword(currentPassword, newPassword);
    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        message: 'Erreur lors du changement de mot de passe',
      };
    }
  }, []);

  const requestPasswordReset = useCallback(async (email: string): Promise<AuthResponse> => {
    try {
      return await authService.requestPasswordReset(email);
    } catch (error) {
      console.error('Request password reset error:', error);
      return {
        success: false,
        message: 'Erreur lors de la demande de réinitialisation',
      };
    }
  }, []);

  const resetPassword = useCallback(async (
    email: string,
    code: string,
    newPassword: string
  ): Promise<AuthResponse> => {
    try {
      return await authService.resetPassword(email, code, newPassword);
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: 'Erreur lors de la réinitialisation du mot de passe',
      };
    }
  }, []);

  const enable2FA = useCallback(async (): Promise<{ success: boolean; qrCode?: string; secret?: string }> => {
    try {
      return await authService.enable2FA();
    } catch (error) {
      console.error('Enable 2FA error:', error);
      return { success: false };
    }
  }, []);

  const verify2FA = useCallback(async (code: string): Promise<AuthResponse> => {
    try {
      const response = await authService.verify2FA(code);
      
      if (response.success) {
        // Refresh user data to get updated 2FA status
        await refreshAuth();
      }
      
      return response;
    } catch (error) {
      console.error('Verify 2FA error:', error);
      return {
        success: false,
        message: 'Erreur lors de la vérification 2FA',
      };
    }
  }, [refreshAuth]);

  const disable2FA = useCallback(async (password: string): Promise<AuthResponse> => {
    try {
      const response = await authService.disable2FA(password);
      
      if (response.success) {
        // Refresh user data to get updated 2FA status
        await refreshAuth();
      }
      
      return response;
    } catch (error) {
      console.error('Disable 2FA error:', error);
      return {
        success: false,
        message: 'Erreur lors de la désactivation 2FA',
      };
    }
  }, [refreshAuth]);

  // Initialize auth state on mount
  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshAuth,
    changePassword,
    requestPasswordReset,
    resetPassword,
    enable2FA,
    verify2FA,
    disable2FA,
  };
};
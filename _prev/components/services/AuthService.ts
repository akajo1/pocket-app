import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    tokens: AuthTokens;
  };
  errors?: string[];
}

class AuthService {
  private baseURL =
    process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001/api";
  private tokenKey = "auth_tokens";
  private userKey = "auth_user";

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success && result.data) {
        await this.storeTokens(result.data.tokens);
        await this.storeUser(result.data.user);
      }

      return result;
    } catch (error) {
      console.error("Register error:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (result.success && result.data) {
        await this.storeTokens(result.data.tokens);
        await this.storeUser(result.data.user);
      }

      return result;
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      const tokens = await this.getTokens();

      if (tokens?.accessToken) {
        await fetch(`${this.baseURL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      await this.clearAuthData();
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<boolean> {
    try {
      const tokens = await this.getTokens();

      if (!tokens?.refreshToken) {
        return false;
      }

      const response = await fetch(`${this.baseURL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: tokens.refreshToken,
        }),
      });

      const result = await response.json();

      if (result.success && result.data?.tokens) {
        await this.storeTokens(result.data.tokens);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Refresh token error:", error);
      return false;
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const userString = await AsyncStorage.getItem(this.userKey);
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  }

  /**
   * Get stored tokens
   */
  async getTokens(): Promise<AuthTokens | null> {
    try {
      const tokensString = await AsyncStorage.getItem(this.tokenKey);
      return tokensString ? JSON.parse(tokensString) : null;
    } catch (error) {
      console.error("Get tokens error:", error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const tokens = await this.getTokens();
      const user = await this.getCurrentUser();

      if (!tokens?.accessToken || !user) {
        return false;
      }

      // Try to refresh token if needed
      const isValid = await this.validateToken(tokens.accessToken);
      if (!isValid) {
        const refreshed = await this.refreshToken();
        return refreshed;
      }

      return true;
    } catch (error) {
      console.error("Is authenticated error:", error);
      return false;
    }
  }

  /**
   * Validate token with server
   */
  private async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/auth/validate`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Store tokens securely
   */
  private async storeTokens(tokens: AuthTokens): Promise<void> {
    try {
      await AsyncStorage.setItem(this.tokenKey, JSON.stringify(tokens));
    } catch (error) {
      console.error("Store tokens error:", error);
    }
  }

  /**
   * Store user data
   */
  private async storeUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(this.userKey, JSON.stringify(user));
    } catch (error) {
      console.error("Store user error:", error);
    }
  }

  /**
   * Clear all auth data
   */
  private async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([this.tokenKey, this.userKey]);
    } catch (error) {
      console.error("Clear auth data error:", error);
    }
  }

  /**
   * Make authenticated request
   */
  async authenticatedRequest(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const tokens = await this.getTokens();

    if (!tokens?.accessToken) {
      throw new Error("No access token available");
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    // Handle token expiration
    if (response.status === 401) {
      const refreshed = await this.refreshToken();

      if (refreshed) {
        const newTokens = await this.getTokens();
        return fetch(`${this.baseURL}${endpoint}`, {
          ...options,
          headers: {
            Authorization: `Bearer ${newTokens!.accessToken}`,
            "Content-Type": "application/json",
            ...options.headers,
          },
        });
      } else {
        await this.clearAuthData();
        throw new Error("Session expired");
      }
    }

    return response;
  }

  /**
   * Change password
   */
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<AuthResponse> {
    try {
      const response = await this.authenticatedRequest(
        "/auth/change-password",
        {
          method: "POST",
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      return await response.json();
    } catch (error) {
      console.error("Change password error:", error);
      return {
        success: false,
        message: "Erreur lors du changement de mot de passe",
      };
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      return await response.json();
    } catch (error) {
      console.error("Request password reset error:", error);
      return {
        success: false,
        message: "Erreur lors de la demande de réinitialisation",
      };
    }
  }

  /**
   * Reset password with code
   */
  async resetPassword(
    email: string,
    code: string,
    newPassword: string
  ): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
          newPassword,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error("Reset password error:", error);
      return {
        success: false,
        message: "Erreur lors de la réinitialisation du mot de passe",
      };
    }
  }

  /**
   * Enable 2FA
   */
  async enable2FA(): Promise<{
    success: boolean;
    qrCode?: string;
    secret?: string;
  }> {
    try {
      const response = await this.authenticatedRequest("/auth/2fa/enable", {
        method: "POST",
      });

      return await response.json();
    } catch (error) {
      console.error("Enable 2FA error:", error);
      return { success: false };
    }
  }

  /**
   * Verify 2FA code
   */
  async verify2FA(code: string): Promise<AuthResponse> {
    try {
      const response = await this.authenticatedRequest("/auth/2fa/verify", {
        method: "POST",
        body: JSON.stringify({ code }),
      });

      return await response.json();
    } catch (error) {
      console.error("Verify 2FA error:", error);
      return {
        success: false,
        message: "Erreur lors de la vérification 2FA",
      };
    }
  }

  /**
   * Disable 2FA
   */
  async disable2FA(password: string): Promise<AuthResponse> {
    try {
      const response = await this.authenticatedRequest("/auth/2fa/disable", {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      return await response.json();
    } catch (error) {
      console.error("Disable 2FA error:", error);
      return {
        success: false,
        message: "Erreur lors de la désactivation 2FA",
      };
    }
  }
}

export const authService = new AuthService();

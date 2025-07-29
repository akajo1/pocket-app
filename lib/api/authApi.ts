import { apiClient } from "../api";
import {
  ChangePasswordRequest,
  LoginRequest,
  RegisterRequest,
  User,
} from "../types";

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export const authApi = {
  // Authentication
  async login(data: LoginRequest) {
    const respnse = await apiClient.post<AuthResponse>("/auth/login", data);
    console.log("--response", respnse);
    return respnse;
  },

  async register(data: RegisterRequest) {
    return await apiClient.post<AuthResponse>("/auth/register", data);
  },

  async logout() {
    return await apiClient.post("/auth/logout");
  },

  async refreshToken(refreshToken: string) {
    return await apiClient.post<{
      tokens: { accessToken: string; refreshToken: string };
    }>("/auth/refresh-token", {
      refreshToken,
    });
  },

  // Password management
  async changePassword(data: ChangePasswordRequest) {
    return apiClient.post("/auth/change-password", data);
  },

  async requestPasswordReset(email: string) {
    return apiClient.post("/auth/forgot-password", { email });
  },

  async resetPassword(email: string, code: string, newPassword: string) {
    return apiClient.post("/auth/reset-password", {
      email,
      code,
      newPassword,
    });
  },

  // 2FA management
  async enable2FA() {
    return apiClient.post<{ qrCode: string; secret: string }>(
      "/auth/2fa/enable"
    );
  },

  async verify2FA(code: string) {
    return apiClient.post("/auth/2fa/verify", { code });
  },

  async disable2FA(password: string) {
    return apiClient.post("/auth/2fa/disable", { password });
  },

  // Profile management
  async getProfile() {
    return apiClient.get<User>("/auth/profile");
  },

  async updateProfile(data: Partial<User>) {
    return apiClient.put<User>("/auth/profile", data);
  },

  // Security
  async getSecurityLogs(page = 1, limit = 20) {
    return apiClient.get(`/auth/security-logs?page=${page}&limit=${limit}`);
  },

  async logoutAllDevices() {
    return apiClient.post("/auth/logout-all");
  },
};

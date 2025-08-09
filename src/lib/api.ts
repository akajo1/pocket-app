import { StorageData } from "@/src/components/services/AsyncStorageService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

class ApiClient {
  private client: AxiosInstance;
  private baseURL =
    process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.77:3001/api/";

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      async (config) => {
        const token = await this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && (await this.getAccessToken())) {
          this.clearTokens();
        }
        return Promise.reject(error);
      }
    );
  }

  private async getAccessToken(): Promise<string | null> {
    try {
      const tokens = await StorageData().get("auth_tokens");
      return tokens ? tokens.accessToken : null;
    } catch {
      return null;
    }
  }

  private async getRefreshToken(): Promise<string | null> {
    try {
      const tokens = await StorageData().get("auth_tokens");
      return tokens ? tokens.refreshToken : null;
    } catch {
      return null;
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = await this.getRefreshToken();
      if (!refreshToken) return false;

      const response = await axios.post(`${this.baseURL}/auth/refresh-token`, {
        refreshToken,
      });

      if (response.data.success) {
        StorageData().set("auth_tokens", response.data.data.tokens);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  private async clearTokens(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        "auth_tokens",
        "auth_user",
        "auth-storage",
      ]);
    } catch (error) {
      console.error("Error clearing tokens:", error);
    }
  }

  // Generic request methods
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.get(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put(url, data, config);
    return response.data;
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete(url, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.patch(url, data, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();

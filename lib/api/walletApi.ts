import { apiClient } from '../api';
import { Wallet, TopUpWalletRequest } from '../types';

export const walletApi = {
  // Get all wallets
  async getWallets() {
    return apiClient.get<{ wallets: Wallet[] }>('/wallets');
  },

  // Create new wallet
  async createWallet(data: { name: string; cardNumber?: string; cardExpiry?: string; cardCvv?: string }) {
    return apiClient.post<{ walletId: number }>('/wallets', data);
  },

  // Get wallet by ID
  async getWallet(walletId: number) {
    return apiClient.get<Wallet>(`/wallets/${walletId}`);
  },

  // Update wallet
  async updateWallet(walletId: number, data: Partial<Wallet>) {
    return apiClient.put<Wallet>(`/wallets/${walletId}`, data);
  },

  // Delete wallet
  async deleteWallet(walletId: number) {
    return apiClient.delete(`/wallets/${walletId}`);
  },

  // Top up wallet
  async topUpWallet(data: TopUpWalletRequest) {
    return apiClient.post<{ amount: number; referenceNumber: string }>(`/wallets/${data.walletId}/topup`, data);
  },

  // Set primary wallet
  async setPrimaryWallet(walletId: number) {
    return apiClient.put(`/wallets/${walletId}/set-primary`);
  },

  // Toggle wallet status
  async toggleWalletStatus(walletId: number) {
    return apiClient.put(`/wallets/${walletId}/toggle-status`);
  },
};
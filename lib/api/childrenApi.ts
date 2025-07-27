import { apiClient } from '../api';
import { Child, CreateChildRequest, SendMoneyRequest, GiveRewardRequest, UpdateSpendingLimitsRequest, NFCDevice, SpendingLimit } from '../types';

export const childrenApi = {
  // Get all children
  async getChildren() {
    return apiClient.get<{ children: Child[] }>('/children');
  },

  // Create child
  async createChild(data: CreateChildRequest) {
    return apiClient.post<{ childId: number; name: string; age: number; balance: number }>('/children', data);
  },

  // Get child details
  async getChildDetails(childId: number) {
    return apiClient.get<{
      child: Child;
      recentTransactions: any[];
      nfcDevices: NFCDevice[];
      spendingLimits: SpendingLimit[];
    }>(`/children/${childId}`);
  },

  // Update child
  async updateChild(childId: number, data: Partial<Child>) {
    return apiClient.put<Child>(`/children/${childId}`, data);
  },

  // Delete child
  async deleteChild(childId: number) {
    return apiClient.delete(`/children/${childId}`);
  },

  // Send money to child
  async sendMoney(childId: number, data: SendMoneyRequest) {
    return apiClient.post<{
      amount: number;
      referenceNumber: string;
      childBalance: number;
    }>(`/children/${childId}/send-money`, data);
  },

  // Give reward to child
  async giveReward(childId: number, data: GiveRewardRequest) {
    return apiClient.post<{
      rewardId: number;
      amount: number;
      reason: string;
      childBalance: number;
    }>(`/children/${childId}/reward`, data);
  },

  // Update spending limits
  async updateSpendingLimits(childId: number, data: UpdateSpendingLimitsRequest) {
    return apiClient.put(`/children/${childId}/limits`, data);
  },

  // Get child transactions
  async getChildTransactions(childId: number, page = 1, limit = 20) {
    return apiClient.get(`/children/${childId}/transactions?page=${page}&limit=${limit}`);
  },

  // Get child analytics
  async getChildAnalytics(childId: number, period = '30') {
    return apiClient.get(`/children/${childId}/analytics?period=${period}`);
  },

  // Toggle child status
  async toggleChildStatus(childId: number) {
    return apiClient.put(`/children/${childId}/toggle-status`);
  },

  // Reset child spending
  async resetChildSpending(childId: number, type: 'daily' | 'weekly') {
    return apiClient.post(`/children/${childId}/reset-spending`, { type });
  },
};
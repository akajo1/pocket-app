import { apiClient, PaginatedResponse } from '../api';
import { Notification } from '../types';

export interface NotificationFilters {
  page?: number;
  limit?: number;
  type?: string;
  unreadOnly?: boolean;
}

export const notificationApi = {
  // Get notifications with filters
  async getNotifications(filters: NotificationFilters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    return apiClient.get<PaginatedResponse<Notification>>(`/notifications?${params.toString()}`);
  },

  // Get notification statistics
  async getStats() {
    return apiClient.get<{
      total: number;
      unread: number;
      transaction_count: number;
      security_count: number;
      reward_count: number;
      system_count: number;
    }>('/notifications/stats');
  },

  // Mark notification as read
  async markAsRead(notificationId: number) {
    return apiClient.put(`/notifications/${notificationId}/read`);
  },

  // Mark all notifications as read
  async markAllAsRead() {
    return apiClient.put('/notifications/mark-all-read');
  },

  // Delete notification
  async deleteNotification(notificationId: number) {
    return apiClient.delete(`/notifications/${notificationId}`);
  },

  // Get notification by ID
  async getNotification(notificationId: number) {
    return apiClient.get<Notification>(`/notifications/${notificationId}`);
  },

  // Update notification preferences
  async updatePreferences(preferences: {
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    smsNotifications?: boolean;
    transactionNotifs?: boolean;
    securityNotifs?: boolean;
    marketingNotifs?: boolean;
    childrenNotifs?: boolean;
    rewardsNotifs?: boolean;
  }) {
    return apiClient.put('/notifications/preferences', preferences);
  },

  // Get notification preferences
  async getPreferences() {
    return apiClient.get('/notifications/preferences');
  },
};
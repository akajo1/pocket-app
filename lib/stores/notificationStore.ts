import { create } from 'zustand';
import { Notification } from '../types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  filters: {
    type?: string;
    unreadOnly?: boolean;
  };
}

interface NotificationActions {
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  updateNotification: (id: number, updates: Partial<Notification>) => void;
  removeNotification: (id: number) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<NotificationState['filters']>) => void;
  updateUnreadCount: () => void;
}

export const useNotificationStore = create<NotificationState & NotificationActions>((set, get) => ({
  // State
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  filters: {},

  // Actions
  setNotifications: (notifications) => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    set({ notifications, unreadCount });
  },

  addNotification: (notification) => set((state) => {
    const newNotifications = [notification, ...state.notifications];
    const unreadCount = newNotifications.filter(n => !n.isRead).length;
    return { notifications: newNotifications, unreadCount };
  }),

  updateNotification: (id, updates) => set((state) => {
    const notifications = state.notifications.map(notification => 
      notification.id === id ? { ...notification, ...updates } : notification
    );
    const unreadCount = notifications.filter(n => !n.isRead).length;
    return { notifications, unreadCount };
  }),

  removeNotification: (id) => set((state) => {
    const notifications = state.notifications.filter(notification => notification.id !== id);
    const unreadCount = notifications.filter(n => !n.isRead).length;
    return { notifications, unreadCount };
  }),

  markAsRead: (id) => set((state) => {
    const notifications = state.notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    );
    const unreadCount = notifications.filter(n => !n.isRead).length;
    return { notifications, unreadCount };
  }),

  markAllAsRead: () => set((state) => {
    const notifications = state.notifications.map(notification => 
      ({ ...notification, isRead: true })
    );
    return { notifications, unreadCount: 0 };
  }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),

  updateUnreadCount: () => set((state) => ({
    unreadCount: state.notifications.filter(n => !n.isRead).length
  })),
}));
import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationStore } from '../stores/notificationStore';
import { notificationApi, NotificationFilters } from '../api/notificationApi';
import { Alert } from 'react-native';

export const useNotifications = (filters: NotificationFilters = {}) => {
  const queryClient = useQueryClient();
  const { 
    notifications, 
    unreadCount,
    isLoading,
    error,
    filters: storeFilters,
    setNotifications, 
    addNotification, 
    updateNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    setLoading, 
    setError,
    setFilters,
    updateUnreadCount
  } = useNotificationStore();

  // Merge filters from hook params and store
  const mergedFilters = { ...storeFilters, ...filters };

  // Get notifications query
  const notificationsQuery = useQuery({
    queryKey: ['notifications', mergedFilters],
    queryFn: async () => {
      const response = await notificationApi.getNotifications(mergedFilters);
      if (response.success && response.data) {
        setNotifications(response.data.items);
        return response.data;
      }
      throw new Error(response.message);
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  // Get notification stats query
  const statsQuery = useQuery({
    queryKey: ['notifications', 'stats'],
    queryFn: async () => {
      const response = await notificationApi.getStats();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message);
    },
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: notificationApi.markAsRead,
    onSuccess: (response, notificationId) => {
      if (response.success) {
        markAsRead(notificationId);
        queryClient.invalidateQueries({ queryKey: ['notifications', 'stats'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la mise à jour');
    },
  });

  // Mark all as read mutation
  const markAllAsReadMutation = useMutation({
    mutationFn: notificationApi.markAllAsRead,
    onSuccess: (response) => {
      if (response.success) {
        markAllAsRead();
        queryClient.invalidateQueries({ queryKey: ['notifications', 'stats'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la mise à jour');
    },
  });

  // Delete notification mutation
  const deleteNotificationMutation = useMutation({
    mutationFn: notificationApi.deleteNotification,
    onSuccess: (response, notificationId) => {
      if (response.success) {
        removeNotification(notificationId);
        queryClient.invalidateQueries({ queryKey: ['notifications', 'stats'] });
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la suppression');
    },
  });

  // Update preferences mutation
  const updatePreferencesMutation = useMutation({
    mutationFn: notificationApi.updatePreferences,
    onSuccess: (response) => {
      if (response.success) {
        Alert.alert('Succès', 'Préférences mises à jour');
      }
    },
    onError: (error: any) => {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la mise à jour');
    },
  });

  // Get preferences query
  const preferencesQuery = useQuery({
    queryKey: ['notifications', 'preferences'],
    queryFn: async () => {
      const response = await notificationApi.getPreferences();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message);
    },
  });

  // Helper functions
  const markNotificationAsRead = useCallback((notificationId: number) => {
    return markAsReadMutation.mutateAsync(notificationId);
  }, [markAsReadMutation]);

  const markAllNotificationsAsRead = useCallback(() => {
    return markAllAsReadMutation.mutateAsync();
  }, [markAllAsReadMutation]);

  const deleteNotification = useCallback((notificationId: number) => {
    return deleteNotificationMutation.mutateAsync(notificationId);
  }, [deleteNotificationMutation]);

  const updatePreferences = useCallback((preferences: any) => {
    return updatePreferencesMutation.mutateAsync(preferences);
  }, [updatePreferencesMutation]);

  const updateFilters = useCallback((newFilters: Partial<NotificationFilters>) => {
    setFilters(newFilters);
  }, [setFilters]);

  const refreshNotifications = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey: ['notifications'] });
  }, [queryClient]);

  return {
    // State
    notifications,
    unreadCount,
    stats: statsQuery.data,
    preferences: preferencesQuery.data,
    isLoading: isLoading || notificationsQuery.isLoading,
    error: error || notificationsQuery.error?.message,
    filters: mergedFilters,

    // Actions
    markAsRead: markNotificationAsRead,
    markAllAsRead: markAllNotificationsAsRead,
    deleteNotification,
    updatePreferences,
    updateFilters,
    refreshNotifications,

    // Mutation states
    isMarkingAsRead: markAsReadMutation.isPending,
    isMarkingAllAsRead: markAllAsReadMutation.isPending,
    isDeleting: deleteNotificationMutation.isPending,
    isUpdatingPreferences: updatePreferencesMutation.isPending,

    // Query states
    isStatsLoading: statsQuery.isLoading,
    isPreferencesLoading: preferencesQuery.isLoading,
  };
};
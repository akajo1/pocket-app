import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Bell, X, Check, Trash2, Settings, CreditCard, Users, TrendingUp, Gift, CheckCheck, Archive } from 'lucide-react-native';

interface Notification {
  id: number;
  type: 'transaction' | 'security' | 'reward' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  icon?: React.ComponentType<any>;
  color?: string;
}

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: number) => void;
}

export default function NotificationModal({
  visible,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification
}: NotificationModalProps) {
  const [selectedTab, setSelectedTab] = useState('all');

  const tabs = [
    { key: 'all', label: 'Toutes' },
    { key: 'transaction', label: 'Transactions' },
    { key: 'security', label: 'Sécurité' },
    { key: 'reward', label: 'Récompenses' },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return { icon: CreditCard, color: '#4F46E5' };
      case 'security':
        return { icon: Settings, color: '#DC2626' };
      case 'reward':
        return { icon: Gift, color: '#059669' };
      case 'system':
        return { icon: Bell, color: '#F59E0B' };
      default:
        return { icon: Bell, color: '#6B7280' };
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    selectedTab === 'all' || notification.type === selectedTab
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInMinutes < 1) {
      return 'Maintenant';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}min`;
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours}h`;
    } else if (diffInDays === 1) {
      return 'Hier';
    } else {
      return `${diffInDays}j`;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, unreadCount > 0 && styles.headerWithUnread]}>
          <View style={styles.headerLeft}>
            <View style={[styles.iconContainer, unreadCount > 0 && styles.iconContainerActive]}>
              <Bell size={24} color="#8B5CF6" />
              {unreadCount > 0 && (
                <View style={styles.headerBadge}>
                  <Text style={styles.headerBadgeText}>{unreadCount}</Text>
                </View>
              )}
            </View>
            <View>
              <Text style={styles.headerTitle}>Notifications</Text>
              {unreadCount > 0 && (
                <Text style={styles.unreadCount}>
                  {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''}
                </Text>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        {unreadCount > 0 && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.markAllButton} onPress={onMarkAllAsRead}>
              <CheckCheck size={16} color="#FFFFFF" />
              <Text style={styles.markAllText}>Tout marquer comme lu</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                selectedTab === tab.key && styles.activeTab
              ]}
              onPress={() => setSelectedTab(tab.key)}>
              <Text style={[
                styles.tabText,
                selectedTab === tab.key && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
              {tab.key !== 'all' && (
                <View style={styles.tabCount}>
                  <Text style={styles.tabCountText}>
                    {notifications.filter(n => n.type === tab.key).length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Notifications List */}
        <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const { icon: IconComponent, color } = getNotificationIcon(notification.type);
              
              return (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationItem,
                    !notification.isRead && styles.unreadNotification
                  ]}
                  onPress={() => onMarkAsRead(notification.id)}>
                  <View style={[
                    styles.notificationIcon, 
                    { backgroundColor: color + '20' },
                    !notification.isRead && styles.unreadIcon
                  ]}>
                    <IconComponent size={20} color={color} />
                    {!notification.isRead && <View style={styles.unreadDot} />}
                  </View>
                  
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationHeader}>
                      <Text style={[
                        styles.notificationTitle,
                        !notification.isRead && styles.unreadTitle
                      ]}>
                        {notification.title}
                      </Text>
                      <Text style={styles.notificationTime}>
                        {formatTime(notification.timestamp)}
                      </Text>
                    </View>
                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>
                    <View style={styles.notificationFooter}>
                      <Text style={styles.notificationTime}>
                        {formatTime(notification.timestamp)}
                      </Text>
                      {!notification.isRead && (
                        <View style={styles.newBadge}>
                          <Text style={styles.newBadgeText}>NOUVEAU</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDeleteNotification(notification.id)}>
                    <Archive size={16} color="#6B7280" />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Bell size={48} color="#D1D5DB" />
              </View>
              <Text style={styles.emptyTitle}>Aucune notification</Text>
              <Text style={styles.emptyMessage}>
                {selectedTab === 'all' 
                  ? 'Vous n\'avez aucune notification pour le moment'
                  : `Aucune notification de type "${tabs.find(t => t.key === selectedTab)?.label}"`
                }
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  headerWithUnread: {
    borderBottomWidth: 2,
    borderBottomColor: '#8B5CF6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  iconContainerActive: {
    backgroundColor: '#8B5CF6' + '20',
  },
  headerBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  headerBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  unreadCount: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: 'flex-start',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  markAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeTab: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabCount: {
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  tabCountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  unreadNotification: {
    borderLeftWidth: 6,
    borderLeftColor: '#8B5CF6',
    backgroundColor: '#FEFEFF',
    borderColor: '#E0E7FF',
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadIcon: {
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.3,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 12,
    lineHeight: 22,
  },
  unreadTitle: {
    fontWeight: '700',
    color: '#1F2937',
  },
  notificationMessage: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 12,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTime: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  newBadge: {
    backgroundColor: '#059669',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 12,
  },
  emptyMessage: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
  },
});
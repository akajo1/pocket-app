import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bell } from 'lucide-react-native';
import IconButton from '../atoms/IconButton';

interface AppHeaderProps {
  greeting: string;
  userName: string;
  notificationCount?: number;
  onNotificationPress?: () => void;
}

export default function AppHeader({ 
  greeting, 
  userName, 
  notificationCount = 0,
  onNotificationPress
}: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      
      {onNotificationPress && (
        <View style={styles.notificationContainer}>
          <IconButton
            icon={<Bell size={24} color="#4F46E5" />}
            onPress={onNotificationPress}
            size="large"
          />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
import { Power, Settings, Trash2 } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Badge from '../atoms/Badge';

interface NFCDevice {
  id: string;
  type: 'bracelet' | 'tag';
  name: string;
  linkedAt: string;
  isActive: boolean;
  lastUsed?: string;
}

interface NFCDeviceCardProps {
  device: NFCDevice;
  onRemove: (deviceId: string) => void;
  onToggleStatus: (deviceId: string) => void;
  onSettings: (deviceId: string) => void;
}

export default function NFCDeviceCard({ 
  device, 
  onRemove, 
  onToggleStatus, 
  onSettings 
}: NFCDeviceCardProps) {
  const getDeviceIcon = () => {
    return device.type === 'bracelet' ? '⌚' : '🏷️';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.deviceInfo}>
        <View style={[
          styles.deviceIcon,
          { backgroundColor: device.isActive ? '#DCFCE7' : '#F3F4F6' }
        ]}>
          <Text style={styles.deviceEmoji}>{getDeviceIcon()}</Text>
        </View>
        
        <View style={styles.deviceDetails}>
          <View style={styles.deviceHeader}>
            <Text style={styles.deviceName}>{device.name}</Text>
            <Badge 
              text={device.isActive ? 'Actif' : 'Inactif'}
              variant={device.isActive ? 'success' : 'neutral'}
              size="small"
            />
          </View>
          
          <Text style={styles.deviceType}>
            {device.type === 'bracelet' ? 'Bracelet NFC' : 'Tag NFC'}
          </Text>
          
          <Text style={styles.linkedDate}>
            Lié le {formatDate(device.linkedAt)}
          </Text>
          
          {device.lastUsed && (
            <Text style={styles.lastUsed}>
              Dernière utilisation: {formatDate(device.lastUsed)}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.toggleButton]}
          onPress={() => onToggleStatus(device.id)}>
          <Power 
            size={16} 
            color={device.isActive ? '#DC2626' : '#059669'} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.settingsButton]}
          onPress={() => onSettings(device.id)}>
          <Settings size={16} color="#6B7280" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.removeButton]}
          onPress={() => onRemove(device.id)}>
          <Trash2 size={16} color="#DC2626" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    elevation: 3,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  deviceEmoji: {
    fontSize: 24,
  },
  deviceDetails: {
    flex: 1,
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  deviceType: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  linkedDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  lastUsed: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  toggleButton: {
    backgroundColor: '#F3F4F6',
  },
  settingsButton: {
    backgroundColor: '#F3F4F6',
  },
  removeButton: {
    backgroundColor: '#FEF2F2',
  },
});
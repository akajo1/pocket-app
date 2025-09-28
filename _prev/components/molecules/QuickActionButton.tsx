import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface QuickActionButtonProps {
  icon: React.ComponentType<any>;
  label: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
}

export default function QuickActionButton({ 
  icon, 
  label, 
  onPress, 
  color = '#4F46E5',
  disabled = false 
}: QuickActionButtonProps) {
  const IconComponent = icon;
  
  return (
    <TouchableOpacity 
      style={[styles.container, disabled && styles.disabled]} 
      onPress={onPress}
      disabled={disabled}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <IconComponent size={24} color={color} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
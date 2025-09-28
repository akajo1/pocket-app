import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
}

export default function IconButton({ 
  icon, 
  onPress, 
  size = 'medium', 
  variant = 'secondary',
  disabled = false,
  style
}: IconButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primary);
        break;
      case 'ghost':
        baseStyle.push(styles.ghost);
        break;
      default:
        baseStyle.push(styles.secondary);
    }
    
    if (disabled) {
      baseStyle.push(styles.disabled);
    }
    
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity 
      style={getButtonStyle()} 
      onPress={onPress}
      disabled={disabled}>
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  small: {
    width: 32,
    height: 32,
  },
  medium: {
    width: 40,
    height: 40,
  },
  large: {
    width: 48,
    height: 48,
  },
  primary: {
    backgroundColor: '#4F46E5',
  },
  secondary: {
    backgroundColor: '#FFFFFF',
  },
  ghost: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  disabled: {
    opacity: 0.5,
  },
});
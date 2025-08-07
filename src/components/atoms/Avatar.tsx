import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AvatarProps {
  text: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  backgroundColor?: string;
  textColor?: string;
}

export default function Avatar({ 
  text, 
  size = 'medium', 
  backgroundColor = '#4F46E5',
  textColor = '#FFFFFF'
}: AvatarProps) {
  const getContainerStyle = () => {
    const baseStyle = [styles.container, styles[size]];
    baseStyle.push({ backgroundColor });
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    baseStyle.push({ color: textColor });
    return baseStyle;
  };

  return (
    <View style={getContainerStyle()}>
      <Text style={getTextStyle()}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    width: 32,
    height: 32,
  },
  medium: {
    width: 48,
    height: 48,
  },
  large: {
    width: 64,
    height: 64,
  },
  xlarge: {
    width: 80,
    height: 80,
  },
  text: {
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 18,
  },
  largeText: {
    fontSize: 24,
  },
  xlargeText: {
    fontSize: 32,
  },
});
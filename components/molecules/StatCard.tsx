import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string;
  backgroundColor?: string;
}

export default function StatCard({ 
  icon, 
  label, 
  value, 
  color = '#4F46E5',
  backgroundColor = '#FFFFFF'
}: StatCardProps) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    padding: 20,
    borderRadius: 16,
    marginRight: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
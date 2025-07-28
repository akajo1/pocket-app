import { Users } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SubWallet {
  id: number;
  name: string;
  balance: number;
  avatar: string;
}

interface SubWalletCardProps {
  wallet: SubWallet;
  onPress: () => void;
}

export default function SubWalletCard({ wallet, onPress }: SubWalletCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.avatar}>{wallet.avatar}</Text>
        <View style={styles.details}>
          <Text style={styles.name}>{wallet.name}</Text>
          <Text style={styles.balance}>€{wallet.balance.toFixed(2)}</Text>
        </View>
      </View>
      <Users size={16} color="#9CA3AF" />
    </TouchableOpacity>
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
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    fontSize: 32,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  balance: {
    fontSize: 14,
    color: '#059669',
    fontWeight: 'bold',
  },
});
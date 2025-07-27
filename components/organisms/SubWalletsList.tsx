import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import SubWalletCard from '../molecules/SubWalletCard';
import IconButton from '../atoms/IconButton';

interface SubWallet {
  id: number;
  name: string;
  balance: number;
  avatar: string;
}

interface SubWalletsListProps {
  title: string;
  wallets: SubWallet[];
  onWalletPress: (wallet: SubWallet) => void;
  onAddPress?: () => void;
}

export default function SubWalletsList({ 
  title, 
  wallets, 
  onWalletPress,
  onAddPress
}: SubWalletsListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {onAddPress && (
          <IconButton
            icon={<Plus size={20} color="#4F46E5" />}
            onPress={onAddPress}
            size="medium"
          />
        )}
      </View>
      
      {wallets.map((wallet) => (
        <SubWalletCard
          key={wallet.id}
          wallet={wallet}
          onPress={() => onWalletPress(wallet)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
});
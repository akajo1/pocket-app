import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';

interface HomeTemplateProps {
  header: React.ReactNode;
  walletCard: React.ReactNode;
  quickActions: React.ReactNode;
  analytics: React.ReactNode;
  subWallets: React.ReactNode;
  transactions: React.ReactNode;
}

export default function HomeTemplate({
  header,
  walletCard,
  quickActions,
  analytics,
  subWallets,
  transactions
}: HomeTemplateProps) {
  return (
    <SafeAreaView style={styles.container}>
      {header}
      <ScrollView showsVerticalScrollIndicator={false}>
        {walletCard}
        {quickActions}
        {analytics}
        {subWallets}
        {transactions}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
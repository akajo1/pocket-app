import SendMoneyModal from "@/src/components/modals/SendMoneyModal";
import TransactionDetailModal from "@/src/components/modals/TransactionDetailModal";
import WalletCard from "@/src/components/molecules/WalletCard";
import NetworkCreditModal from "@/src/components/NetworkCreditModal";
import NFCPaymentModal from "@/src/components/NFCPaymentModal";
import AppHeader from "@/src/components/organisms/AppHeader";
import QuickActionsGrid from "@/src/components/organisms/QuickActionsGrid";
import SubWalletsList from "@/src/components/organisms/SubWalletsList";
import TransactionsList from "@/src/components/organisms/TransactionsList";
import QRScannerModal from "@/src/components/QRScannerModal";
import { colors } from "@/src/lib/colors";
import { quickActions } from "@/src/lib/constants";
import { useAuth } from "@/src/lib/hooks/useAuth";
import { useChildren } from "@/src/lib/hooks/useChildren";
import { useNotifications } from "@/src/lib/hooks/useNotifications";
import { useTransactions } from "@/src/lib/hooks/useTransactions";
import { useWallets } from "@/src/lib/hooks/useWallets";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {useQuery} from "@tanstack/react-query";
import {transactionApi} from "@/src/lib/api/transactionApi";

function HomeScreen() {
  const auth = useAuth();
  const { notifications } = useNotifications();
  const { wallets } = useWallets();
  const { children } = useChildren();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [currentModal, setCurrentModal] = useState<{
    [key: string]: boolean;
  } | null>(null);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { transactions } = useTransactions(wallets[currentIndex]?.id);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const width = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const fetchTransactionsList = (walletId: string) =>{
      const transactionsQuery = useQuery({
          queryKey: ["transactions", mergedFilters],
          queryFn: async () => {
              const response = await transactionApi.getTransactions(
                  walletId,
                  mergedFilters
              );
              if (response.success && response.data) {
                  setTransactions(response.data.transactions);
                  setPagination(response.data.pagination);
                  return response.data;
              }
              throw new Error(response.message);
          },
          onError: (error: any) => {
              setError(error.message);
          },
      });
  }
  // État pour les notifications

  // Données étendues pour les graphiques

  const handleNotificationPress = () => {
    router.push("/notifications");
  };
  const handleTransactionPress = (transaction: any) => {
    setSelectedTransaction(transaction);
    setCurrentModal({ transaction: true });
  };
  const handlePressChilWallet = (selectedChildId: string) => {
    router.push({ pathname: "/(tabs)/children", params: { selectedChildId } });
  };
  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;
  const quickActionsWithHandlers = quickActions.map((action) => ({
    ...action,
    onPress: () => {
      setCurrentModal({ [`${action.key.toLowerCase()}`]: true });
    },
  }));

  console.log("--current", currentIndex);
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        greeting={"Salut,"}
        userName={`${auth.user?.firstName} ${auth.user?.lastName}`}
        notificationCount={unreadNotificationCount}
        onNotificationPress={handleNotificationPress}
      />
      <FlatList
        data={wallets}
        horizontal
        renderItem={({ item }) => (
          <WalletCard
            data={item}
            isBalanceVisible={isBalanceVisible}
            onToggleVisibility={() => setIsBalanceVisible(!isBalanceVisible)}
          />
        )}
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />
      <View style={styles.dotContainer}>
        {wallets.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
      <QuickActionsGrid
        title="Actions Rapides"
        actions={quickActionsWithHandlers}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SubWalletsList
          title="Sous-Portefeuilles"
          wallets={children}
          onWalletPress={handlePressChilWallet}
        />
        <TransactionsList
          title="Transactions Récentes"
          transactions={transactions}
          onTransactionPress={handleTransactionPress}
          onViewAll={() => router.push("/(tabs)/transactions")}
        />
      </ScrollView>

      <SendMoneyModal
        visible={currentModal?.appro ? true : false}
        onClose={() => setCurrentModal(null)}
        childName="Portefeuille Principal"
        onSend={() => {}}
      />

      <NFCPaymentModal
        visible={currentModal?.nfcpay ? true : false}
        onClose={() => setCurrentModal(null)}
        onPaymentSuccess={() => {}}
      />
      <QRScannerModal
        visible={currentModal?.qrpay ? true : false}
        onClose={() => setCurrentModal(null)}
        onScanSuccess={() => {}}
        title="Scanner QR Code"
        subtitle="Scannez un QR code pour payer ou recevoir des informations"
      />
      <NetworkCreditModal
        visible={currentModal?.credit ? true : false}
        onClose={() => setCurrentModal(null)}
        onPurchaseSuccess={() => {}}
      />
      <TransactionDetailModal
        visible={currentModal?.transaction ? true : false}
        onClose={() => setCurrentModal(null)}
        transaction={selectedTransaction}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
    opacity: 0.5,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4F46E5", // violet cool
    opacity: 1,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
});

export default HomeScreen;

import TransactionDetailModal from "@/src/components/modals/TransactionDetailModal";
import WalletCard from "@/src/components/molecules/WalletCard";
import NetworkCreditModal from "@/src/components/NetworkCreditModal";
import NFCPaymentModal from "@/src/components/NFCPaymentModal";
import AppHeader from "@/src/components/organisms/AppHeader";
import QuickActionsGrid from "@/src/components/organisms/QuickActionsGrid";
import SubWalletsList from "@/src/components/organisms/SubWalletsList";
import TransactionsList from "@/src/components/organisms/TransactionsList";
import QRScannerModal from "@/src/components/QRScannerModal";
import { quickActions } from "@/src/lib/constants";
import { useAuth } from "@/src/lib/hooks/useAuth";
import { useChildren } from "@/src/lib/hooks/useChildren";
import { useNotifications } from "@/src/lib/hooks/useNotifications";
import { useTransactions } from "@/src/lib/hooks/useTransactions";
import { useWallets } from "@/src/lib/hooks/useWallets";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

function HomeScreen() {
  const auth = useAuth();
  const { notifications } = useNotifications();
  const { wallets } = useWallets();
  const { children } = useChildren();
  const { transactions } = useTransactions();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [currentModal, setCurrentModal] = useState<{
    [key: string]: boolean;
  } | null>(null);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const router = useRouter();

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

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        greeting={"Salut,"}
        userName={`${auth.user?.firstName} ${auth.user?.lastName}`}
        notificationCount={unreadNotificationCount}
        onNotificationPress={handleNotificationPress}
      />
      <WalletCard
        title="Mon Portemonnaie"
        balance={parseFloat(wallets[0]?.balance.toString()) || 0.0}
        isBalanceVisible={isBalanceVisible}
        onToggleVisibility={() => setIsBalanceVisible(!isBalanceVisible)}
      />
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

      {/* <SendMoneyModal
         visible={currentModal?.envoyer ? true : false}
         onClose={() => setCurrentModal(null)}
         childName="Portefeuille Principal"
         onSend={() => {}}
       /> */}

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
    backgroundColor: "#F8FAFC",
  },
});

export default HomeScreen;

import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Plus, Send, Smartphone, QrCode, Zap, Scan, Eye, EyeOff, Bell, Wifi } from 'lucide-react-native';
import { Alert } from 'react-native';

// Templates
import HomeTemplate from '@/components/templates/HomeTemplate';

// Organisms
import AppHeader from '@/components/organisms/AppHeader';
import QuickActionsGrid from '@/components/organisms/QuickActionsGrid';
import SubWalletsList from '@/components/organisms/SubWalletsList';
import TransactionsList from '@/components/organisms/TransactionsList';
import TransactionAnalytics from '@/components/charts/TransactionAnalytics';

// Molecules
import WalletCard from '@/components/molecules/WalletCard';

// Modals
import SendMoneyModal from '@/components/modals/SendMoneyModal';
import NotificationModal from '@/components/modals/NotificationModal';
import TransactionDetailModal from '@/components/modals/TransactionDetailModal';
import TopUpModal from '@/components/TopUpModal';
import QRCodeModal from '@/components/QRCodeModal';
import NFCPaymentModal from '@/components/NFCPaymentModal';
import QRScannerModal from '@/components/QRScannerModal';
import NetworkCreditModal from '@/components/NetworkCreditModal';
import NFCWriteModal from '@/components/modals/NFCWriteModal';

export default function HomeScreen() {
  const [showSendModal, setShowSendModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showNFCPaymentModal, setShowNFCPaymentModal] = useState(false);
  const [showQRScannerModal, setShowQRScannerModal] = useState(false);
  const [showNetworkCreditModal, setShowNetworkCreditModal] = useState(false);
  const [showNFCWriteModal, setShowNFCWriteModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showTransactionDetailModal, setShowTransactionDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [balance, setBalance] = useState(2345.67);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const router = useRouter();

  // État pour les notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'transaction',
      title: 'Paiement reçu',
      message: 'Vous avez reçu €125.99 de Paul Martin',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
      isRead: false
    },
    {
      id: 2,
      type: 'security',
      title: 'Connexion détectée',
      message: 'Nouvelle connexion depuis un appareil inconnu',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
      isRead: false
    },
    {
      id: 3,
      type: 'reward',
      title: 'Récompense donnée',
      message: 'Vous avez donné €10.00 à Emma pour "Excellentes notes"',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4h ago
      isRead: true
    },
    {
      id: 4,
      type: 'transaction',
      title: 'Paiement effectué',
      message: 'Paiement de €50.25 pour Facture internet',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6h ago
      isRead: true
    },
    {
      id: 5,
      type: 'system',
      title: 'Mise à jour disponible',
      message: 'Une nouvelle version de l\'application est disponible',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      isRead: true
    }
  ]);

  const quickActions = [
    { icon: Send, label: 'Envoyer', color: '#4F46E5' },
    { icon: Plus, label: 'Recharger', color: '#059669' },
    { icon: Zap, label: 'NFC Pay', color: '#DC2626' },
    { icon: Scan, label: 'Scan QR', color: '#7C2D12' },
    { icon: QrCode, label: 'QR Code', color: '#7C2D12' },
    { icon: Smartphone, label: 'Crédit', color: '#6B7280' },
    { icon: Bell, label: 'Notifications', color: '#8B5CF6' },
    { icon: Wifi, label: 'NFC Write', color: '#7C3AED' },
    { icon: Eye, label: 'Historique', color: '#F59E0B' },
  ];

  const subWallets = [
    { id: 1, name: 'Emma - Enfant', balance: 45.50, avatar: '👧' },
    { id: 2, name: 'Lucas - Enfant', balance: 32.80, avatar: '👦' },
  ];

  const handleSendMoney = (amount: number, message: string) => {
    // Simuler l'envoi d'argent
    setBalance(prev => prev - amount);
    console.log(`€${amount.toFixed(2)} envoyés avec le message: ${message}`);
  };

  const handleTopUp = (amount: number, method: string) => {
    // Simuler la recharge
    setBalance(prev => prev + amount);
    console.log(`€${amount.toFixed(2)} rechargés via ${method}`);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    // Déduire le montant du solde
    setBalance(prev => prev - paymentData.amount);
    
    // Ajouter la transaction aux transactions récentes
    const newTransaction = {
      id: Date.now(),
      type: 'sent',
      amount: paymentData.amount,
      description: `Paiement ${paymentData.method} - ${paymentData.merchant}`,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
    
    setRecentTransactions(prev => [newTransaction, ...prev.slice(0, 2)]);
    console.log(`Paiement de €${paymentData.amount.toFixed(2)} effectué via ${paymentData.method}`);
  };

  const handleNetworkCreditPurchase = (purchaseData: any) => {
    // Déduire le montant du solde (conversion FC vers EUR pour la démo)
    const amountInEur = purchaseData.amount / 2000; // 1 EUR = 2000 FC approximativement
    setBalance(prev => prev - amountInEur);
    
    // Ajouter la transaction aux transactions récentes
    const newTransaction = {
      id: Date.now(),
      type: 'sent',
      amount: amountInEur,
      description: `Crédit ${purchaseData.operator} - ${purchaseData.phoneNumber}`,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
    
    setRecentTransactions(prev => [newTransaction, ...prev.slice(0, 2)]);
    console.log(`Crédit de ${purchaseData.amount} FC acheté pour ${purchaseData.operator}`);
  };

  const handleNFCWriteSuccess = (writeData: any) => {
    console.log('Données NFC programmées:', writeData);
    Alert.alert(
      'Succès',
      `Tag NFC programmé avec succès pour ${writeData.merchant} - €${writeData.amount.toFixed(2)}`
    );
  };

  const quickActionsWithHandlers = quickActions.map(action => ({
    ...action,
    onPress: () => {
      switch (action.label) {
        case 'Envoyer':
          setShowSendModal(true);
          break;
        case 'Recharger':
          setShowTopUpModal(true);
          break;
        case 'QR Code':
          setShowQRModal(true);
          break;
        case 'NFC Pay':
          setShowNFCPaymentModal(true);
          break;
        case 'Scan QR':
          setShowQRScannerModal(true);
          break;
        case 'Crédit':
          setShowNetworkCreditModal(true);
          break;
        case 'Notifications':
          setShowNotificationModal(true);
          break;
        case 'NFC Write':
          setShowNFCWriteModal(true);
          break;
        case 'Historique':
          handleViewAllTransactions();
          break;
        default:
          console.log(`Action ${action.label} non implémentée`);
      }
    }
  }));

  const handleQRScanSuccess = (data: string) => {
    try {
      // Essayer de parser comme JSON pour les QR codes de paiement
      const qrData = JSON.parse(data);
      
      if (qrData.amount && qrData.merchant) {
        // QR code de paiement valide
        const paymentData = {
          amount: qrData.amount,
          merchant: qrData.merchant,
          method: 'QR Code',
          timestamp: new Date().toISOString(),
          transactionId: `qr_${Date.now()}`,
          description: qrData.description || 'Paiement QR'
        };
        
        handlePaymentSuccess(paymentData);
        Alert.alert(
          'Paiement effectué',
          `€${qrData.amount.toFixed(2)} payés à ${qrData.merchant}`
        );
      } else {
        // QR code avec données partielles
        Alert.alert(
          'QR Code scanné',
          `Données reçues: ${JSON.stringify(qrData, null, 2)}`
        );
      }
    } catch (error) {
      // QR code simple (texte)
      if (data.startsWith('http')) {
        Alert.alert(
          'Lien détecté',
          `URL: ${data}`,
          [
            { text: 'Fermer', style: 'cancel' },
            { text: 'Ouvrir', onPress: () => console.log('Ouvrir URL:', data) }
          ]
        );
      } else {
        Alert.alert(
          'QR Code scanné',
          `Contenu: ${data}`
        );
      }
    }
  };

  // État pour les transactions récentes (pour pouvoir les mettre à jour)
  const [recentTransactions, setRecentTransactions] = useState([
    { 
      id: 1, 
      type: 'income', 
      title: 'Reçu de Paul M.',
      description: 'Virement instantané',
      amount: 125.99, 
      date: '2024-01-15',
      time: '10:30',
      category: 'Transfert',
      status: 'completed',
      location: 'Virement instantané',
      merchant: 'Paul Martin',
      cardUsed: '•••• 4567',
      reference: 'VIR-2024-001'
    },
    { 
      id: 2, 
      type: 'expense', 
      title: 'Facture internet',
      description: 'Orange Telecom',
      amount: 50.25, 
      date: '2024-01-15',
      time: '09:15',
      category: 'Utilities',
      status: 'completed',
      location: 'Paiement automatique',
      merchant: 'Orange Telecom',
      cardUsed: '•••• 4567',
      reference: 'ORA-2024-001'
    },
    { 
      id: 3, 
      type: 'income', 
      title: 'Remboursement',
      description: 'Assurance maladie',
      amount: 75.00, 
      date: '2024-01-14',
      time: '08:45',
      category: 'Remboursement',
      status: 'completed',
      location: 'Virement automatique',
      merchant: 'CPAM',
      reference: 'RMB-2024-002'
    },
  ]);

  // Données étendues pour les graphiques
  const allTransactions = [
    ...recentTransactions,
    { id: 4, type: 'expense', amount: 35.80, category: 'Alimentation', date: '2024-01-14' },
    { id: 5, type: 'expense', amount: 12.50, category: 'Transport', date: '2024-01-13' },
    { id: 6, type: 'income', amount: 200.00, category: 'Salaire', date: '2024-01-13' },
    { id: 7, type: 'expense', amount: 89.90, category: 'Utilities', date: '2024-01-12' },
    { id: 8, type: 'expense', amount: 25.00, category: 'Loisirs', date: '2024-01-12' },
    { id: 9, type: 'income', amount: 45.00, category: 'Freelance', date: '2024-01-11' },
    { id: 10, type: 'expense', amount: 67.30, category: 'Alimentation', date: '2024-01-11' },
    { id: 11, type: 'expense', amount: 15.20, category: 'Transport', date: '2024-01-10' },
    { id: 12, type: 'expense', amount: 120.00, category: 'Mode', date: '2024-01-10' },
    { id: 13, type: 'income', amount: 80.00, category: 'Remboursement', date: '2024-01-09' },
  ];

  const handleSubWalletPress = (wallet: any) => {
    router.push({
      pathname: '/(tabs)/children',
      params: { selectedChildId: wallet.id }
    });
  };

  const handleTransactionPress = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetailModal(true);
  };
  const handleMarkAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleDeleteNotification = (notificationId: number) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const handleNotificationPress = () => {
    setShowNotificationModal(true);
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  const handleViewAllTransactions = () => {
    router.push('/(tabs)/transactions');
  };

  return (
    <>
    <HomeTemplate
      header={
        <AppHeader
          greeting="Bonjour,"
          userName="Marie Dupont"
          notificationCount={unreadNotificationCount}
          onNotificationPress={handleNotificationPress}
        />
      }
      walletCard={
        <WalletCard
          title="Mon Portefeuille Principal"
          balance={balance}
          cardNumber="•••• •••• •••• 4567"
          expiry="12/27"
          isBalanceVisible={isBalanceVisible}
          onToggleVisibility={() => setIsBalanceVisible(!isBalanceVisible)}
        />
      }
      quickActions={
        <QuickActionsGrid
          title="Actions Rapides"
          actions={quickActionsWithHandlers}
        />
      }
      analytics={
        <TransactionAnalytics transactions={allTransactions} />
      }
      subWallets={
        <SubWalletsList
          title="Sous-Portefeuilles"
          wallets={subWallets}
          onWalletPress={handleSubWalletPress}
        />
      }
      transactions={
        <TransactionsList
          title="Transactions Récentes"
          transactions={recentTransactions}
          onTransactionPress={handleTransactionPress}
          onViewAll={handleViewAllTransactions}
        />
      }
    />

    {/* Modals */}
    <SendMoneyModal
      visible={showSendModal}
      onClose={() => setShowSendModal(false)}
      childName="Portefeuille Principal"
      onSend={handleSendMoney}
    />

    <TransactionDetailModal
      visible={showTransactionDetailModal}
      onClose={() => setShowTransactionDetailModal(false)}
      transaction={selectedTransaction}
    />
    <TopUpModal
      visible={showTopUpModal}
      onClose={() => setShowTopUpModal(false)}
      onTopUp={handleTopUp}
    />

    <QRCodeModal
      visible={showQRModal}
      onClose={() => setShowQRModal(false)}
    />

    <NFCPaymentModal
      visible={showNFCPaymentModal}
      onClose={() => setShowNFCPaymentModal(false)}
      onPaymentSuccess={handlePaymentSuccess}
    />

    <QRScannerModal
      visible={showQRScannerModal}
      onClose={() => setShowQRScannerModal(false)}
      onScanSuccess={handleQRScanSuccess}
      title="Scanner QR Code"
      subtitle="Scannez un QR code pour payer ou recevoir des informations"
    />

    <NetworkCreditModal
      visible={showNetworkCreditModal}
      onClose={() => setShowNetworkCreditModal(false)}
      onPurchaseSuccess={handleNetworkCreditPurchase}
    />

    <NFCWriteModal
      visible={showNFCWriteModal}
      onClose={() => setShowNFCWriteModal(false)}
      onWriteSuccess={handleNFCWriteSuccess}
    />

    <NotificationModal
      visible={showNotificationModal}
      onClose={() => setShowNotificationModal(false)}
      notifications={notifications}
      onMarkAsRead={handleMarkAsRead}
      onMarkAllAsRead={handleMarkAllAsRead}
      onDeleteNotification={handleDeleteNotification}
    />
    </>
  );
}
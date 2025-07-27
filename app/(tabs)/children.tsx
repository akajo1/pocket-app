import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { Plus, Settings, Eye, EyeOff, Send, Gift, ShoppingCart, Users, Calendar, TrendingUp, TrendingDown, Lock, Clock as Unlock, CreditCard as Edit3, Trash2, Wifi, Zap } from 'lucide-react-native';
import NFCLinkingModal from '@/components/modals/NFCLinkingModal';
import NFCDeviceCard from '@/components/molecules/NFCDeviceCard';
import { useNFC } from '@/components/hooks/useNFC';
import SendMoneyModal from '@/components/modals/SendMoneyModal';
import RewardModal from '@/components/modals/RewardModal';
import TransactionDetailModal from '@/components/modals/TransactionDetailModal';
import TransactionAnalytics from '@/components/charts/TransactionAnalytics';

export default function ChildrenWalletsScreen() {
  const { selectedChildId } = useLocalSearchParams();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTransactionDetailModal, setShowTransactionDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  // Initialize childrenWallets first
  const [childrenWallets, setChildrenWallets] = useState([
    {
      id: 1,
      name: 'Emma',
      age: 12,
      avatar: '👧',
      balance: 45.50,
      weeklyLimit: 20.00,
      weeklySpent: 12.30,
      isActive: true,
      lastActivity: '2024-01-15 14:30',
      recentTransactions: [
        { 
          id: 1, 
          type: 'expense', 
          title: 'Bonbons école',
          description: 'Achat à la cantine', 
          amount: 3.50, 
          date: '2024-01-15',
          time: '12:30',
          category: 'Alimentation',
          status: 'completed',
          location: 'École primaire',
          merchant: 'Cantine scolaire',
          reference: 'ECO-2024-001'
        },
        { 
          id: 2, 
          type: 'income', 
          title: 'Argent de poche',
          description: 'Allocation hebdomadaire', 
          amount: 10.00, 
          date: '2024-01-14',
          time: '18:00',
          category: 'Allocation',
          status: 'completed',
          location: 'Transfert parent',
          reference: 'ALL-2024-001'
        },
        { 
          id: 3, 
          type: 'expense', 
          title: 'Livre scolaire',
          description: 'Manuel de mathématiques', 
          amount: 8.80, 
          date: '2024-01-13',
          time: '16:45',
          category: 'Éducation',
          status: 'completed',
          location: 'Librairie du centre',
          merchant: 'Librairie Durand',
          reference: 'LIV-2024-001'
        },
      ],
      categories: {
        'Alimentation': 15.20,
        'Éducation': 8.80,
        'Loisirs': 5.30,
      }
    },
    {
      id: 2,
      name: 'Lucas',
      age: 9,
      avatar: '👦',
      balance: 32.80,
      weeklyLimit: 15.00,
      weeklySpent: 8.50,
      isActive: true,
      lastActivity: '2024-01-15 10:15',
      recentTransactions: [
        { 
          id: 1, 
          type: 'expense', 
          title: 'Jeu mobile',
          description: 'Achat in-app', 
          amount: 2.99, 
          date: '2024-01-15',
          time: '15:20',
          category: 'Jeux',
          status: 'completed',
          location: 'App Store',
          merchant: 'Apple',
          reference: 'APP-2024-001'
        },
        { 
          id: 2, 
          type: 'income', 
          title: 'Récompense tâches',
          description: 'Ménage de la chambre', 
          amount: 5.00, 
          date: '2024-01-14',
          time: '19:30',
          category: 'Récompense',
          status: 'completed',
          location: 'Transfert parent',
          reference: 'REW-2024-001'
        },
        { 
          id: 3, 
          type: 'expense', 
          title: 'Goûter',
          description: 'Boulangerie du coin', 
          amount: 5.51, 
          date: '2024-01-13',
          time: '16:15',
          category: 'Alimentation',
          status: 'completed',
          location: 'Boulangerie Martin',
          merchant: 'Boulangerie Martin',
          reference: 'BOU-2024-001'
        },
      ],
      categories: {
        'Jeux': 8.50,
        'Alimentation': 5.51,
        'Divers': 2.00,
      }
    },
    {
      id: 3,
      name: 'Sophie',
      age: 15,
      avatar: '👩',
      balance: 78.90,
      weeklyLimit: 35.00,
      weeklySpent: 28.40,
      isActive: false,
      lastActivity: '2024-01-14 16:45',
      recentTransactions: [
        { 
          id: 1, 
          type: 'expense', 
          title: 'Vêtements',
          description: 'H&M - Pull et jean', 
          amount: 25.00, 
          date: '2024-01-14',
          time: '14:30',
          category: 'Mode',
          status: 'completed',
          location: 'Centre commercial',
          merchant: 'H&M',
          cardUsed: '•••• 5678',
          reference: 'HM-2024-001'
        },
        { 
          id: 2, 
          type: 'income', 
          title: 'Argent de poche',
          description: 'Allocation mensuelle', 
          amount: 30.00, 
          date: '2024-01-13',
          time: '20:00',
          category: 'Allocation',
          status: 'completed',
          location: 'Transfert parent',
          reference: 'ALL-2024-002'
        },
        { 
          id: 3, 
          type: 'expense', 
          title: 'Cinéma',
          description: 'Séance avec amis', 
          amount: 12.50, 
          date: '2024-01-12',
          time: '20:15',
          category: 'Loisirs',
          status: 'completed',
          location: 'Cinéma Gaumont',
          merchant: 'Gaumont',
          cardUsed: '•••• 5678',
          reference: 'CIN-2024-001'
        },
      ],
      categories: {
        'Mode': 25.00,
        'Loisirs': 12.50,
        'Transport': 8.90,
      }
    },
  ]);

  // Trouver l'index de l'enfant sélectionné ou utiliser 0 par défaut
  const findChildIndex = () => {
    if (selectedChildId) {
      const index = childrenWallets.findIndex(child => child.id.toString() === selectedChildId);
      return index !== -1 ? index : 0;
    }
    return 0;
  };
  
  const [selectedChildIndex, setSelectedChildIndex] = useState(findChildIndex);
  const [showLimitsModal, setShowLimitsModal] = useState(false);
  const [showNFCModal, setShowNFCModal] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState('');
  const [initialAmount, setInitialAmount] = useState('');
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [parentBalance, setParentBalance] = useState(500.00);
  const [loadAmount, setLoadAmount] = useState('');
  const [unloadAmount, setUnloadAmount] = useState('');
  const [showUnloadModal, setShowUnloadModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  
  // Afficher automatiquement les détails si un enfant spécifique est sélectionné
  const [showDetails, setShowDetails] = useState(!!selectedChildId);
  
  // Déclarer selectedChild dans le scope principal du composant
  const selectedChild = childrenWallets[selectedChildIndex];
  
  const { isNFCSupported, isNFCEnabled } = useNFC();

  // Simuler des appareils NFC liés
  const [linkedNFCDevices, setLinkedNFCDevices] = useState({
    1: [
      {
        id: 'nfc_001',
        type: 'bracelet',
        name: 'Bracelet Emma',
        linkedAt: '2024-01-10T10:30:00Z',
        isActive: true,
        lastUsed: '2024-01-15T14:30:00Z'
      }
    ],
    2: [
      {
        id: 'nfc_002',
        type: 'tag',
        name: 'Tag Lucas',
        linkedAt: '2024-01-12T09:15:00Z',
        isActive: true,
        lastUsed: '2024-01-15T10:15:00Z'
      }
    ]
  });

  const quickActions = [
    { icon: Send, label: 'Envoyer', color: '#4F46E5' },
    { icon: Gift, label: 'Récompense', color: '#10B981' },
    { icon: Plus, label: 'Charger', color: '#059669' },
    { icon: TrendingDown, label: 'Retirer', color: '#DC2626' },
    { icon: Wifi, label: 'NFC', color: '#7C3AED' },
    { icon: Settings, label: 'Limites', color: '#F59E0B' },
  ];

  const createChildWallet = () => {
    if (newChildName && newChildAge && initialAmount) {
      // Logique de création du wallet enfant
      setShowCreateModal(false);
      setNewChildName('');
      setNewChildAge('');
      setInitialAmount('');
    }
  };

  const handleLoadMoney = () => {
    const amount = parseFloat(loadAmount);
    const selectedChild = childrenWallets[selectedChildIndex];
    
    if (!amount || amount <= 0) {
      console.log('Erreur: Montant invalide');
      return;
    }
    
    if (amount > parentBalance) {
      console.log('Erreur: Solde parent insuffisant');
      return;
    }
    
    // Mettre à jour le solde de l'enfant
    const updatedChildren = childrenWallets.map((child, index) => {
      if (index === selectedChildIndex) {
        return {
          ...child,
          balance: child.balance + amount,
          recentTransactions: [
            {
              id: Date.now(),
              type: 'income',
              description: 'Rechargement par parent',
              amount: amount,
              date: new Date().toISOString().split('T')[0]
            },
            ...child.recentTransactions
          ]
        };
      }
      return child;
    });
    
    setChildrenWallets(updatedChildren);
    setLoadAmount('');
    setShowLoadModal(false);
    
    console.log(`€${amount.toFixed(2)} ont été ajoutés au wallet de ${selectedChild.name}`);
  };

  const handleUnloadMoney = () => {
    const amount = parseFloat(unloadAmount);
    const selectedChild = childrenWallets[selectedChildIndex];
    
    if (!amount || amount <= 0) {
      console.log('Erreur: Montant invalide');
      return;
    }
    
    if (amount > selectedChild.balance) {
      console.log('Erreur: Solde enfant insuffisant');
      return;
    }
    
    // Mettre à jour le solde de l'enfant
    const updatedChildren = childrenWallets.map((child, index) => {
      if (index === selectedChildIndex) {
        return {
          ...child,
          balance: child.balance - amount,
          recentTransactions: [
            {
              id: Date.now(),
              type: 'expense',
              description: 'Retrait par parent',
              amount: amount,
              date: new Date().toISOString().split('T')[0]
            },
            ...child.recentTransactions
          ]
        };
      }
      return child;
    });
    
    setChildrenWallets(updatedChildren);
    setUnloadAmount('');
    setShowUnloadModal(false);
    
    console.log(`€${amount.toFixed(2)} ont été retirés du wallet de ${selectedChild.name}`);
  };

  const handleSendMoney = (amount: number, message: string) => {
    const selectedChild = childrenWallets[selectedChildIndex];
    
    if (amount > parentBalance) {
      console.log('Erreur: Solde parent insuffisant');
      return;
    }
    
    // Mettre à jour le solde de l'enfant
    const updatedChildren = childrenWallets.map((child, index) => {
      if (index === selectedChildIndex) {
        return {
          ...child,
          balance: child.balance + amount,
          recentTransactions: [
            {
              id: Date.now(),
              type: 'income',
              description: message || 'Envoi par parent',
              amount: amount,
              date: new Date().toISOString().split('T')[0]
            },
            ...child.recentTransactions
          ]
        };
      }
      return child;
    });
    
    setChildrenWallets(updatedChildren);
    console.log(`€${amount.toFixed(2)} envoyés à ${selectedChild.name}`);
  };

  const handleGiveReward = (amount: number, reason: string, type: string) => {
    const selectedChild = childrenWallets[selectedChildIndex];
    
    if (amount > parentBalance) {
      console.log('Erreur: Solde parent insuffisant');
      return;
    }
    
    // Mettre à jour le solde de l'enfant
    const updatedChildren = childrenWallets.map((child, index) => {
      if (index === selectedChildIndex) {
        return {
          ...child,
          balance: child.balance + amount,
          recentTransactions: [
            {
              id: Date.now(),
              type: 'income',
              description: `Récompense: ${reason}`,
              amount: amount,
              date: new Date().toISOString().split('T')[0]
            },
            ...child.recentTransactions
          ]
        };
      }
      return child;
    });
    
    setChildrenWallets(updatedChildren);
    console.log(`Récompense de €${amount.toFixed(2)} donnée à ${selectedChild.name} pour: ${reason}`);
  };

  const handleTransactionPress = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetailModal(true);
  };
  const handleNFCLink = (nfcId: string, deviceType: string) => {
    const selectedChild = childrenWallets[selectedChildIndex];
    if (selectedChild) {
      const newDevice = {
        id: nfcId,
        type: deviceType,
        name: `${deviceType === 'bracelet' ? 'Bracelet' : 'Tag'} ${selectedChild.name}`,
        linkedAt: new Date().toISOString(),
        isActive: true
      };

      setLinkedNFCDevices(prev => ({
        ...prev,
        [selectedChild.id]: [...(prev[selectedChild.id] || []), newDevice]
      }));
    }
  };

  const removeNFCDevice = (childId: number, deviceId: string) => {
    setLinkedNFCDevices(prev => ({
      ...prev,
      [childId]: prev[childId]?.filter(device => device.id !== deviceId) || []
    }));
  };

  const toggleNFCDeviceStatus = (childId: number, deviceId: string) => {
    setLinkedNFCDevices(prev => ({
      ...prev,
      [childId]: prev[childId]?.map(device => 
        device.id === deviceId 
          ? { ...device, isActive: !device.isActive }
          : device
      ) || []
    }));
  };

  const onScroll = (event) => {
    const slideSize = 320 + 16; // card width + margin
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setSelectedChildIndex(index);
  };

  const renderChildCard = (child) => (
    <View
      key={child.id}
      style={styles.carouselCard}>
      <TouchableOpacity
        style={styles.childCard}
        onPress={() => setShowDetails(true)}>
        <LinearGradient
          colors={child.isActive ? ['#4F46E5', '#7C3AED'] : ['#9CA3AF', '#6B7280']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.childCardGradient}>
          <View style={styles.childCardHeader}>
            <View style={styles.childInfo}>
              <Text style={styles.childAvatar}>{child.avatar}</Text>
              <View>
                <Text style={styles.childName}>{child.name}</Text>
                <Text style={styles.childAge}>{child.age} ans</Text>
              </View>
            </View>
            <View style={styles.statusIndicator}>
              {child.isActive ? (
                <Unlock size={16} color="#FFFFFF" />
              ) : (
                <Lock size={16} color="#FFFFFF" />
              )}
            </View>
          </View>
          <Text style={styles.childBalance}>
            €{child.balance.toFixed(2)}
          </Text>
          <View style={styles.limitProgress}>
            <View style={styles.limitInfo}>
              <Text style={styles.limitText}>
                €{child.weeklySpent.toFixed(2)} / €{child.weeklyLimit.toFixed(2)} cette semaine
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${(child.weeklySpent / child.weeklyLimit) * 100}%` }
                ]}
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderChildDetails = () => {
    if (!selectedChild || !showDetails) return null;

    return (
      <View style={styles.childDetails}>
        <View style={styles.detailsHeader}>
          <Text style={styles.detailsTitle}>Détails - {selectedChild.name}</Text>
          <TouchableOpacity onPress={() => setShowDetails(false)}>
            <Text style={styles.closeButton}>Fermer</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsGrid3x3}>
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.quickActionButton3x3}
              onPress={() => {
                if (action.label === 'Limites') {
                  setShowLimitsModal(true);
                } else if (action.label === 'NFC') {
                  setShowNFCModal(true);
                } else if (action.label === 'Charger') {
                  setShowLoadModal(true);
                } else if (action.label === 'Retirer') {
                  setShowUnloadModal(true);
                } else if (action.label === 'Envoyer') {
                  setShowSendModal(true);
                } else if (action.label === 'Récompense') {
                  setShowRewardModal(true);
                }
              }}>
              <View style={[styles.quickActionIcon3x3, { backgroundColor: action.color + '20' }]}>
                <action.icon size={20} color={action.color} />
              </View>
              <Text style={styles.quickActionLabel3x3}>{action.label}</Text>
              {action.label === 'NFC' && !isNFCSupported && (
                <Text style={styles.nfcUnavailableText}>Non disponible</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* NFC Devices Section */}
        <View style={styles.nfcSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Appareils NFC liés</Text>
            <TouchableOpacity onPress={() => setShowNFCModal(true)}>
              <Plus size={20} color="#4F46E5" />
            </TouchableOpacity>
          </View>
          
          {linkedNFCDevices[selectedChild.id]?.length > 0 ? (
            linkedNFCDevices[selectedChild.id].map((device) => (
              <NFCDeviceCard
                key={device.id}
                device={device}
                onRemove={(deviceId) => removeNFCDevice(selectedChild.id, deviceId)}
                onToggleStatus={(deviceId) => toggleNFCDeviceStatus(selectedChild.id, deviceId)}
                onSettings={(deviceId) => console.log('Settings for device:', deviceId)}
              />
            ))
          ) : (
            <View style={styles.noDevicesContainer}>
              <Wifi size={48} color="#9CA3AF" />
              <Text style={styles.noDevicesText}>Aucun appareil NFC lié</Text>
              <Text style={styles.noDevicesSubtext}>
                Ajoutez un bracelet ou tag NFC pour faciliter les paiements
              </Text>
              <TouchableOpacity 
                style={styles.addNFCButton}
                onPress={handleUnloadMoney}>
                <Text style={styles.addNFCButtonText}>Ajouter un appareil</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Spending Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Dépenses par catégorie</Text>
          {Object.entries(selectedChild.categories).map(([category, amount]) => (
            <View key={category} style={styles.categoryItem}>
              <Text style={styles.categoryName}>{category}</Text>
              <Text style={styles.categoryAmount}>€{amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Transactions récentes</Text>
          {selectedChild.recentTransactions.map((transaction) => (
            <TouchableOpacity 
              key={transaction.id} 
              style={styles.transactionItem}
              onPress={() => handleTransactionPress(transaction)}>
              <View style={[
                styles.transactionIcon,
                { backgroundColor: transaction.type === 'income' ? '#DCFCE7' : '#FEF2F2' }
              ]}>
                {transaction.type === 'income' ? (
                  <TrendingUp size={16} color="#10B981" />
                ) : (
                  <ShoppingCart size={16} color="#EF4444" />
                )}
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionDescription}>{transaction.title}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={[
                styles.transactionAmount,
                { color: transaction.type === 'income' ? '#10B981' : '#EF4444' }
              ]}>
                {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wallets Enfants</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowCreateModal(true)}>
            <Plus size={24} color="#4F46E5" />
          </TouchableOpacity>
        </View>

        {/* Summary Stats */}
        <View style={styles.summaryStats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{childrenWallets.length}</Text>
            <Text style={styles.statLabel}>Enfants</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              €{childrenWallets.reduce((sum, child) => sum + child.balance, 0).toFixed(2)}
            </Text>
            <Text style={styles.statLabel}>Total Balances</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              €{childrenWallets.reduce((sum, child) => sum + child.weeklySpent, 0).toFixed(2)}
            </Text>
            <Text style={styles.statLabel}>Dépensé cette semaine</Text>
          </View>
        </View>

        {/* Children Wallets */}
        <View style={styles.childrenSection}>
          <Text style={styles.sectionTitle}>Portefeuilles des enfants</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            style={styles.carouselContainer}
            contentContainerStyle={styles.carouselContent}
            onScroll={onScroll}
            scrollEventThrottle={16}>
            {childrenWallets.map(renderChildCard)}
          </ScrollView>
          
          {/* Carousel Indicators */}
          <View style={styles.carouselIndicators}>
            {childrenWallets.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  { backgroundColor: selectedChildIndex === index ? '#4F46E5' : '#E5E7EB' }
                ]}
              />
            ))}
          </View>
        </View>

        {/* Child Details */}
        {renderChildDetails()}

        {/* Analytics for Selected Child */}
        {showDetails && selectedChild && (
          <TransactionAnalytics transactions={selectedChild?.recentTransactions || []} />
        )}

        {/* Create Child Modal */}
        <Modal
          visible={showCreateModal}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Créer un wallet enfant</Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nom de l'enfant</Text>
                <TextInput
                  style={styles.textInput}
                  value={newChildName}
                  onChangeText={setNewChildName}
                  placeholder="Entrez le nom"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Âge</Text>
                <TextInput
                  style={styles.textInput}
                  value={newChildAge}
                  onChangeText={setNewChildAge}
                  placeholder="Entrez l'âge"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Montant initial (€)</Text>
                <TextInput
                  style={styles.textInput}
                  value={initialAmount}
                  onChangeText={setInitialAmount}
                  placeholder="0.00"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setShowCreateModal(false)}>
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.createButton}
                  onPress={createChildWallet}>
                  <Text style={styles.createButtonText}>Créer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Limits Modal */}
        <Modal
          visible={showLimitsModal}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Gérer les limites - {childrenWallets[selectedChildIndex]?.name}
              </Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Limite hebdomadaire (€)</Text>
                <TextInput
                  style={styles.textInput}
                  defaultValue={childrenWallets[selectedChildIndex]?.weeklyLimit.toString()}
                  placeholder="0.00"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Limite quotidienne (€)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="0.00"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.limitOptions}>
                <Text style={styles.optionLabel}>Catégories autorisées</Text>
                {['Alimentation', 'Éducation', 'Loisirs', 'Transport'].map((category) => (
                  <TouchableOpacity key={category} style={styles.categoryOption}>
                    <Text style={styles.categoryOptionText}>{category}</Text>
                    <View style={styles.checkbox} />
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setShowLimitsModal(false)}>
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.createButton}
                  onPress={() => setShowLimitsModal(false)}>
                  <Text style={styles.createButtonText}>Sauvegarder</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* NFC Linking Modal */}
        <NFCLinkingModal
          visible={showNFCModal}
          onClose={() => setShowNFCModal(false)}
          childName={childrenWallets[selectedChildIndex]?.name || ''}
          childId={childrenWallets[selectedChildIndex]?.id || 0}
          onLinkSuccess={handleNFCLink}
        />
      </ScrollView>

      {/* Load Money Modal */}
      <Modal
        visible={showLoadModal}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Charger le wallet de {childrenWallets[selectedChildIndex]?.name}
            </Text>
            
            <View style={styles.balanceInfo}>
              <View style={styles.balanceItem}>
                <Text style={styles.balanceLabel}>Solde parent</Text>
                <Text style={styles.balanceValue}>€{parentBalance.toFixed(2)}</Text>
              </View>
              <View style={styles.balanceItem}>
                <Text style={styles.balanceLabel}>Solde enfant</Text>
                <Text style={styles.balanceValue}>
                  €{childrenWallets[selectedChildIndex]?.balance.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Montant à charger (€)</Text>
              <TextInput
                style={styles.textInput}
                value={loadAmount}
                onChangeText={setLoadAmount}
                placeholder="0.00"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.quickAmountsContainer}>
              <Text style={styles.inputLabel}>Montants rapides</Text>
              <View style={styles.quickAmounts}>
                {[5, 10, 20, 50].map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    style={styles.quickAmountButton}
                    onPress={() => setLoadAmount(amount.toString())}>
                    <Text style={styles.quickAmountText}>€{amount}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowLoadModal(false)}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.createButton}
                onPress={handleLoadMoney}>
                <Text style={styles.createButtonText}>Charger</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Unload Money Modal */}
      <Modal
        visible={showUnloadModal}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Retirer de l'argent du wallet de {childrenWallets[selectedChildIndex]?.name}
            </Text>
            
            <View style={styles.balanceInfo}>
              <View style={styles.balanceItem}>
                <Text style={styles.balanceLabel}>Solde enfant</Text>
                <Text style={styles.balanceValue}>
                  €{childrenWallets[selectedChildIndex]?.balance.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Montant à retirer (€)</Text>
              <TextInput
                style={styles.textInput}
                value={unloadAmount}
                onChangeText={setUnloadAmount}
                placeholder="0.00"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.quickAmountsContainer}>
              <Text style={styles.inputLabel}>Montants rapides</Text>
              <View style={styles.quickAmounts}>
                {[5, 10, 20, 50].map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    style={styles.quickAmountButton}
                    onPress={() => setUnloadAmount(amount.toString())}>
                    <Text style={styles.quickAmountText}>€{amount}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowUnloadModal(false)}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.createButton, { backgroundColor: '#DC2626' }]}
                onPress={handleUnloadMoney}>
                <Text style={styles.createButtonText}>Retirer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Send Money Modal */}
      <SendMoneyModal
        visible={showSendModal}
        onClose={() => setShowSendModal(false)}
        childName={childrenWallets[selectedChildIndex]?.name || ''}
        onSend={handleSendMoney}
      />

      {/* Reward Modal */}
      <RewardModal
        visible={showRewardModal}
        onClose={() => setShowRewardModal(false)}
        childName={childrenWallets[selectedChildIndex]?.name || ''}
        onGiveReward={handleGiveReward}
      />

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        visible={showTransactionDetailModal}
        onClose={() => setShowTransactionDetailModal(false)}
        transaction={selectedTransaction}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  childrenSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  carouselContainer: {
    paddingLeft: 20,
  },
  carouselContent: {
    paddingRight: 20,
  },
  carouselCard: {
    width: 300,
    marginRight: 16,
  },
  childCard: {
    width: '100%',
  },
  childCardGradient: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  carouselIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  childCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  childInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  childName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  childAge: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  statusIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 4,
  },
  childBalance: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  limitProgress: {
    marginTop: 8,
  },
  limitInfo: {
    marginBottom: 8,
  },
  limitText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  childDetails: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    fontSize: 16,
    color: '#4F46E5',
    fontWeight: '600',
  },
  quickActionsGrid3x3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickActionButton3x3: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActionIcon3x3: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionLabel3x3: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
    textAlign: 'center',
  },
  nfcUnavailableText: {
    fontSize: 10,
    color: '#F59E0B',
    textAlign: 'center',
    marginTop: 2,
    fontStyle: 'italic',
  },
  nfcSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  noDevicesContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noDevicesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  noDevicesSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  addNFCButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  addNFCButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  categoriesSection: {
    marginBottom: 24,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryName: {
    fontSize: 16,
    color: '#374151',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
  },
  transactionsSection: {
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  transactionDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  limitOptions: {
    marginVertical: 16,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  categoryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  categoryOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4F46E5',
    backgroundColor: '#4F46E5',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  createButton: {
    flex: 1,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginLeft: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  balanceInfo: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  balanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  balanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  quickAmountsContainer: {
    marginBottom: 20,
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4F46E5',
  },
  quickAmountsContainer: {
    marginBottom: 20,
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4F46E5',
  },
  balanceInfo: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  balanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  balanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  quickAmountsContainer: {
    marginBottom: 20,
  },
});
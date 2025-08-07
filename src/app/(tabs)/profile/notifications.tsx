import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Switch } from 'react-native';
import { Bell, Mail, Smartphone, CreditCard, Users, TrendingUp, Shield, Volume2, Vibrate } from 'lucide-react-native';

export default function NotificationsScreen() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const [transactionNotifs, setTransactionNotifs] = useState(true);
  const [securityNotifs, setSecurityNotifs] = useState(true);
  const [marketingNotifs, setMarketingNotifs] = useState(false);
  const [childrenNotifs, setChildrenNotifs] = useState(true);
  const [rewardsNotifs, setRewardsNotifs] = useState(true);

  const notificationChannels = [
    {
      title: 'Canaux de notification',
      items: [
        {
          icon: Mail,
          title: 'Notifications par email',
          description: 'Recevez des emails pour les événements importants',
          enabled: emailNotifications,
          onToggle: setEmailNotifications
        },
        {
          icon: Smartphone,
          title: 'Notifications push',
          description: 'Notifications sur votre appareil mobile',
          enabled: pushNotifications,
          onToggle: setPushNotifications
        },
        {
          icon: Smartphone,
          title: 'Notifications SMS',
          description: 'Messages texte pour la sécurité',
          enabled: smsNotifications,
          onToggle: setSmsNotifications
        }
      ]
    },
    {
      title: 'Préférences sonores',
      items: [
        {
          icon: Volume2,
          title: 'Son des notifications',
          description: 'Jouer un son pour les notifications',
          enabled: soundEnabled,
          onToggle: setSoundEnabled
        },
        {
          icon: Vibrate,
          title: 'Vibration',
          description: 'Vibrer lors des notifications',
          enabled: vibrationEnabled,
          onToggle: setVibrationEnabled
        }
      ]
    },
    {
      title: 'Types de notifications',
      items: [
        {
          icon: CreditCard,
          title: 'Transactions',
          description: 'Paiements, virements et achats',
          enabled: transactionNotifs,
          onToggle: setTransactionNotifs
        },
        {
          icon: Shield,
          title: 'Sécurité',
          description: 'Connexions et activités suspectes',
          enabled: securityNotifs,
          onToggle: setSecurityNotifs
        },
        {
          icon: Users,
          title: 'Activité des enfants',
          description: 'Dépenses et activités des sous-portefeuilles',
          enabled: childrenNotifs,
          onToggle: setChildrenNotifs
        },
        {
          icon: TrendingUp,
          title: 'Récompenses et promotions',
          description: 'Offres spéciales et programmes de fidélité',
          enabled: rewardsNotifs,
          onToggle: setRewardsNotifs
        },
        {
          icon: Bell,
          title: 'Marketing',
          description: 'Nouvelles fonctionnalités et conseils',
          enabled: marketingNotifs,
          onToggle: setMarketingNotifs
        }
      ]
    }
  ];

  const notificationTimes = [
    { label: 'Résumé quotidien', time: '08:00', enabled: true },
    { label: 'Résumé hebdomadaire', time: 'Lundi 09:00', enabled: true },
    { label: 'Rappel de budget', time: 'Fin de mois', enabled: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Notification Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Bell size={32} color="#4F46E5" />
            <View style={styles.statusText}>
              <Text style={styles.statusTitle}>Notifications activées</Text>
              <Text style={styles.statusDescription}>
                Vous recevez des notifications pour rester informé
              </Text>
            </View>
          </View>
        </View>

        {/* Notification Settings */}
        {notificationChannels.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsCard}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <View style={[
                      styles.settingIcon,
                      { backgroundColor: item.enabled ? '#EEF2FF' : '#F3F4F6' }
                    ]}>
                      <item.icon 
                        size={20} 
                        color={item.enabled ? '#4F46E5' : '#9CA3AF'} 
                      />
                    </View>
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>{item.title}</Text>
                      <Text style={styles.settingDescription}>{item.description}</Text>
                    </View>
                  </View>
                  <Switch
                    value={item.enabled}
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#E5E7EB', true: '#EEF2FF' }}
                    thumbColor={item.enabled ? '#4F46E5' : '#9CA3AF'}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Scheduled Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications programmées</Text>
          <View style={styles.scheduleCard}>
            {notificationTimes.map((schedule, index) => (
              <View key={index} style={styles.scheduleItem}>
                <View style={styles.scheduleLeft}>
                  <Text style={styles.scheduleLabel}>{schedule.label}</Text>
                  <Text style={styles.scheduleTime}>{schedule.time}</Text>
                </View>
                <Switch
                  value={schedule.enabled}
                  onValueChange={() => {}}
                  trackColor={{ false: '#E5E7EB', true: '#EEF2FF' }}
                  thumbColor={schedule.enabled ? '#4F46E5' : '#9CA3AF'}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Notification History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique récent</Text>
          <View style={styles.historyCard}>
            <View style={styles.historyItem}>
              <View style={styles.historyIcon}>
                <CreditCard size={16} color="#4F46E5" />
              </View>
              <View style={styles.historyDetails}>
                <Text style={styles.historyTitle}>Paiement reçu</Text>
                <Text style={styles.historyDescription}>€125.99 de Paul Martin</Text>
                <Text style={styles.historyTime}>Il y a 30 minutes</Text>
              </View>
            </View>
            
            <View style={styles.historyItem}>
              <View style={styles.historyIcon}>
                <Shield size={16} color="#059669" />
              </View>
              <View style={styles.historyDetails}>
                <Text style={styles.historyTitle}>Connexion sécurisée</Text>
                <Text style={styles.historyDescription}>Nouvelle connexion détectée</Text>
                <Text style={styles.historyTime}>Il y a 2 heures</Text>
              </View>
            </View>
            
            <View style={styles.historyItem}>
              <View style={styles.historyIcon}>
                <Users size={16} color="#7C3AED" />
              </View>
              <View style={styles.historyDetails}>
                <Text style={styles.historyTitle}>Activité enfant</Text>
                <Text style={styles.historyDescription}>Emma a dépensé €3.50</Text>
                <Text style={styles.historyTime}>Il y a 4 heures</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Do Not Disturb */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode silencieux</Text>
          <View style={styles.dndCard}>
            <Text style={styles.dndDescription}>
              Configurez des heures où vous ne souhaitez pas recevoir de notifications non urgentes
            </Text>
            <View style={styles.dndTime}>
              <Text style={styles.dndLabel}>De 22:00 à 07:00</Text>
              <Switch
                value={false}
                onValueChange={() => {}}
                trackColor={{ false: '#E5E7EB', true: '#EEF2FF' }}
                thumbColor={'#9CA3AF'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  statusCard: {
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
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 16,
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  scheduleLeft: {
    flex: 1,
  },
  scheduleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  scheduleTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  historyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyDetails: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  historyDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  historyTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  dndCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dndDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  dndTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dndLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});
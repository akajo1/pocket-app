import { useAuthContext } from '@/components/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Bell, ChevronRight, CreditCard, CreditCard as Edit, CircleHelp as HelpCircle, LogOut, Mail, Phone, Settings, Shield, Smartphone, User, Users } from 'lucide-react-native';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthContext();

  const menuItems = [
    {
      section: 'Compte',
      items: [
        { icon: User, label: 'Informations personnelles', action: 'personal', route: '/profile/personal' },
        { icon: Shield, label: 'Sécurité et authentification', action: 'security', route: '/profile/security' },
        { icon: Bell, label: 'Notifications', action: 'notifications', route: '/profile/notifications' },
      ]
    },
    {
      section: 'Portefeuilles',
      items: [
        { icon: CreditCard, label: 'Mes cartes', action: 'cards', route: '/profile/cards' },
        { icon: Users, label: 'Sous-portefeuilles', action: 'subwallets', route: '/profile/subwallets' },
        { icon: Smartphone, label: 'Paiements mobiles', action: 'mobile', route: '/profile/mobile' },
      ]
    },
    {
      section: 'Support',
      items: [
        { icon: HelpCircle, label: 'Centre d\'aide', action: 'help', route: '/profile/help' },
        { icon: Settings, label: 'Paramètres', action: 'settings', route: '/profile/settings' },
      ]
    }
  ];

  const userStats = [
    { label: 'Transactions ce mois', value: '127', color: '#4F46E5' },
    { label: 'Sous-portefeuilles', value: '2', color: '#059669' },
    { label: 'Cartes actives', value: '3', color: '#7C3AED' },
  ];

  const handleMenuPress = (item: any) => {
    if (item.route) {
      router.push(item.route);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={['#4F46E5', '#7C3AED']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </Text>
          </View>
          <Text style={styles.userName}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Mail size={16} color="#FFFFFF" />
              <Text style={styles.contactText}>
                {user?.isEmailVerified ? 'Vérifiée' : 'Non vérifiée'}
              </Text>
            </View>
            {user?.phone && (
            <View style={styles.contactItem}>
              <Phone size={16} color="#FFFFFF" />
              <Text style={styles.contactText}>{user.phone}</Text>
            </View>
            )}
          </View>

          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => router.push('/profile/personal')}>
            <Edit size={16} color="#FFFFFF" />
            <Text style={styles.editProfileText}>Modifier le profil</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* User Stats */}
        <View style={styles.statsContainer}>
          {userStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Sections */}
        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <View style={styles.menuItems}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={itemIndex} 
                  style={styles.menuItem}
                  onPress={() => handleMenuPress(item)}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <item.icon size={20} color="#6B7280" />
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </View>
                  <ChevronRight size={16} color="#9CA3AF" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Security Badge */}
        <View style={styles.securityBadge}>
          <Shield size={24} color="#059669" />
          <View style={styles.securityText}>
            <Text style={styles.securityTitle}>Compte sécurisé</Text>
            <Text style={styles.securityDescription}>
              Authentification 2FA activée • Données chiffrées
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#DC2626" />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 16,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 6,
    opacity: 0.9,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editProfileText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 20,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  menuItems: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  securityText: {
    marginLeft: 12,
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 2,
  },
  securityDescription: {
    fontSize: 14,
    color: '#047857',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '600',
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 20,
  },
});
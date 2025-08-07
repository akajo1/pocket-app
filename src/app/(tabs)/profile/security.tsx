import Button from "@/src/components/atoms/Button";
import ChangePasswordModal from "@/src/components/modals/ChangePasswordModal";
import {
  TriangleAlert as AlertTriangle,
  CircleCheck as CheckCircle,
  Clock,
  Eye,
  Key,
  Lock,
  Shield,
  Smartphone,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SecurityScreen() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [autoLock, setAutoLock] = useState(true);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const securityFeatures = [
    {
      icon: Smartphone,
      title: "Authentification à deux facteurs",
      description: "Sécurisez votre compte avec un code SMS",
      enabled: twoFactorEnabled,
      onToggle: setTwoFactorEnabled,
      status: "active",
    },
    {
      icon: Eye,
      title: "Authentification biométrique",
      description: "Utilisez votre empreinte ou Face ID",
      enabled: biometricEnabled,
      onToggle: setBiometricEnabled,
      status: "active",
    },
    {
      icon: Shield,
      title: "Notifications de connexion",
      description: "Recevez un email pour chaque connexion",
      enabled: loginNotifications,
      onToggle: setLoginNotifications,
      status: "active",
    },
    {
      icon: Lock,
      title: "Verrouillage automatique",
      description: "Verrouillez l'app après 5 minutes d'inactivité",
      enabled: autoLock,
      onToggle: setAutoLock,
      status: "active",
    },
  ];

  const securityActions = [
    {
      icon: Key,
      title: "Changer le mot de passe",
      description: "Modifiez votre mot de passe principal",
      action: () => setShowChangePasswordModal(true),
    },
    {
      icon: Smartphone,
      title: "Gérer les appareils de confiance",
      description: "Voir et gérer les appareils autorisés",
      action: () =>
        Alert.alert("Appareils de confiance", "Fonctionnalité à implémenter"),
    },
    {
      icon: Clock,
      title: "Historique des connexions",
      description: "Voir l'historique de vos connexions",
      action: () => Alert.alert("Historique", "Fonctionnalité à implémenter"),
    },
  ];

  const recentActivity = [
    {
      type: "login",
      description: "Connexion depuis iPhone",
      location: "Paris, France",
      time: "Il y a 2 heures",
      status: "success",
    },
    {
      type: "password_change",
      description: "Mot de passe modifié",
      location: "Paris, France",
      time: "Il y a 3 jours",
      status: "success",
    },
    {
      type: "failed_login",
      description: "Tentative de connexion échouée",
      location: "Localisation inconnue",
      time: "Il y a 1 semaine",
      status: "warning",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "login":
        return CheckCircle;
      case "password_change":
        return Key;
      case "failed_login":
        return AlertTriangle;
      default:
        return Shield;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case "success":
        return "#059669";
      case "warning":
        return "#F59E0B";
      case "error":
        return "#DC2626";
      default:
        return "#6B7280";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Security Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Shield size={32} color="#059669" />
            <View style={styles.statusText}>
              <Text style={styles.statusTitle}>Sécurité renforcée</Text>
              <Text style={styles.statusDescription}>
                Votre compte est protégé par plusieurs couches de sécurité
              </Text>
            </View>
          </View>
          <View style={styles.securityScore}>
            <Text style={styles.scoreText}>Score de sécurité</Text>
            <Text style={styles.scoreValue}>95/100</Text>
          </View>
        </View>

        {/* Security Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fonctionnalités de sécurité</Text>
          <View style={styles.featuresCard}>
            {securityFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureLeft}>
                  <View
                    style={[
                      styles.featureIcon,
                      {
                        backgroundColor: feature.enabled
                          ? "#DCFCE7"
                          : "#F3F4F6",
                      },
                    ]}
                  >
                    <feature.icon
                      size={20}
                      color={feature.enabled ? "#059669" : "#9CA3AF"}
                    />
                  </View>
                  <View style={styles.featureText}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>
                      {feature.description}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={feature.enabled}
                  onValueChange={feature.onToggle}
                  trackColor={{ false: "#E5E7EB", true: "#DCFCE7" }}
                  thumbColor={feature.enabled ? "#059669" : "#9CA3AF"}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Security Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions de sécurité</Text>
          <View style={styles.actionsCard}>
            {securityActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionItem}
                onPress={action.action}
              >
                <View style={styles.actionLeft}>
                  <View style={styles.actionIcon}>
                    <action.icon size={20} color="#6B7280" />
                  </View>
                  <View style={styles.actionText}>
                    <Text style={styles.actionTitle}>{action.title}</Text>
                    <Text style={styles.actionDescription}>
                      {action.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Security Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activité récente</Text>
          <View style={styles.activityCard}>
            {recentActivity.map((activity, index) => {
              const IconComponent = getActivityIcon(activity.type);
              const color = getActivityColor(activity.status);

              return (
                <View key={index} style={styles.activityItem}>
                  <View
                    style={[
                      styles.activityIcon,
                      { backgroundColor: color + "20" },
                    ]}
                  >
                    <IconComponent size={16} color={color} />
                  </View>
                  <View style={styles.activityDetails}>
                    <Text style={styles.activityDescription}>
                      {activity.description}
                    </Text>
                    <Text style={styles.activityLocation}>
                      {activity.location}
                    </Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Emergency Actions */}
        <View style={styles.emergencySection}>
          <Text style={styles.sectionTitle}>Actions d'urgence</Text>
          <View style={styles.emergencyCard}>
            <Button
              title="Déconnecter tous les appareils"
              onPress={() =>
                Alert.alert(
                  "Déconnexion",
                  "Tous les appareils ont été déconnectés"
                )
              }
              variant="danger"
              style={styles.emergencyButton}
            />
            <Button
              title="Signaler un problème de sécurité"
              onPress={() =>
                Alert.alert("Signalement", "Votre signalement a été envoyé")
              }
              variant="secondary"
              style={styles.emergencyButton}
            />
          </View>
        </View>
      </ScrollView>

      <ChangePasswordModal
        visible={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        onSuccess={() => {
          Alert.alert("Succès", "Votre mot de passe a été modifié avec succès");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  statusCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statusText: {
    marginLeft: 16,
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#059669",
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  securityScore: {
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#059669",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  featuresCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  featureLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  actionsCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityDetails: {
    flex: 1,
  },
  activityDescription: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  activityLocation: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  emergencySection: {
    marginBottom: 24,
  },
  emergencyCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyButton: {
    marginBottom: 12,
  },
});

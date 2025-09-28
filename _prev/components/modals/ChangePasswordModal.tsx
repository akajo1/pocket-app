import { CheckCircle, Eye, EyeOff, Key, Shield, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Button from "../atoms/Button";

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ChangePasswordModal({
  visible,
  onClose,
  onSuccess,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    return requirements;
  };

  const requirements = validatePassword(newPassword);
  const isPasswordValid = Object.values(requirements).every(Boolean);

  const handleChangePassword = async () => {
    if (!currentPassword) {
      Alert.alert("Erreur", "Veuillez entrer votre mot de passe actuel");
      return;
    }

    if (!newPassword || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erreur", "Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    if (!isPasswordValid) {
      Alert.alert(
        "Erreur",
        "Le nouveau mot de passe ne respecte pas les exigences de sécurité"
      );
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert(
        "Erreur",
        "Le nouveau mot de passe doit être différent de l'ancien"
      );
      return;
    }

    setIsLoading(true);

    // try {
    //   const response = await changePassword(currentPassword, newPassword);

    //   setIsLoading(false);

    //   if (response.success) {
    //     setShowSuccess(true);

    //     setTimeout(() => {
    //       handleClose();
    //       onSuccess();
    //     }, 2000);
    //   } else {
    //     Alert.alert('Erreur', response.message);
    //   }
    // } catch (error) {
    //   setIsLoading(false);
    //   Alert.alert('Erreur', 'Impossible de changer le mot de passe');
    // }
  };

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setIsLoading(false);
    setShowSuccess(false);
    onClose();
  };

  const getRequirementColor = (met: boolean) => (met ? "#059669" : "#DC2626");
  const getRequirementIcon = (met: boolean) => (met ? "✓" : "✗");

  if (showSuccess) {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleClose}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.successContent}>
              <View style={styles.successIconContainer}>
                <CheckCircle size={64} color="#059669" />
              </View>
              <Text style={styles.successTitle}>Mot de passe modifié !</Text>
              <Text style={styles.successSubtitle}>
                Votre mot de passe a été mis à jour avec succès. Votre compte
                est maintenant plus sécurisé.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <Key size={24} color="#4F46E5" />
              </View>
              <Text style={styles.headerTitle}>Changer le mot de passe</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.subtitle}>
              Pour votre sécurité, veuillez entrer votre mot de passe actuel
              puis créer un nouveau mot de passe.
            </Text>

            {/* Current Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Mot de passe actuel</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Entrez votre mot de passe actuel"
                  secureTextEntry={!showCurrentPassword}
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff size={20} color="#6B7280" />
                  ) : (
                    <Eye size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* New Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nouveau mot de passe</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Créez un nouveau mot de passe"
                  secureTextEntry={!showNewPassword}
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff size={20} color="#6B7280" />
                  ) : (
                    <Eye size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Confirmer le nouveau mot de passe
              </Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Retapez votre nouveau mot de passe"
                  secureTextEntry={!showConfirmPassword}
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="#6B7280" />
                  ) : (
                    <Eye size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Password Requirements */}
            {newPassword.length > 0 && (
              <View style={styles.requirementsContainer}>
                <Text style={styles.requirementsTitle}>
                  Exigences du mot de passe :
                </Text>
                <View style={styles.requirementsList}>
                  <View style={styles.requirement}>
                    <Text
                      style={[
                        styles.requirementIcon,
                        { color: getRequirementColor(requirements.length) },
                      ]}
                    >
                      {getRequirementIcon(requirements.length)}
                    </Text>
                    <Text
                      style={[
                        styles.requirementText,
                        { color: getRequirementColor(requirements.length) },
                      ]}
                    >
                      Au moins 8 caractères
                    </Text>
                  </View>
                  <View style={styles.requirement}>
                    <Text
                      style={[
                        styles.requirementIcon,
                        { color: getRequirementColor(requirements.uppercase) },
                      ]}
                    >
                      {getRequirementIcon(requirements.uppercase)}
                    </Text>
                    <Text
                      style={[
                        styles.requirementText,
                        { color: getRequirementColor(requirements.uppercase) },
                      ]}
                    >
                      Une lettre majuscule
                    </Text>
                  </View>
                  <View style={styles.requirement}>
                    <Text
                      style={[
                        styles.requirementIcon,
                        { color: getRequirementColor(requirements.lowercase) },
                      ]}
                    >
                      {getRequirementIcon(requirements.lowercase)}
                    </Text>
                    <Text
                      style={[
                        styles.requirementText,
                        { color: getRequirementColor(requirements.lowercase) },
                      ]}
                    >
                      Une lettre minuscule
                    </Text>
                  </View>
                  <View style={styles.requirement}>
                    <Text
                      style={[
                        styles.requirementIcon,
                        { color: getRequirementColor(requirements.number) },
                      ]}
                    >
                      {getRequirementIcon(requirements.number)}
                    </Text>
                    <Text
                      style={[
                        styles.requirementText,
                        { color: getRequirementColor(requirements.number) },
                      ]}
                    >
                      Un chiffre
                    </Text>
                  </View>
                  <View style={styles.requirement}>
                    <Text
                      style={[
                        styles.requirementIcon,
                        { color: getRequirementColor(requirements.special) },
                      ]}
                    >
                      {getRequirementIcon(requirements.special)}
                    </Text>
                    <Text
                      style={[
                        styles.requirementText,
                        { color: getRequirementColor(requirements.special) },
                      ]}
                    >
                      Un caractère spécial
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Security Tips */}
            <View style={styles.securityTips}>
              <View style={styles.tipsHeader}>
                <Shield size={16} color="#4F46E5" />
                <Text style={styles.tipsTitle}>Conseils de sécurité</Text>
              </View>
              <Text style={styles.tipText}>
                • Utilisez un mot de passe unique pour MyWallet
              </Text>
              <Text style={styles.tipText}>
                • Évitez les informations personnelles
              </Text>
              <Text style={styles.tipText}>
                • Changez votre mot de passe régulièrement
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <Button
                title="Annuler"
                onPress={handleClose}
                variant="secondary"
                style={styles.actionButton}
              />
              <Button
                title={
                  isLoading ? "Modification..." : "Changer le mot de passe"
                }
                onPress={handleChangePassword}
                disabled={
                  isLoading ||
                  !isPasswordValid ||
                  !currentPassword ||
                  newPassword !== confirmPassword
                }
                style={styles.actionButton}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    width: "90%",
    maxWidth: 450,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  eyeButton: {
    padding: 12,
  },
  requirementsContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  requirementsList: {
    gap: 8,
  },
  requirement: {
    flexDirection: "row",
    alignItems: "center",
  },
  requirementIcon: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
    width: 16,
  },
  requirementText: {
    fontSize: 12,
    flex: 1,
  },
  securityTips: {
    backgroundColor: "#EEF2FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4F46E5",
    marginLeft: 6,
  },
  tipText: {
    fontSize: 12,
    color: "#6366F1",
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  successContent: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  successIconContainer: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#059669",
    textAlign: "center",
    marginBottom: 16,
  },
  successSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
});

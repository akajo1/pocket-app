import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Mail, X, ArrowLeft, Key, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useAuthContext } from '../contexts/AuthContext';
import Button from '../atoms/Button';

interface ForgotPasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({ visible, onClose }: ForgotPasswordModalProps) {
  const { requestPasswordReset, resetPassword } = useAuthContext();
  const [step, setStep] = useState<'email' | 'code' | 'newPassword' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email) {
      Alert.alert('Erreur', 'Veuillez entrer votre adresse email');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await requestPasswordReset(email);
      
      if (response.success) {
        setStep('code');
      } else {
        Alert.alert('Erreur', response.message);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'envoyer le code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      Alert.alert('Erreur', 'Veuillez entrer le code à 6 chiffres');
      return;
    }

    setStep('newPassword');
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await resetPassword(email, verificationCode, newPassword);
      
      if (response.success) {
        setStep('success');
      } else {
        Alert.alert('Erreur', response.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep('email');
    setEmail('');
    setVerificationCode('');
    setNewPassword('');
    setConfirmPassword('');
    setIsLoading(false);
    onClose();
  };

  const renderEmailStep = () => (
    <>
      <View style={styles.iconContainer}>
        <Mail size={32} color="#4F46E5" />
      </View>
      <Text style={styles.title}>Mot de passe oublié</Text>
      <Text style={styles.subtitle}>
        Entrez votre adresse email pour recevoir un code de réinitialisation
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Adresse email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholder="votre@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <Button
        title={isLoading ? "Envoi en cours..." : "Envoyer le code"}
        onPress={handleSendCode}
        disabled={isLoading}
        style={styles.primaryButton}
      />
    </>
  );

  const renderCodeStep = () => (
    <>
      <TouchableOpacity style={styles.backButton} onPress={() => setStep('email')}>
        <ArrowLeft size={20} color="#6B7280" />
      </TouchableOpacity>
      
      <View style={styles.iconContainer}>
        <Mail size={32} color="#4F46E5" />
      </View>
      <Text style={styles.title}>Code de vérification</Text>
      <Text style={styles.subtitle}>
        Entrez le code à 6 chiffres envoyé à {email}
      </Text>

      <View style={styles.codeContainer}>
        {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            maxLength={1}
            keyboardType="numeric"
            value={verificationCode[index] || ''}
            onChangeText={(text) => {
              const newCode = verificationCode.split('');
              newCode[index] = text;
              setVerificationCode(newCode.join(''));
            }}
            autoFocus={index === 0}
          />
        ))}
      </View>

      <Button
        title="Vérifier le code"
        onPress={handleVerifyCode}
        style={styles.primaryButton}
      />

      <TouchableOpacity style={styles.resendButton} onPress={handleSendCode}>
        <Text style={styles.resendText}>Renvoyer le code</Text>
      </TouchableOpacity>
    </>
  );

  const renderNewPasswordStep = () => (
    <>
      <TouchableOpacity style={styles.backButton} onPress={() => setStep('code')}>
        <ArrowLeft size={20} color="#6B7280" />
      </TouchableOpacity>
      
      <View style={styles.iconContainer}>
        <Key size={32} color="#4F46E5" />
      </View>
      <Text style={styles.title}>Nouveau mot de passe</Text>
      <Text style={styles.subtitle}>
        Créez un nouveau mot de passe sécurisé
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nouveau mot de passe</Text>
        <TextInput
          style={styles.textInput}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Minimum 8 caractères"
          secureTextEntry
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirmer le mot de passe</Text>
        <TextInput
          style={styles.textInput}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Retapez votre mot de passe"
          secureTextEntry
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.passwordRequirements}>
        <Text style={styles.requirementsTitle}>Exigences du mot de passe :</Text>
        <Text style={styles.requirementText}>• Au moins 8 caractères</Text>
        <Text style={styles.requirementText}>• Une lettre majuscule</Text>
        <Text style={styles.requirementText}>• Une lettre minuscule</Text>
        <Text style={styles.requirementText}>• Un chiffre</Text>
      </View>

      <Button
        title="Réinitialiser le mot de passe"
        onPress={handleResetPassword}
        style={styles.primaryButton}
      />
    </>
  );

  const renderSuccessStep = () => (
    <>
      <View style={styles.successIconContainer}>
        <CheckCircle size={64} color="#059669" />
      </View>
      <Text style={styles.successTitle}>Mot de passe réinitialisé !</Text>
      <Text style={styles.successSubtitle}>
        Votre mot de passe a été mis à jour avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
      </Text>

      <Button
        title="Retour à la connexion"
        onPress={handleClose}
        style={styles.primaryButton}
      />
    </>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {step === 'email' && renderEmailStep()}
            {step === 'code' && renderCodeStep()}
            {step === 'newPassword' && renderNewPasswordStep()}
            {step === 'success' && renderSuccessStep()}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '90%',
    maxWidth: 400,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 16,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successIconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
    textAlign: 'center',
    marginBottom: 16,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
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
    color: '#111827',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
  },
  codeInput: {
    width: 45,
    height: 55,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  passwordRequirements: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  primaryButton: {
    width: '100%',
    marginBottom: 16,
  },
  resendButton: {
    paddingVertical: 12,
  },
  resendText: {
    fontSize: 16,
    color: '#4F46E5',
    fontWeight: '600',
  },
});
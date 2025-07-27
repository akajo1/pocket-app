import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import LoginForm from '@/components/forms/LoginForm';
import RegisterForm from '@/components/forms/RegisterForm';
import ForgotPasswordModal from '@/components/modals/ForgotPasswordModal';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

type AuthMode = 'login' | 'register' | 'forgot';

export default function AuthModal({ visible, onClose, onAuthSuccess }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleAuthSuccess = () => {
    onAuthSuccess();
    onClose();
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordClose = () => {
    setShowForgotPassword(false);
  };

  const handleClose = () => {
    setAuthMode('login');
    setShowForgotPassword(false);
    onClose();
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {authMode === 'login' ? 'Connexion' : 'Inscription'}
              </Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {authMode === 'login' ? (
              <LoginForm
                onSuccess={handleAuthSuccess}
                onForgotPassword={handleForgotPassword}
                onSwitchToRegister={() => setAuthMode('register')}
              />
            ) : (
              <RegisterForm
                onSuccess={handleAuthSuccess}
                onSwitchToLogin={() => setAuthMode('login')}
              />
            )}
          </View>
        </View>
      </Modal>

      <ForgotPasswordModal
        visible={showForgotPassword}
        onClose={handleForgotPasswordClose}
        onSuccess={() => {
          setShowForgotPassword(false);
          setAuthMode('login');
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
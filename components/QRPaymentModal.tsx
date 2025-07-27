import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { Scan, X, CircleCheck as CheckCircle } from 'lucide-react-native';
import QRScannerModal from './QRScannerModal';

interface QRPaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onPaymentSuccess: (paymentData: any) => void;
}

export default function QRPaymentModal({ visible, onClose, onPaymentSuccess }: QRPaymentModalProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleScanSuccess = (data: string) => {
    try {
      // Essayer de parser le QR code comme JSON
      const qrData = JSON.parse(data);
      
      // Valider la structure des données
      if (qrData.amount && qrData.merchant) {
        setScannedData(qrData);
        setShowScanner(false);
      } else {
        // Si ce n'est pas un QR de paiement, créer des données par défaut
        const defaultData = {
          userId: 'merchant_unknown',
          walletId: 'wallet_merchant',
          amount: 0, // Montant à saisir
          merchant: 'Marchand',
          description: data.substring(0, 50) // Utiliser une partie du QR comme description
        };
        setScannedData(defaultData);
        setShowScanner(false);
      }
    } catch (error) {
      // Si ce n'est pas du JSON, traiter comme un QR code simple
      const simpleData = {
        userId: 'merchant_simple',
        walletId: 'wallet_merchant',
        amount: 10.00, // Montant par défaut
        merchant: 'Marchand QR',
        description: data.substring(0, 50)
      };
      setScannedData(simpleData);
      setShowScanner(false);
    }
  };

  const handleConfirmPayment = () => {
    if (!scannedData) return;
    
    setPaymentComplete(true);
    
    const paymentData = {
      amount: scannedData.amount,
      merchant: scannedData.merchant,
      method: 'QR Code',
      timestamp: new Date().toISOString(),
      transactionId: `qr_${Date.now()}`,
      description: scannedData.description
    };
    
    setTimeout(() => {
      onPaymentSuccess(paymentData);
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setShowScanner(false);
    setScannedData(null);
    setPaymentComplete(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <Scan size={24} color="#7C2D12" />
              </View>
              <Text style={styles.modalTitle}>Scanner QR Code</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {!showScanner && !scannedData && !paymentComplete && (
            <>
              <Text style={styles.subtitle}>
                Scannez un QR code pour effectuer un paiement
              </Text>

              {/* QR Code Preview */}
              <View style={styles.qrPreviewContainer}>
                <View style={styles.qrPreview}>
                  <Scan size={64} color="#9CA3AF" />
                  <Text style={styles.qrPreviewText}>Appuyez pour scanner</Text>
                </View>
              </View>

              {/* Instructions */}
              <View style={styles.instructions}>
                <Text style={styles.instructionsTitle}>Instructions :</Text>
                <Text style={styles.instructionText}>
                  • Pointez la caméra vers le QR code
                </Text>
                <Text style={styles.instructionText}>
                  • Assurez-vous que le code est bien visible
                </Text>
                <Text style={styles.instructionText}>
                  • Maintenez l'appareil stable
                </Text>
              </View>

              {/* Scan Button */}
              <TouchableOpacity style={styles.scanButton} onPress={() => setShowScanner(true)}>
                <Scan size={20} color="#FFFFFF" />
                <Text style={styles.scanButtonText}>Commencer le scan</Text>
              </TouchableOpacity>
            </>
          )}

          {scannedData && !paymentComplete && (
            <View style={styles.confirmationContainer}>
              <Text style={styles.confirmationTitle}>QR Code détecté</Text>
              
              <View style={styles.paymentDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Marchand</Text>
                  <Text style={styles.detailValue}>{scannedData.merchant}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Montant</Text>
                  <Text style={styles.detailAmount}>€{scannedData.amount.toFixed(2)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Description</Text>
                  <Text style={styles.detailValue}>{scannedData.description}</Text>
                </View>
              </View>

              <View style={styles.confirmationButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setScannedData(null)}>
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.confirmButton}
                  onPress={handleConfirmPayment}>
                  <Text style={styles.confirmButtonText}>Confirmer le paiement</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {paymentComplete && (
            <View style={styles.successContainer}>
              <View style={styles.successIcon}>
                <CheckCircle size={64} color="#059669" />
              </View>
              <Text style={styles.successTitle}>Paiement réussi !</Text>
              <Text style={styles.successAmount}>€{scannedData?.amount.toFixed(2)}</Text>
              <Text style={styles.successMerchant}>{scannedData?.merchant}</Text>
            </View>
          )}
        </View>
      </View>
      
      {/* QR Scanner Modal */}
      <QRScannerModal
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onScanSuccess={handleScanSuccess}
        title="Scanner pour payer"
        subtitle="Scannez le QR code du marchand"
      />
    </Modal>
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
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7C2D12' + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
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
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  qrPreviewContainer: {
    marginBottom: 24,
  },
  qrPreview: {
    width: '100%',
    height: 200,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  qrPreviewText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
  instructions: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  scanButton: {
    backgroundColor: '#7C2D12',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  confirmationContainer: {
    paddingVertical: 16,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 24,
  },
  paymentDetails: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  detailAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7C2D12',
  },
  confirmationButtons: {
    flexDirection: 'row',
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
  confirmButton: {
    flex: 2,
    backgroundColor: '#7C2D12',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginLeft: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 16,
  },
  successAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  successMerchant: {
    fontSize: 16,
    color: '#6B7280',
  },
});
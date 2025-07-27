import { apiClient } from '../api';
import { QRCode, GenerateQRCodeRequest, ProcessQRPaymentRequest } from '../types';

export const qrApi = {
  // Generate QR code for receiving payments
  async generateQRCode(data: GenerateQRCodeRequest) {
    return apiClient.post<{
      qrId: number;
      qrCodeValue: string;
      amount?: number;
      merchant?: string;
      description?: string;
      expiresAt?: string;
    }>('/qr/generate', data);
  },

  // Process QR code payment
  async processPayment(data: ProcessQRPaymentRequest) {
    return apiClient.post<{
      amount: number;
      merchant?: string;
      referenceNumber: string;
    }>('/qr/payment', data);
  },

  // Get user's QR codes
  async getUserQRCodes() {
    return apiClient.get<{ qrCodes: (QRCode & { walletName: string })[] }>('/qr/my-codes');
  },

  // Get QR code by ID
  async getQRCode(qrId: number) {
    return apiClient.get<QRCode>(`/qr/${qrId}`);
  },

  // Deactivate QR code
  async deactivateQRCode(qrId: number) {
    return apiClient.put(`/qr/${qrId}/deactivate`);
  },

  // Update QR code
  async updateQRCode(qrId: number, data: Partial<QRCode>) {
    return apiClient.put<QRCode>(`/qr/${qrId}`, data);
  },

  // Delete QR code
  async deleteQRCode(qrId: number) {
    return apiClient.delete(`/qr/${qrId}`);
  },

  // Get QR code usage statistics
  async getQRCodeStats(qrId: number) {
    return apiClient.get(`/qr/${qrId}/stats`);
  },
};
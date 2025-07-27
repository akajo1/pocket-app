import { apiClient } from '../api';
import { NFCDevice, LinkNFCDeviceRequest, ProcessNFCPaymentRequest } from '../types';

export const nfcApi = {
  // Link NFC device to child
  async linkDevice(childId: number, data: LinkNFCDeviceRequest) {
    return apiClient.post<{
      deviceId: number;
      nfcId: string;
      deviceType: string;
      childName: string;
    }>(`/nfc/children/${childId}/link`, data);
  },

  // Get NFC devices for child
  async getDevices(childId: number) {
    return apiClient.get<{ devices: NFCDevice[] }>(`/nfc/children/${childId}/devices`);
  },

  // Toggle NFC device status
  async toggleDevice(deviceId: number) {
    return apiClient.put<{
      deviceId: number;
      isActive: boolean;
    }>(`/nfc/devices/${deviceId}/toggle`);
  },

  // Remove NFC device
  async removeDevice(deviceId: number) {
    return apiClient.delete(`/nfc/devices/${deviceId}`);
  },

  // Update NFC device
  async updateDevice(deviceId: number, data: { name?: string; isActive?: boolean }) {
    return apiClient.put<NFCDevice>(`/nfc/devices/${deviceId}`, data);
  },

  // Process NFC payment (public endpoint for terminals)
  async processPayment(data: ProcessNFCPaymentRequest) {
    return apiClient.post<{
      amount: number;
      merchant?: string;
      childName: string;
      remainingBalance: number;
      referenceNumber: string;
    }>('/nfc/payment', data);
  },

  // Get NFC payment history
  async getPaymentHistory(nfcId: string, page = 1, limit = 20) {
    return apiClient.get(`/nfc/devices/${nfcId}/payments?page=${page}&limit=${limit}`);
  },

  // Get all NFC devices for user
  async getAllDevices() {
    return apiClient.get<{ devices: (NFCDevice & { childName: string })[] }>('/nfc/devices');
  },
};
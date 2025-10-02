import ApiClient from "@/src/services/apiClient";

export interface Wallet {
  id: string;
  balance: string;
  is_active: boolean;
  created_at: string;
}

const walletInstance = new ApiClient<any, Wallet[]>("/wallets");

const walletApi = {
  fetchWallets: async () => await walletInstance.fetch(null, "/"),
};
export default walletApi;

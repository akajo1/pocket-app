import { create } from 'zustand';
import { Wallet } from '../types';

interface WalletState {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  isLoading: boolean;
  error: string | null;
}

interface WalletActions {
  setWallets: (wallets: Wallet[]) => void;
  setSelectedWallet: (wallet: Wallet | null) => void;
  addWallet: (wallet: Wallet) => void;
  updateWallet: (id: number, updates: Partial<Wallet>) => void;
  removeWallet: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateBalance: (walletId: number, amount: number, operation: 'add' | 'subtract') => void;
}

export const useWalletStore = create<WalletState & WalletActions>((set, get) => ({
  // State
  wallets: [],
  selectedWallet: null,
  isLoading: false,
  error: null,

  // Actions
  setWallets: (wallets) => set({ wallets }),

  setSelectedWallet: (selectedWallet) => set({ selectedWallet }),

  addWallet: (wallet) => set((state) => ({ 
    wallets: [...state.wallets, wallet] 
  })),

  updateWallet: (id, updates) => set((state) => ({
    wallets: state.wallets.map(wallet => 
      wallet.id === id ? { ...wallet, ...updates } : wallet
    ),
    selectedWallet: state.selectedWallet?.id === id 
      ? { ...state.selectedWallet, ...updates } 
      : state.selectedWallet
  })),

  removeWallet: (id) => set((state) => ({
    wallets: state.wallets.filter(wallet => wallet.id !== id),
    selectedWallet: state.selectedWallet?.id === id ? null : state.selectedWallet
  })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  updateBalance: (walletId, amount, operation) => set((state) => ({
    wallets: state.wallets.map(wallet => {
      if (wallet.id === walletId) {
        const newBalance = operation === 'add' 
          ? wallet.balance + amount 
          : wallet.balance - amount;
        return { ...wallet, balance: Math.max(0, newBalance) };
      }
      return wallet;
    }),
    selectedWallet: state.selectedWallet?.id === walletId
      ? {
          ...state.selectedWallet,
          balance: operation === 'add'
            ? state.selectedWallet.balance + amount
            : Math.max(0, state.selectedWallet.balance - amount)
        }
      : state.selectedWallet
  })),
}));
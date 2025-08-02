import { DollarSignIcon, Scan, Smartphone, Zap } from "lucide-react-native";
import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("screen");
export const alertType = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
};

export const quickActions = [
  // { icon: Send, label: "Envoyer", color: "#4F46E5" },
  { icon: DollarSignIcon, label: "Appro", key: "appro", color: "#059669" },
  { icon: Zap, label: "NFC Pay", key: "nfcpay", color: "#DC2626" },
  { icon: Scan, label: "QR Pay", key: "qrpay", color: "#7C2D12" },
  //   { icon: QrCode, label: "QR Code", color: "#7C2D12" },
  { icon: Smartphone, label: "Crédit", key: "credit", color: "#6B7280" },
  //   { icon: Wifi, label: "NFC Write", color: "#7C3AED" },
];
export const sign = "$";
export const mockNotifications = [
  {
    id: 1,
    type: "transaction",
    title: "Paiement reçu",
    message: "Vous avez reçu €125.99 de Paul Martin",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
    isRead: false,
  },
  {
    id: 2,
    type: "security",
    title: "Connexion détectée",
    message: "Nouvelle connexion depuis un appareil inconnu",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
    isRead: false,
  },
  {
    id: 3,
    type: "reward",
    title: "Récompense donnée",
    message: 'Vous avez donné €10.00 à Emma pour "Excellentes notes"',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4h ago
    isRead: true,
  },
  {
    id: 4,
    type: "transaction",
    title: "Paiement effectué",
    message: "Paiement de €50.25 pour Facture internet",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6h ago
    isRead: true,
  },
  {
    id: 5,
    type: "system",
    title: "Mise à jour disponible",
    message: "Une nouvelle version de l'application est disponible",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isRead: true,
  },
];
export const mockChildrenWallets = [];

export const mockRecentTransactions = [
  {
    id: 1,
    type: "income",
    title: "Reçu de Paul M.",
    description: "Virement instantané",
    amount: 125.99,
    date: "2024-01-15",
    time: "10:30",
    category: "Transfert",
    status: "completed",
    location: "Virement instantané",
    merchant: "Paul Martin",
    cardUsed: "•••• 4567",
    reference: "VIR-2024-001",
  },
  {
    id: 2,
    type: "expense",
    title: "Facture internet",
    description: "Orange Telecom",
    amount: 50.25,
    date: "2024-01-15",
    time: "09:15",
    category: "Utilities",
    status: "completed",
    location: "Paiement automatique",
    merchant: "Orange Telecom",
    cardUsed: "•••• 4567",
    reference: "ORA-2024-001",
  },
  {
    id: 3,
    type: "income",
    title: "Remboursement",
    description: "Assurance maladie",
    amount: 75.0,
    date: "2024-01-14",
    time: "08:45",
    category: "Remboursement",
    status: "completed",
    location: "Virement automatique",
    merchant: "CPAM",
    reference: "RMB-2024-002",
  },
];

export const mockAllTransactions = [
  ...mockRecentTransactions,
  {
    id: 4,
    type: "expense",
    amount: 35.8,
    category: "Alimentation",
    date: "2024-01-14",
  },
  {
    id: 5,
    type: "expense",
    amount: 12.5,
    category: "Transport",
    date: "2024-01-13",
  },
  {
    id: 6,
    type: "income",
    amount: 200.0,
    category: "Salaire",
    date: "2024-01-13",
  },
  {
    id: 7,
    type: "expense",
    amount: 89.9,
    category: "Utilities",
    date: "2024-01-12",
  },
  {
    id: 8,
    type: "expense",
    amount: 25.0,
    category: "Loisirs",
    date: "2024-01-12",
  },
  {
    id: 9,
    type: "income",
    amount: 45.0,
    category: "Freelance",
    date: "2024-01-11",
  },
  {
    id: 10,
    type: "expense",
    amount: 67.3,
    category: "Alimentation",
    date: "2024-01-11",
  },
  {
    id: 11,
    type: "expense",
    amount: 15.2,
    category: "Transport",
    date: "2024-01-10",
  },
  {
    id: 12,
    type: "expense",
    amount: 120.0,
    category: "Mode",
    date: "2024-01-10",
  },
  {
    id: 13,
    type: "income",
    amount: 80.0,
    category: "Remboursement",
    date: "2024-01-09",
  },
];

import { pallete } from "@/src/utils/pallete";
import { Download, Scan, Send, Smartphone, Upload } from "lucide-react-native";

export const quickActions = [
  {
    icon: Upload,
    label: "Retirer",
    key: "withdrawCash",
    color: pallete.black,
  },
  { icon: Download, label: "Appro", key: "loadWallet", color: pallete.black },
  {
    icon: Send,
    label: "Envoie argent",
    key: "sendMoneyToWallet",
    color: pallete.black,
  },
  { icon: Scan, label: "QR Pay", key: "qrpay", color: pallete.black },
  { icon: Smartphone, label: "Crédit", key: "credit", color: pallete.black },
];

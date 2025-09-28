import React, { useMemo, useRef, useState } from "react";
import {
  Linking,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

export type TermsSection = {
  title: string;
  body: string;
};

export interface TermsAndConditionsModalProps {
  visible: boolean;
  onAccept: (accept: boolean) => void;
  onClose: () => void;
  accepted: boolean;
  sections?: TermsSection[]; // Optionally override default sections
  requireScrollToEnd?: boolean; // If true, disable Accept until bottom reached
  pdfUrl?: string; // Optional: link to full PDF
  brandName?: string; // Optional: show brand/app name in header
}

// --- Default content (USD & CDF)
const DEFAULT_SECTIONS: TermsSection[] = [
  {
    title: "1. Objet",
    body: "Les présents Termes et Conditions (‘T&C’) régissent l’utilisation de l’application de portefeuille électronique (‘l’Application’), permettant d’effectuer, de recevoir et de gérer des paiements en dollars américains (USD) et en francs congolais (CDF).",
  },
  {
    title: "2. Définitions",
    body: "Utilisateur : personne physique ou morale ayant créé un compte.\nWallet : portefeuille électronique pour stocker et gérer des fonds en USD et CDF.\nFonds : montants crédités sur le Wallet.\nPrestataire : société exploitant l’Application.",
  },
  {
    title: "3. Compte & KYC",
    body: "L’ouverture d’un compte requiert des informations exactes et vérifiables. Des justificatifs d’identité (KYC) peuvent être exigés. Vous êtes responsable de la confidentialité de vos identifiants (mot de passe, code PIN).",
  },
  {
    title: "4. Services",
    body: "Dépôt et retrait (USD/CDF), transferts entre utilisateurs, paiements chez partenaires, consultation de solde et historique.",
  },
  {
    title: "5. Frais & commissions",
    body: "Des frais peuvent s’appliquer et sont communiqués avant chaque transaction. Le Prestataire peut réviser les tarifs après notification.",
  },
  {
    title: "6. Plafonds & limites",
    body: "Des limites quotidiennes/hebdomadaires/mensuelles peuvent s’appliquer selon le niveau KYC.",
  },
  {
    title: "7. Responsabilités de l’Utilisateur",
    body: "Utilisation licite uniquement. Vérifiez les informations avant validation. Signalez immédiatement toute activité suspecte.",
  },
  {
    title: "8. Responsabilités du Prestataire",
    body: "Sécurité et disponibilité raisonnables. Protection des données personnelles. Absence de responsabilité pour les pertes dues à l’erreur de l’Utilisateur ou à la force majeure.",
  },
  {
    title: "9. Sécurité",
    body: "Ne partagez pas vos identifiants. Le Prestataire peut bloquer un compte en cas de fraude/violation des T&C.",
  },
  {
    title: "10. Données personnelles",
    body: "Les données sont traitées pour fournir les services, selon la Politique de Confidentialité.",
  },
  {
    title: "11. Devises & conversion",
    body: "Transactions en USD et CDF. En cas de conversion, le taux appliqué est celui communiqué au moment de l’opération.",
  },
  {
    title: "12. Suspension & résiliation",
    body: "Vous pouvez clôturer votre compte à tout moment. Le Prestataire peut suspendre/résilier en cas de non‑respect des T&C.",
  },
  {
    title: "13. Limitation de responsabilité",
    body: "Aucune responsabilité pour pertes indirectes, problèmes techniques indépendants, retards/échecs de tiers (banques, opérateurs, etc.).",
  },
  {
    title: "14. Modifications",
    body: "Les T&C peuvent évoluer. Vous serez notifié dans l’Application.",
  },
  {
    title: "15. Droit applicable & juridiction",
    body: "Régi par le droit de la République Démocratique du Congo. Litiges devant les tribunaux compétents.",
  },
];

// --- Component
const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({
  visible,
  onAccept,
  onClose,
  accepted,
  sections,
  requireScrollToEnd = true,
  pdfUrl,
  brandName,
}) => {
  const [reachedEnd, setReachedEnd] = useState(!requireScrollToEnd);
  const scrollRef = useRef<ScrollView>(null);

  const data = useMemo(() => sections ?? DEFAULT_SECTIONS, [sections]);

  const canAccept = accepted && reachedEnd;

  const handleOpenPdf = async () => {
    if (!pdfUrl) return;
    const supported = await Linking.canOpenURL(pdfUrl);
    if (supported) Linking.openURL(pdfUrl);
  };

  const onScroll = (e: any) => {
    if (!requireScrollToEnd) return;
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const paddingToBottom = 24;
    const isEnd =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    if (isEnd) setReachedEnd(true);
  };

  return (
    <Modal visible={visible} style={styles.modal}>
      <SafeAreaView style={styles.sheet}>
        {/* Grabber */}
        <View style={styles.grabber} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Termes & Conditions</Text>
          {brandName ? <Text style={styles.subtitle}>{brandName}</Text> : null}
          <Text style={styles.caption}>
            Dernière mise à jour : 01/09/2025 • Devises : USD & CDF
          </Text>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <ScrollView
            ref={scrollRef}
            style={styles.scroll}
            onScroll={onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator
          >
            {data.map((s, idx) => (
              <View key={idx} style={styles.section}>
                <Text style={styles.sectionTitle}>{s.title}</Text>
                <Text style={styles.sectionBody}>{s.body}</Text>
              </View>
            ))}
            {pdfUrl ? (
              <Pressable onPress={handleOpenPdf} style={styles.pdfLinkBtn}>
                <Text style={styles.pdfLinkText}>
                  Voir la version PDF complète
                </Text>
              </Pressable>
            ) : null}
            <View style={{ height: 8 }} />
          </ScrollView>
        </View>

        {/* Consent */}
        <View style={styles.consentRow}>
          <Switch value={accepted} onValueChange={() => onAccept(!accepted)} />
          <Text style={styles.consentText}>
            J’ai lu et j’accepte les Termes & Conditions.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable onPress={onClose} style={[styles.btn, styles.btnGhost]}>
            <Text style={[styles.btnText, styles.btnTextGhost]}>Fermer</Text>
          </Pressable>
          <Pressable
            onPress={onClose}
            disabled={!accepted}
            style={[
              styles.btn,
              accepted ? styles.btnPrimary : styles.btnDisabled,
            ]}
            android_ripple={{ color: "rgba(0,0,0,0.08)" }}
          >
            <Text style={styles.btnText}>Accepter</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default TermsAndConditionsModal;

// --- Styles
const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "90%",
    overflow: "hidden",
  },
  grabber: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E5E7EB",
    alignSelf: "center",
    marginTop: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#4B5563",
    marginTop: 2,
  },
  caption: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 6,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  scroll: {
    maxHeight: Platform.select({ ios: 480, android: 520, default: 520 }),
  },
  section: {
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 20,
    color: "#1F2937",
  },
  pdfLinkBtn: {
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
  pdfLinkText: {
    fontSize: 14,
    textDecorationLine: "underline",
    color: "#2563EB",
  },
  consentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 12,
  },
  consentText: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnPrimary: {
    backgroundColor: "#111827",
  },
  btnDisabled: {
    backgroundColor: "#9CA3AF",
  },
  btnGhost: {
    backgroundColor: "transparent",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  btnTextGhost: {
    color: "#111827",
  },
});

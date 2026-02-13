export type TermItem = {
  id: string;
  title: string;
  bullets?: string[];
  body?: string;
  category: "wallet" | "subwallet";
  link?: { label: string; url: string };
};

export const TERMS_DATA: TermItem[] = [
  {
    id: "w-usage",
    category: "wallet",
    title: "Utilisation du Wallet",
    bullets: [
      "Vous devez avoir au moins 18 ans ou être autorisé par votre tuteur légal.",
      "Gardez vos identifiants et votre code PIN confidentiels.",
      "Les transactions confirmées sont irréversibles, sauf disposition légale contraire.",
    ],
  },

  {
    id: "w-security",
    category: "wallet",
    title: "Sécurité & conformité",
    bullets: [
      "Activez l'authentification à deux facteurs (2FA) lorsque disponible.",
      "Signalez immédiatement toute activité suspecte à l'assistance.",
      "Nous appliquons les lois AML/CFT et pouvons suspendre un compte en cas de risque.",
    ],
    link: {
      label: "Politique de confidentialité",
      url: "https://example.com/privacy",
    },
  },
  {
    id: "sw-ownership",
    category: "subwallet",
    title: "Sous‑wallets (propriété & contrôle)",
    bullets: [
      "Les sous‑wallets appartiennent au titulaire du compte principal.",
      "Le titulaire peut définir des rôles et permissions (ex. dépenses, vues).",
      "Le titulaire est responsable de toutes les opérations effectuées via les sous‑wallets.",
    ],
  },
  {
    id: "sw-limits",
    category: "subwallet",
    title: "Plafonds & règles d'utilisation",
    bullets: [
      "Définissez des limites par jour, par opération ou par catégorie (transport, repas, etc.).",
      "Les transactions au‑delà des plafonds seront refusées automatiquement.",
      "Les règles peuvent être modifiées à tout moment par le titulaire.",
    ],
  },
  {
    id: "sw-privacy",
    category: "subwallet",
    title: "Confidentialité & suivi",
    bullets: [
      "Les dépenses des sous‑wallets peuvent être visibles par le titulaire pour raison de contrôle.",
      "Le partage de données avec des tiers respecte la réglementation en vigueur.",
    ],
  },
  {
    id: "w-dispute",
    category: "wallet",
    title: "Réclamations & litiges",
    bullets: [
      "Vous disposez de 30 jours pour contester une transaction non autorisée.",
      "Notre équipe traite les réclamations selon la procédure interne et la loi locale.",
    ],
  },
];

export const authNavigationType = {
  ONBOARDING: "onboarding",
  LOGIN: "login",
  SIGNUP: "signup",
  TERMS: "terms",
};
export interface AuthNavigationProps {
  onChangeScreen: (
    screen: (typeof authNavigationType)[keyof typeof authNavigationType],
    payload?: {
      [key: string]: any;
    }
  ) => void;
}

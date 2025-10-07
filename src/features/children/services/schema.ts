import * as yup from "yup";

export const childrenSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Au moins 2 charactères requis")
    .required("Nom complet requis"),
  age: yup.string().required("Nom requis"),
  initialAmount: yup
    .number()
    .min(0, "Montant initial invalide")
    .required("Montant initial requis"),
  currency: yup.string().required("Devise requise"),
  weeklyLimit: yup.number().min(0, "Limite hebdomadaire invalide"),
  dailyLimit: yup.number().min(0, "Limite quotidienne invalide"),
});

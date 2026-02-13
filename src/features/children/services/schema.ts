import * as yup from "yup";

export const childrenSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Au moins 2 charactères requis")
    .required("Nom complet requis"),
  age: yup.string().required("la date de naissance est requise"),
  initialAmount: yup
    .number()
    .min(1, "Montant initial invalide")
    .required("Montant initial requis"),
  currency: yup.string().required("Devise requise"),
  weeklyLimit: yup.number().min(1, "Limite hebdomadaire invalide").required(),
  dailyLimit: yup.number().min(1, "Limite quotidienne invalide").required(),
});



export const transactionFilterSchema = yup.object().shape({
  dateFrom: yup
      .string()
      .required("date debut est requise"),
  dateTo: yup.string().required("la date de fin est requise"),
  search: yup.string().optional(),
  type: yup.string().optional(),
  status: yup.string().optional(),
});

export const approChild = yup.object().shape({
    amount: yup
        .number()
        .min(1, "Montant initial invalide")
        .required("Montant initial requis"),
})

export const limitSchema = yup.object().shape({
  weekly_limit: yup
      .number()
      .min(1, "Montant initial invalide")
      .required("Montant initial requis"),
  daily_limit: yup
      .number()
      .min(1, "Montant initial invalide")
      .required("Montant initial requis"),
})
import * as yup from "yup";

export const loginSchema = yup.object().shape({
  phone: yup.string().min(9).required("Téléphone requis"),
  password: yup.string().min(1, "Mot de passe requis").required(),
});

export const registerSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Mot de passe requis"),
  firstName: yup.string().min(2, "Prénom requis").required(),
  lastName: yup.string().min(2, "Nom requis").required(),
  phone: yup.string().required("Téléphone requis"),
  email: yup.string().email("Email invalide").optional(),
});

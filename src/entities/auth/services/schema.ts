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
    cpassword: yup
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .required("Mot de passe requis"),
    first_name: yup
        .string()
        .min(2, "Au moins 2 charactères requis")
        .required("Prénom requis"),
    last_name: yup
        .string()
        .min(2, "Au moins 2 charactères requis")
        .required("Nom requis"),
    phone: yup
        .string()
        .min(9, "Saisir que les 9 chiffres")
        .required("Numéro de Téléphone requis"),
    email: yup.string().email("Email invalide").optional(),
});

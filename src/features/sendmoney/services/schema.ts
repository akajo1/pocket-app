import * as yup from "yup";

export const w2WSchema = yup.object().shape({
    phone: yup
        .string()
        .min(9, "Saisir que les 9 chiffres")
        .required("Numéro de Téléphone requis"),
    raison: yup.string().required("la raison est requise"),
    amount: yup
        .number()
        .min(1, "Montant initial invalide")
        .required("Montant initial requis"),
});

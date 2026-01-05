import {Dimensions} from "react-native";
import images from "@/src/assets/images";

export const {width, height} = Dimensions.get("screen");

export const typeTransaction = {
    createChild: "TRANSFER_IN",
    loadWallet: "DEPOSIT",
    walletToWallet: "TRANSFER_OUT",
    cashout: "WITHDRAWAL"
}

export const queryKey = {
    children: "children",
    user: "user",
    transaction: "transaction",
    fee_type: "fee_type",
    wallet: "wallet",
    raison: "raison",
}


export const sendMoneyType = {
    w2w: "W2W",
    w2c: "W2C",
    c2w: "C2W",
    load: "LOD",
    out: "CASHOUT"
}

export type ParamsType = {
    form: string
    type: string
    transactionType: string
    direct?: string
}


export const dropDownData = [
    {
        label: "Mobile Money",
        value: "MOBILE_MONEY",
    },
    {
        label: "Visa - Mastercard",
        value: "CARD",
    },
    {
        label: "Illicocash",
        value: "ILLICO",
    },

]
export const MobilMoneyBrand = [
    {
        icon: images.airtelmoneyIcon,
        value: "airtelMoney",
        label: "Airtel Money",
    },
    {
        icon: images.mpesaIcon,
        value: "mPesa",
        label: "MPesa",
    },
    {
        icon: images.afriMoneyIcon,
        value: "afriMoney",
        label: "AfriMoney",
    },
    {
        icon: images.orangeMoneyIcon,
        value: "orangeMoney",
        label: "Orange Money",
    }
]

export const cardBrand = [
    {
        icon: images.visaIcon,
        value: "visa",
        label: "Visa",
    },
    {
        icon: images.mastercardIcon,
        value: "mastercard",
        label: "Mastercard",
    }
]
export const illicoBrand = [
    {
        icon: images.illicoIcon,
        value: "illicocash",
        label: "illicocash",
    },
]
import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("screen");

export const typeTransaction = {
    createChild: "CREATE_CHILD",
    loadWallet: "LOAD_WALLET",
}

export const queryKey = {
    children: "children",
    user: "user",
    transaction: "transaction",
    fee_type: "fee_type",
    wallet: "wallet",
}


export const sendMoneyType = {
    w2w: "W2W",
    w2c: "W2C",
    load: "load"
}

export type ParamsType = {
    form: string
    type: string
    transactionType: string
}
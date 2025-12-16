import ApiClient from "@/src/services/apiClient";

export interface Wallet {
    "id": string,
    "user_id": string,
    "wallet_number": string,
    "currency": string,
    "ledger_balance": string,
    "available_balance": string,
    "hold_amount": string,
    "status": string,
    "tier": string,
    "created_at": string
}

const walletInstance = new ApiClient<any, Wallet[]>("/wallets");

const walletApi = {
    fetchWallets: async () => await walletInstance.fetch(null, "/"),
    loadWallets: async (data: any) => {
        const currentData = {
            "walletId": data.walletId,
            "amount": data.amount,
            "description": `APPRO-${data.brand.toUpperCase()}`,
            "paymentMethod": `LOD-${data.mode.toUpperCase()}`,
            "brandSelected": data.brand,
            "brandNumber": data.phone
        }
        return await walletInstance.post(currentData, "/")
    },
    cashout: async (data: any) => {
        const currentData = {
            "walletId": data.walletId,
            "amount": data.amount,
            "description": `RETRAIT-${data.brand.toUpperCase()}`,
            "paymentMethod": `CASHOUT-${data.mode.toUpperCase()}`,
            "brandSelected": data.brand,
            "brandNumber": data.phone
        }
        return await walletInstance.post(currentData, "/withdraw")
    },
    sendMoneyW2W: async (data: any) => {

        const currentData = {
            fromWalletId: data.walletId,
            toPhoneNumber: data.phone,
            amount: data.amount,
            raisonId: data.raison.toString(),
            description: "Envoi d'argent",
            paymentMethod: data.paymentMethod,
        }
        return await walletInstance.post(currentData, `/sendmoneytowallet/${data.userId.toString()}`)
    },
};
export default walletApi;

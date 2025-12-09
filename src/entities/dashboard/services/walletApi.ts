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
        const currentData = {...data, walletId: null}
        return await walletInstance.post(currentData, `/${data.walletId.toString()}`,)
    },
    sendMoneyW2W: async (data: any) => {
        const currentData = {...data, walletId: null}
        return await walletInstance.post(currentData, `/sendmoneytowallet/${data.walletId.toString()}`)
    },
};
export default walletApi;

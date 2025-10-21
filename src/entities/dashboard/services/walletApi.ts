import ApiClient from "@/src/services/apiClient";

export interface Wallet {
    id: string;
    balance: string;
    is_active: boolean;
    created_at: string;
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

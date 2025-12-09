import {useQuery} from "@tanstack/react-query";
import useUserStore from "../../auth/store/userStore";
import walletApi, {Wallet} from "../services/walletApi";

export const useWallet = () => {
    const {user} = useUserStore.getState();
    return useQuery<any, Error, Wallet[]>({
        queryKey: ["wallet"],
        queryFn: walletApi.fetchWallets,
        enabled: !!user,
    });
};

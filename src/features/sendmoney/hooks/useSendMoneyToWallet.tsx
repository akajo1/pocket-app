import {useAlert} from "@/src/shared/provider/AlertProvider";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "expo-router";
import {queryKey, sendMoneyType, typeTransaction} from "@/src/utils/method";
import walletApi from "@/src/entities/dashboard/services/walletApi";

const useSendMoneyToWallet = () => {
    const message = useAlert();
    const queryClient = useQueryClient();
    const navigation = useRouter();

    const handleCloseModal = () =>
        message.setAlertMessage({
            visible: false,
            message: "",
            title: "",
            type: "info",
            onPress: () => {
            },
            btnText: "",
        });

    return useMutation<any, Error, any>({
        mutationFn: (body) => walletApi.sendMoneyW2W(body),
        onSuccess: async (response) => {
            await queryClient.invalidateQueries({queryKey: [queryKey.wallet]});
            await queryClient.invalidateQueries({queryKey: [queryKey.transaction]});

            navigation.navigate({
                pathname: "/(transactions)/receiptScreen",
                params: {
                    data: JSON.stringify(response),
                    transactionType: typeTransaction.walletToWallet,
                    type: sendMoneyType.w2w
                }
            })
        },
        onError: (error) => {
            message?.setAlertMessage({
                visible: true,
                message: error?.message || "Une erreur est survenue",
                title: "Connexion",
                type: "warning",
                onPress: () => handleCloseModal(),
                btnText: "D'accord",
            });
        },
    });
};
export default useSendMoneyToWallet;
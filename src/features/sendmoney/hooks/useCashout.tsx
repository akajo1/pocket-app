import {useAlert} from "@/src/shared/provider/AlertProvider";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "expo-router";
import {sendMoneyType, typeTransaction} from "@/src/utils/method";
import walletApi from "@/src/entities/dashboard/services/walletApi";

const useCashout = () => {
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
        mutationFn: (body) => walletApi.cashout(body),
        onSuccess: (response) => {
            queryClient.invalidateQueries();
            navigation.navigate({
                pathname: "/(transactions)/receiptScreen",
                params: {
                    data: JSON.stringify(response),
                    transactionType: typeTransaction.cashout,
                    type: sendMoneyType.out
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
export default useCashout;
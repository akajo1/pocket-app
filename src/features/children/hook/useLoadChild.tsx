import {useAlert} from "@/src/shared/provider/AlertProvider";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "expo-router";
import childrenApi, {LoadChildParams} from "@/src/features/children/services/api";
import {queryKey, sendMoneyType, typeTransaction} from "@/src/utils/method";

const useLoadChild = () => {
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

    return useMutation<any, Error, LoadChildParams>({
        mutationFn: (body) => childrenApi.loadChild(body),
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: [queryKey.wallet]});
            queryClient.invalidateQueries({queryKey: [queryKey.children]});
            queryClient.invalidateQueries({queryKey: [queryKey.transaction]});

            navigation.navigate({
                pathname: "/(transactions)/receiptScreen",
                params: {
                    data: JSON.stringify(response),
                    transactionType: typeTransaction.createChild,
                    type: sendMoneyType.w2c,
                    direct: "loadChild"
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
export default useLoadChild;
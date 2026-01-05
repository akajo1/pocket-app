import {useAlert} from "@/src/shared/provider/AlertProvider";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "expo-router";
import childrenApi, {CreateChildren} from "@/src/features/children/services/api";
import {queryKey, sendMoneyType, typeTransaction} from "@/src/utils/method";

const useCreateChild = () => {
    const message = useAlert();
    const queryClient = useQueryClient();
    const navigation = useRouter();

    const handleCloseModal = () =>
        message.setAlertMessage({
            visible: false,
            message: "",
            title: "",
            type: "info",
            onPress: () => {},
            btnText: "",
        });

    return useMutation<any, Error, CreateChildren>({
        mutationFn: (body) => childrenApi.createChild(body),
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: [queryKey.children]});
            queryClient.invalidateQueries({queryKey: [queryKey.transaction]});

            navigation.navigate({
                pathname: "/(transactions)/receiptScreen",
                params: {
                    data: JSON.stringify(response),
                    transactionType: typeTransaction.createChild,
                    type: sendMoneyType.w2c
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
export default useCreateChild;
import {useAlert} from "@/src/shared/provider/AlertProvider";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "expo-router";
import childrenApi, {CreateChildren} from "@/src/features/children/services/api";

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

    return useMutation<CreateChildren, Error, CreateChildren>({
        mutationFn: (body) => childrenApi.createChild(body),
        onSuccess: (response) => {
            queryClient.invalidateQueries(["children"]);
            navigation.navigate({
                pathname: "",
                data: JSON.stringify(body),
                type: "createChild"
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
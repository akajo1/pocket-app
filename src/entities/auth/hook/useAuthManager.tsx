import useUserStore, {Loginresponse} from "@/src/entities/auth/store/userStore";
import {useCallback} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useAlert} from "@/src/shared/provider/AlertProvider";
import {useRouter} from "expo-router";
import authApi, {LoginFormType} from "@/src/entities/auth/services/api";


export const useAuthManager = () => {
    const {user, clearUser, setUser} = useUserStore()
    const message = useAlert();
    const navigation = useRouter();
    const queryClient = useQueryClient();

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

    const fetchUser = useQuery({
        queryKey: ["user"],
        queryFn: async () => await authApi.fetchUser(),
        enabled: !!user,
        refetchInterval: 1000 * 60 * 30,
        refetchIntervalInBackground: true
    })

    const loginMutation = useMutation<Loginresponse, Error, LoginFormType>({
        mutationFn: authApi.login,
        onSuccess: (response) => {
            queryClient.invalidateQueries()
            const {user, token} = response;

            setUser({
                user, token
            });
            navigation.replace("/(dashboard)");
        },
        onError: (error) => {
            let fetchMessage
            if (Array.isArray(error?.message)) {
                fetchMessage = error.message.join("\n");
            } else
                fetchMessage = error.message;
            message?.setAlertMessage({
                visible: true,
                message: fetchMessage || "Une erreur est survenue",
                title: "Connexion",
                type: "warning",
                onPress: () => handleCloseModal(),
                btnText: "D'accord",
            });
        },
    });

    const login = useCallback(
        async (data: any) => {
            return await loginMutation.mutate(data)
        },
        [loginMutation]
    );

    return {
        logout: () => {
            authApi.logout()
            clearUser()
        },
        login,
        user,
        fetchUser: fetchUser.data,
        loading: fetchUser.isLoading || loginMutation.isPending,
    }
}
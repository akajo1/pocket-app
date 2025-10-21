import  {User} from "@/src/entities/auth/store/userStore";
import {useCallback, useContext} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AuthContext} from "@/src/shared/provider/AuthProvider";
import useUserStore from "@/src/entities/auth/store/userStore";
import {useAlert} from "@/src/shared/provider/AlertProvider";
import {useRouter} from "expo-router";
import {LoginFormType} from "@/src/entities/auth/services/api";
import authApi from "../services/api";


export const useAuthManager = ()=> {
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
            onPress: () => {},
            btnText: "",
        });

    const fetchUser = useQuery({
        queryKey: ["user"],
        queryFn: async () => await authApi.fetchUser(),
        enabled: !!user,
        refetchInterval: 1000 * 60 * 30,
        refetchIntervalInBackground: true
    })

    const loginMutation = useMutation<User, Error, LoginFormType>({
        mutationFn: authApi.login,
        onSuccess: (response) => {
            queryClient.invalidateQueries()
            const {user, tokens} = response;
            setUser({...user, token: tokens.accessToken});
            navigation.replace("/(dashboard)");
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

    const login = useCallback(
        async (data: any) => {
            return await loginMutation.mutate(data)
        },
        [loginMutation]
    );

    return {
        logout: () => clearUser(),
        login,
        user,
        loading: fetchUser.isLoading || loginMutation.isPending,
    }
}
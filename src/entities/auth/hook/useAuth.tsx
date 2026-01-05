import { useAlert } from "@/src/shared/provider/AlertProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import authApi, { LoginFormType } from "../services/api";
import useUserStore, { User } from "../store/userStore";

const useAuth = () => {
  const { setUser } = useUserStore.getState();
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

  return useMutation<User, Error, LoginFormType>({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      queryClient.invalidateQueries();
      const { user, tokens } = response;
      setUser({ ...user, token: tokens.accessToken });
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
};
export default useAuth;

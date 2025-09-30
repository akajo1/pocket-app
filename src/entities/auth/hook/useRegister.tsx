import { RegisterFormData } from "@/_prev/lib/validations";
import { useAlert } from "@/src/shared/provider/AlertProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import authApi from "../services/api";
import { User } from "../store/userStore";

const useRegister = () => {
  const message = useAlert();
  const queryClient = useQueryClient();
  const navigation = useRouter();

  const handleCloseModal = () => {
    message.setAlertMessage({
      visible: false,
      message: "",
      title: "",
      type: "info",
      onPress: () => {},
      btnText: "",
    });
  };

  return useMutation<User, Error, RegisterFormData>({
    mutationFn: authApi.register,
    onSuccess: (_) => {
      queryClient.invalidateQueries();
      message?.setAlertMessage({
        visible: true,
        message: "Création de compte effectué avec succés",
        title: "Inscripion",
        type: "success",
        onPress: () => {
          handleCloseModal();
          navigation.replace("/(auth)/login");
        },
        btnText: "Me connecter",
      });
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
export default useRegister;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApi, { LoginFormType } from "../services/api";
import useUserStore, { User } from "../store/userStore";

const useAuth = () => {
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();
  return useMutation<User, Error, LoginFormType>({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      // Handle successful login
      console.log(response);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      // Handle login error
      console.error(error);
    },
  });
};
export default useAuth;

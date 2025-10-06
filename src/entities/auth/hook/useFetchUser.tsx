import { useQuery } from "@tanstack/react-query";
import { authApi } from "../services";
import useUserStore from "../store/userStore";

const useFetchAuth = () => {
  const { user } = useUserStore.getState();

  return useQuery({
    queryKey: ["user"],
    queryFn: () => authApi.fetchUser,
    enabled: !!user,
    staleTime: 1000 * 60 * 1, // 1 minutes
  });
};

export default useFetchAuth;

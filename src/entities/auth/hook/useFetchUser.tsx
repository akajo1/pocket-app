import { useQuery } from "@tanstack/react-query";
import { authApi } from "../services";
import useUserStore from "../store/userStore";

const useFetchAuth = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => await authApi.fetchUser(),
    staleTime: 1000 * 60 * 1, // 1 minutes
  })
};

export default useFetchAuth;

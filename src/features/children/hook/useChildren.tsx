import useUserStore from "@/src/entities/auth/store/userStore";
import { useQuery } from "@tanstack/react-query";
import childrenApi, { Children } from "../services/api";

export const useChildren = () => {
  const { user } = useUserStore.getState();
  return useQuery<any, Error, Children[]>({
    queryKey: ["children"],
    queryFn: childrenApi.fetchChildren,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });
};

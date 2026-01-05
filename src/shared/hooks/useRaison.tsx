import {useQuery} from "@tanstack/react-query";
import {queryKey} from "@/src/utils/method";
import useUserStore from "@/src/entities/auth/store/userStore";
import helperApi, {helperResponse} from "@/src/shared/services/helperApi";


export const useRaison = () => {
    const {user} = useUserStore();
    return useQuery<any, Error, helperResponse>({
        queryKey: [queryKey.raison],
        queryFn: () => helperApi.fetchRaisons(),
        enabled: !!user,
        staleTime: 1000 * 60 * 5,
    });
};

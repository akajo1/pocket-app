import {useQuery} from "@tanstack/react-query";
import {queryKey} from "@/src/utils/method";
import {helperResponse} from "@/src/shared/services/helperApi";
import {authApi} from "@/src/entities/auth/services";


export const useConfirmationUserInfo = (phone: string) => {
    return useQuery<any, Error, helperResponse>({
        queryKey: [queryKey.user, "info", phone],
        queryFn: () => authApi.fetchByPhone(phone),
    });
};

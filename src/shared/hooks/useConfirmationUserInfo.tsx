import {useQuery} from "@tanstack/react-query";
import {queryKey} from "@/src/utils/method";
import helperApi, {helperResponse} from "@/src/shared/services/helperApi";


export const useConfirmationUserInfo = (phone: string) => {
    return useQuery<any, Error, helperResponse>({
        queryKey: [queryKey.user, "info", phone],
        queryFn: () => helperApi.fetchConfirmationUserInfo({phone}),
    });
};

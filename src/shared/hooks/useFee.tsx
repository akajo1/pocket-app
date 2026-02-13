import {useQuery} from "@tanstack/react-query";
import {queryKey} from "@/src/utils/method";
import feeApi, {feeRequest, feeResponse} from "@/src/shared/services/feeApi";
import useUserStore from "@/src/entities/auth/store/userStore";


export const useFee = (data: feeRequest) => {
    const {user} = useUserStore();
    return useQuery<any, Error, feeResponse>({
        queryKey: [queryKey.fee_type, "detail", data.method],
        queryFn: () =>  feeApi.fetchfee(data),
        enabled: !!user,
    });
};

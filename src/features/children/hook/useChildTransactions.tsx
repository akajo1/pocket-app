import {useQuery} from "@tanstack/react-query";
import {Children} from "../services/api";
import {queryKey} from "@/src/utils/method";
import transactionApi, {transactionsParams} from "@/src/entities/dashboard/services/transactionApi";
import {useChildren} from "@/src/features/children/hook/useChildren";

export const useChildTransactions = (params: transactionsParams) => {
    const {data} = useChildren();
    const currentParams = {
        ...params,
        childId: data?.length && data[params?.childId]?.id as string,
    };
  
    return useQuery<any, Error, Children[]>({
        queryKey: [queryKey.children, params.childId, queryKey.transaction],
        queryFn: () => transactionApi.fetchChildTransactions(currentParams),
        enabled: !!data?.length,
    });
};

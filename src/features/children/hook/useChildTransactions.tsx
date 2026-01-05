import {useQuery} from "@tanstack/react-query";
import {Children} from "../services/api";
import {queryKey} from "@/src/utils/method";
import transactionApi, {transactionsParams} from "@/src/entities/dashboard/services/transactionApi";

export const useChildTransactions = (params: transactionsParams) => {
    const {childId} = params;
    const currentParams = {
        ...params,
        childId
    };
  
    return useQuery<any, Error, Children[]>({
        queryKey: [queryKey.children, params.childId, queryKey.transaction],
        queryFn: () => transactionApi.fetchChildTransactions(currentParams),
        enabled: !!childId,
    });
};

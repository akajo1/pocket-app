import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
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


export const useChildTAlltransactions = (params: transactionsParams) => {
    const {childId} = params;
    const currentParams = {
        ...params,
        childId
    };

    return useInfiniteQuery<
        any,
        Error,
        any
    >({
        queryKey: [queryKey.children, params, queryKey.transaction],
        queryFn: ({pageParam}) => transactionApi.fetchChildTransactions({...currentParams,  page: pageParam,}),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if(lastPage.page < lastPage.totalPages) return lastPage.page + 1
            return null
        },
        enabled: !!childId,
    });
};

import {keepPreviousData, useInfiniteQuery, useQuery} from "@tanstack/react-query";
import transactionApi, {transactionsParams} from "../services/transactionApi";

interface TransactionType {
    id: string;
    reference_number: string;
    amount: string;
    description: string;
    status: string;
    user_id: string;
    child_id: string;
    wallet_id: string;
    from_id: string;
    typeTransaction: string;
    raison_id: number;
    payment_method: string;
    created_at: string;
    updated_at: string;
    to_id: string;
    old_amount: string;
    current_amount: string;
    user_first_name: string;
    user_last_name: string;
    from_user_first_name: string;
    from_user_last_name: string;
    to_user_first_name: string;
    to_user_last_name: string;
    wallet_currency: string;
    raison_label: string;
}

export const useWalletLimitedTransactions = (params: transactionsParams) => {
    const { walletId } = params;
    return useQuery<any, Error, any>({
        queryKey: ["transactions", walletId],
        queryFn: () => transactionApi.fetchTransactions({
                ...params,
                pageSize: params.pageSize ?? 3,
            }),
        enabled: !!walletId,

    })
}
export const useTransactions = (params: transactionsParams) => {
    const { walletId } = params;

    return useInfiniteQuery<
       any,
        Error,
        any
    >({
        queryKey: ["transactions", walletId, params],

        queryFn: ({pageParam}) => transactionApi.fetchTransactions({
                ...params,
                page: pageParam,
               pageSize: params.pageSize ?? 20,
            }),
            initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if(lastPage.page < lastPage.totalPages) return lastPage.page + 1
            return null
        },
        enabled: !!walletId,
    });
};

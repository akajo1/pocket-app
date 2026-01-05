import {useQuery} from "@tanstack/react-query";
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

export const useTransactions = (params: transactionsParams) => {
    const {walletId} = params
    return useQuery<any, Error, TransactionType[]>({
        queryKey: ["transactions", params],
        queryFn: () => transactionApi.fetchTransactions(params),
        enabled: !!walletId,
    });
};

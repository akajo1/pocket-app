import { useQuery } from "@tanstack/react-query";
import childrenApi, { Children } from "../services/api";
import {queryKey} from "@/src/utils/method";

export const useChildTransactions = (childId: string) => {
  return useQuery<any, Error, Children[]>({
    queryKey: [queryKey.children, childId, queryKey.transaction],
    queryFn: () => childrenApi.fetchTransaction(childId),
    enabled: !!childId,
    staleTime: 1000 * 60 * 5,
  });
};

import { useQuery } from "@tanstack/react-query";
import childrenApi, { Children } from "../services/api";

export const useChildTransactions = (childId: string) => {
  return useQuery<any, Error, Children[]>({
    queryKey: ["children", childId, "transactions"],
    queryFn: () => childrenApi.fetchTransaction(childId),
    enabled: !!childId,
    staleTime: 1000 * 60 * 5,
  });
};

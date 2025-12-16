import ApiClient from "@/src/services/apiClient";

export interface Children {
  id: string;
  name: string;
  balance: number;
  currency: string;
  age: number;
  weekly_spent?: number;
  daily_spent?: number;
  daily_limit?: number;
  weekly_limit?: number;
  is_active: boolean;
  created_at: string;
}
export interface CreateChildren{
    name: string;
    currency: string;
    age: Date
    walletId: string;
    initialAmount: number;
    dailyLimit: number;
    weeklyLimit: number;
}
const childrenInstance = new ApiClient<any, Children[]>("/children");

const childrenApi = {
  fetchChildren: async () => await childrenInstance.fetch(null, "/"),
  fetchTransaction: async (childId: string) =>
    await childrenInstance.fetch(null, `/${childId}/transactions`),
    createChild: async (body:CreateChildren)=>await childrenInstance.post(body),
};
export default childrenApi;



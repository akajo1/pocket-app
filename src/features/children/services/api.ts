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

export interface LoadChildParams {
    parentWalletId: string;
    amount: number;
    childId: string;

}
const childrenInstance = new ApiClient<any, Children[]>("/children");

const childrenApi = {
  fetchChildren: async () => await childrenInstance.fetch(null, "/"),
    createChild: async (body: CreateChildren) => {

        const currentBody = {
            walletId: body.walletId,
            "name": body.name,
            "birthDate": body.age,
            "initial_balance": body.initialAmount,
            "weekly_limit": body.weeklyLimit,
            "daily_limit": body.dailyLimit,

        }
        return await childrenInstance.post(currentBody)
    },
    loadChild: async (body: LoadChildParams) => {
        const currentBody = {
            ...body,
            childId: null,
            name: null
        }
        return await childrenInstance.post(currentBody, `/${body.childId}/fund`)
    }
};
export default childrenApi;



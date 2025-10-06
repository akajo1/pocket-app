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

const childrenInstance = new ApiClient<any, Children[]>("/children");

const childrenApi = {
  fetchChildren: async () => await childrenInstance.fetch(null, "/"),
  fetchTransaction: async (childId: string) =>
    await childrenInstance.fetch(null, `/${childId}/transactions`),
};
export default childrenApi;

import ApiClient from "@/src/services/apiClient";

export interface feeResponse {
    id: number,
    fee_type_id: number,
    percentage: string,
    isPrimary: boolean,
    created_at: string,
    updated_at: string,
    wallet_currency: string,
    fee_type_label: string
}

const feeInstance = new ApiClient<any, feeResponse>("/fees");
export type feeRequest = {
    type: string,
    currency: string,
}
const feeApi = {
    fetchfee: async (params: feeRequest) => await feeInstance.fetch(params, `/rules`),
};
export default feeApi;

import ApiClient from "@/src/services/apiClient";

export interface helperResponse {
    success: boolean;
    data: any
}

const helperInstance = new ApiClient<any, helperResponse>("/reasons");
const helperApi = {
    fetchRaisons: async (params: any) => await helperInstance.fetch(params, `/`),
    fetchConfirmationUserInfo: async (body: any) => await helperInstance.fetch(null, `/userinfo/${body.phone}`),
};
export default helperApi;

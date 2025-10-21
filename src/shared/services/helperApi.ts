import ApiClient from "@/src/services/apiClient";

export interface helperResponse {
    success: boolean;
    data: any
}

const helperInstance = new ApiClient<any, helperResponse>("/helper");
const helperApi = {
    fetchRaisons: async () => await helperInstance.fetch(null, `/raison`),
    fetchConfirmationUserInfo: async (body: any) => await helperInstance.fetch(null, `/userinfo/${body.phone}`),
};
export default helperApi;

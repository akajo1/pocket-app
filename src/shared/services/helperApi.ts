import ApiClient from "@/src/services/apiClient";

export interface helperResponse {
    success: boolean;
    data: any
}

const helperInstance = new ApiClient<any, helperResponse>("/helper");
const helperApi = {
    fetchRaisons: async () => await helperInstance.fetch(null, `/raison`),
};
export default helperApi;

import ApiClient from "@/src/services/apiClient";
import {Loginresponse} from "../store/userStore";

export interface LoginFormType {
    identifier: string;
    password: string;
}

export interface RegisterFormType {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
}

const authInstance = new ApiClient<any, Loginresponse>("/auth");

const authApi = {
    login: async (data: LoginFormType) => await authInstance.post({
        identifier: data.phone,
        password: data.password
    }, "/login"),
    fetchUser: async () => await authInstance.fetch(null, "/profil"),
    register: async (data: RegisterFormType) =>
        await authInstance.post(data, "/register"),
};
export default authApi;

import ApiClient from "@/src/services/apiClient";
import { User } from "../store/userStore";

export interface LoginFormType {
  phone: string;
  password: string;
}

export interface RegisterFormType {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}
const authInstance = new ApiClient<any, User>("/auth");

const authApi = {
  login: async (data: LoginFormType) => await authInstance.post(data, "/login"),
  fetchUser: async () => await authInstance.fetch(null, "/profil"),
  register: async (data: RegisterFormType) =>
    await authInstance.post(data, "/register"),
};
export default authApi;

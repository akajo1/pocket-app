import ApiClient from "@/src/services/apiClient";
import { User } from "../store/userStore";

export interface LoginFormType {
  phone: string;
  password: string;
}

const authInstance = new ApiClient<any, User>("/auth");

const authApi = {
  login: (data: LoginFormType) => authInstance.post(data, "/login"),
  fetchUser: () => authInstance.fetch(null, "/profil"),
  register: (data: any) => authInstance.post(data, "/register"),
};
export default authApi;

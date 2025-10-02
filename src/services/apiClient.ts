import axios from "axios";
import useUserStore from "../entities/auth/store/userStore";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const user = useUserStore.getState().user;
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const { user, clearUser } = useUserStore.getState();

    if (error.response?.status === 401 && user?.token) clearUser();
    console.log("--global", error.response.data);
    return Promise.reject(error.response.data);
  }
);

class ApiClient<T, D> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (route: string = ""): Promise<D[]> => {
    try {
      const response = await axiosInstance.get<D[]>(this.endpoint + route);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  fetch = async (params: T = {} as T, route: string = ""): Promise<D[] | D> => {
    try {
      const response = await axiosInstance.get<D[] | D>(this.endpoint + route, {
        params,
      });
      return response.data;
    } catch (error) {
      console.log("--error", error);
      throw error;
    }
  };
  post = async (data: T, route: string = ""): Promise<D> => {
    try {
      const response = await axiosInstance.post<D>(this.endpoint + route, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  update = async (id: string, data: T, route: string = ""): Promise<D> => {
    try {
      const response = await axiosInstance.put<D>(
        this.endpoint + route + `/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  delete = async (id: string, route: string = ""): Promise<D> => {
    try {
      const response = await axiosInstance.delete<D>(
        this.endpoint + route + `/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export default ApiClient;

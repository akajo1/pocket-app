import axios from "axios";
import useUserStore from "../entities/auth/store/userStore";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { user } = useUserStore();
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
    const { user, clearUser } = useUserStore();

    if (error.response?.status === 401 && user?.token) {
      clearUser();
    }
    return Promise.reject(error);
  }
);

class ApiClient<T, D> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (route: string = ""): Promise<D[]> => {
    return axiosInstance
      .get<D[]>(this.endpoint + route)
      .then((response) => response.data);
  };

  fetch = (params: T = {} as T, route: string = ""): Promise<D[] | D> => {
    return axiosInstance
      .get<D[] | D>(this.endpoint + route, { params })
      .then((response) => response.data);
  };
  post = (data: T, route: string = ""): Promise<D> => {
    return axiosInstance
      .post<D>(this.endpoint + route, data)
      .then((response) => response.data);
  };

  update = (id: string, data: T, route: string = ""): Promise<D> => {
    return axiosInstance
      .put<D>(this.endpoint + route + `/${id}`, data)
      .then((response) => response.data);
  };
  delete = (id: string, route: string = ""): Promise<D> => {
    return axiosInstance
      .delete<D>(this.endpoint + route + `/${id}`)
      .then((response) => response.data);
  };
}

export default ApiClient;

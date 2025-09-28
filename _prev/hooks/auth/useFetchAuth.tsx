import { useQuery } from "@tanstack/react-query";
import ApiClient from "@/src/services/apiClient";
import {CACHE_KEY_USER} from "@/src/utils/method";

const apiClient = new ApiClient<User>("/auth/");

interface User{
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    isActive: boolean;
}

const useFetchAuth = () => {
  return useQuery<User, Error>({
    queryKey: CACHE_KEY_USER,
    queryFn: apiClient.getAll,
  });
};

export default useFetchAuth;

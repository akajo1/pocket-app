import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

class ApiClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll= ()=> {
      return  axiosInstance.get<T[]>(this.endpoint).then((response) => response.data);
    }

    post = (data: T)=>{
       return axiosInstance.post<T>(this.endpoint, data).then((response) => response.data);
    }
}

export default ApiClient;
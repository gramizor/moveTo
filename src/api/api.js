import axios, { AxiosHeaders } from "axios";
const instance = axios.create({
    baseURL: "http://31.129.105.53:8085/api/link/",
});
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers = new AxiosHeaders({
            ...config.headers?.toJSON(),
            Authorization: `Bearer ${token}`,
        });
    }
    return config;
}, (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
});
export default instance;

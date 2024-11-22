import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://favores.site/api/link/",
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = new AxiosHeaders({
        ...config.headers?.toJSON(),
        Authorization: `Bearer ${token}`,
      });
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

export default instance;

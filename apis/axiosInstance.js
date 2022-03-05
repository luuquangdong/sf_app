import axios from "axios";
import { getToken } from "../utils/authUtil";

const headers = {};
export const BASE_URL = "http://192.168.1.115:8080";

const instance = axios.create({
  baseURL: BASE_URL,
  headers,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

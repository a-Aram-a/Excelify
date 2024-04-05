import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.CLIENT_API_URL,
    timeout: 30000,
});
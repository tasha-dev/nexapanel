// Codes by mahdi tasha
// Importing part
import axios from "axios";

// Defining axios instance
export const axiosInstance = axios.create({
   baseURL: "https://dummyjson.com",
   withCredentials: true,
   headers: {
      "Content-Type": "application/json",
   },
});

// Attaching access token
axiosInstance.interceptors.request.use((config) => {
   const token = localStorage.getItem("accessToken");

   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
});

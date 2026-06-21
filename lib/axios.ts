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

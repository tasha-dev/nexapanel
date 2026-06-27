// Codes by mahdi tasha
// Importing part
import axios from "axios";
import authStore from "@/store/auth";

// Defining axios instance
export const axiosInstance = axios.create({
   baseURL: "https://dummyjson.com",
   withCredentials: true,
   headers: {
      "Content-Type": "application/json",
   },
});

// separate refresh instance
const refreshApi = axios.create({
   baseURL: "https://dummyjson.com",
   withCredentials: true,
   headers: {
      "Content-Type": "application/json",
   },
});

// Attaching access token
axiosInstance.interceptors.request.use((config) => {
   const token = authStore.getState().accsessToken;

   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
});

// Defining refresh variables
let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

// Defining refresh functions
function subscribeTokenRefresh(callback: (token: string) => void) {
   pendingRequests.push(callback);
}

function onRefreshFinished(token: string) {
   pendingRequests.forEach((callback) => callback(token));
   pendingRequests = [];
}

async function refreshAccessToken() {
   const response = await refreshApi.post("/auth/refresh");
   return response.data.accessToken;
}

// Handling Refresh logic
axiosInstance.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;

      if (!error.response) {
         return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;

         if (isRefreshing) {
            return new Promise((resolve) => {
               subscribeTokenRefresh((token) => {
                  originalRequest.headers.Authorization = `Bearer ${token}`;

                  resolve(axiosInstance(originalRequest));
               });
            });
         }

         isRefreshing = true;

         try {
            const newToken = await refreshAccessToken();
            authStore.getState().setAccessToken(newToken);
            onRefreshFinished(newToken);

            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            return axiosInstance(originalRequest);
         } catch (refreshError) {
            authStore.getState().logout();
            return Promise.reject(refreshError);
         } finally {
            isRefreshing = false;
         }
      }

      return Promise.reject(error);
   },
);

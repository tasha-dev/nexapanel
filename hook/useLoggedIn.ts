// Codes by mahdi tasha
// Importing part
import { axiosInstance } from "@/lib/axios";
import { GETMeType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Creating and exporting useLoggedIn hook as default
export default function useLoggedIn() {
   // Defining hooks
   const router = useRouter();
   const { isPending, isError, data, ...query } = useQuery<GETMeType>({
      queryKey: ["me"],
      queryFn: async () => {
         const { data } = await axiosInstance.get("/auth/me");
         return data;
      },
      retry: false,
      staleTime: Infinity,
   });

   // Defining variables
   const error = query.error as AxiosError;

   // Using useEffect to remove local storage for access and refresh tokens when the fetching returns 401 (unauthorized)
   useEffect(() => {
      if (!isPending && isError && error) {
         if (Number(error.stack) === 401) {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
               localStorage.removeItem("accessToken");
               localStorage.removeItem("refreshToken");

               router.refresh();
            }
         }
      }
   }, [isPending]);

   // Returning part
   return {
      isLoading: isPending,
      isLoggedIn: Boolean(data) && !isError,
      data,
   };
}

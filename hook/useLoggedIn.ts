// Codes by mahdi tasha
// Importing part
import { axiosInstance } from "@/lib/axios";
import { GETMeType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";

// Creating and exporting useLoggedIn hook as default
export default function useLoggedIn() {
   // Defining hooks
   const { isPending, isError, data } = useQuery<GETMeType>({
      queryKey: ["me"],
      queryFn: async () => {
         const { data } = await axiosInstance.get("/auth/me");
         return data;
      },
      retry: false,
      staleTime: Infinity,
   });

   // Returning part
   return {
      isLoading: isPending,
      isLoggedIn: Boolean(data) && !isError,
      data,
   };
}

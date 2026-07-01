// Codes by mahdi tasha
// Importing part
import { axiosInstance } from "@/lib/axios";
import { GETMeType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";

// Creating and exporting useLoggedIn hook as default
export default function useLoggedIn(enabled: boolean = true) {
   // Defining hooks
   const { isLoading, isError, data, isFetched } = useQuery<GETMeType>({
      queryKey: ["me"],
      enabled,
      refetchInterval: Infinity,
      gcTime: Infinity,
      queryFn: async () => {
         const { data } = await axiosInstance.get("/auth/me");
         return data;
      },
   });

   // Returning part
   return {
      isLoading: isLoading,
      isLoggedIn: !!data && !isError,
      data: data,
      isFetched,
   };
}

// Codes by mahdi tasha
// Importing part
import { GETMeType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { is } from "zod/v4/locales";

// Creating and exporting useLoggedIn hook as default
export default function useLoggedIn(enabled: boolean = true) {
   // Defining hooks
   const { isLoading, isError, data } = useQuery<GETMeType>({
      queryKey: ["me"],
      enabled,
      queryFn: async () => {
         const { data } = await axios.get("/auth/me");
         return data;
      },
   });

   // Returning part
   return {
      isLoading,
      isLoggedIn: !!data && !isError,
      data: data,
   };
}

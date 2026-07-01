// Codes by mahdi tasha
// Forcing next.js to render this component as client side
"use client";

// Importing part
import useLoggedIn from "@/hook/useLoggedIn";
import { GETMeType } from "@/type/api";
import { AuthProviderProps } from "@/type/component";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createContext, useEffect } from "react";

// Defining contexts
export const MeContext = createContext<GETMeType | "401" | undefined>(
   undefined,
);

// Creating and exporting AuthProvider component as default
export default function AuthProvider({
   children,
   authOnly = true,
}: AuthProviderProps) {
   // Defining hooks
   const router = useRouter();

   const { isLoading, isLoggedIn, data, isFetched } = useLoggedIn(
      !authOnly || authOnly === "reverse",
   );

   // Using useEffect to handle redirects
   useEffect(() => {
      if (!isFetched || isLoading) return;

      if (authOnly === "reverse") {
         if (data && isLoggedIn) {
            router.replace("/");
         }
      } else {
         if (!data || !isLoggedIn) {
            router.replace("/");
         }
      }
   }, [isFetched, isLoading, data, isLoggedIn, authOnly, router]);

   // Conditional rendering
   if (!authOnly) {
      return children;
   }

   if (isLoading || !isFetched) {
      return (
         <section className="h-dvh flex items-center justify-center">
            <Loader2 className="size-8 animate-spin" />
         </section>
      );
   }

   if (authOnly === "reverse") {
      if (!data && !isLoggedIn) {
         return (
            <MeContext.Provider value={"401"}>{children}</MeContext.Provider>
         );
      }

      return null;
   }

   if (data && isLoggedIn) {
      return <MeContext.Provider value={data}>{children}</MeContext.Provider>;
   }

   return null;
}

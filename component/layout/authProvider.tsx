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
   const { isLoading, isLoggedIn, data } = useLoggedIn();

   // Using useEffect to handle redirects
   useEffect(() => {
      if (isLoading) return;

      if (authOnly === "reverse" && isLoggedIn) {
         router.replace("/");
      }

      if (authOnly === true && !isLoggedIn) {
         router.replace("/");
      }
   }, [isLoading, isLoggedIn, authOnly, router]);

   // Conditional rendering
   if (isLoading) {
      return (
         <section className="h-dvh flex items-center justify-center">
            <Loader2 className="size-8 animate-spin" />
         </section>
      );
   } else {
      if (!authOnly) {
         return children;
      } else {
         if (authOnly === "reverse") {
            if (!data && !isLoggedIn) {
               return (
                  <MeContext.Provider value={"401"}>
                     {children}
                  </MeContext.Provider>
               );
            } else {
               return false;
            }
         } else {
            if (data && isLoggedIn) {
               return (
                  <MeContext.Provider value={data}>
                     {children}
                  </MeContext.Provider>
               );
            }
         }
      }
   }
}

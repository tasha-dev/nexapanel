// Codes by mahdi tasha
// Forcing next.js to render this component as client side
"use client";

// Importing part
import useLoggedIn from "@/hook/useLoggedIn";
import { GETMeType } from "@/type/api";
import { AuthProviderProps } from "@/type/component";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { createContext } from "react";

// Defining contexts
export const MeContext = createContext<GETMeType | undefined>(undefined);

// Creating and exporting AuthProvider component as default
export default function AuthProvider({
   children,
   authOnly = true,
}: AuthProviderProps) {
   // Defining hooks
   const { isLoading, isLoggedIn, data } = useLoggedIn(!authOnly && false);

   // Conditional rendering
   if (authOnly === "reverse") {
      if (isLoading) {
         return (
            <section className="h-dvh flex items-center justify-center">
               <Loader2 className="size-8 animate-spin" />
            </section>
         );
      } else {
         if (!data && !isLoggedIn) {
            return children;
         } else {
            redirect("/");
         }
      }
   } else if (authOnly) {
      if (isLoading) {
         return (
            <section className="h-dvh flex items-center justify-center">
               <Loader2 className="size-8 animate-spin" />
            </section>
         );
      } else {
         if (data && isLoggedIn) {
            return (
               <MeContext.Provider value={data}>{children}</MeContext.Provider>
            );
         } else {
            redirect("/");
         }
      }
   } else {
      return children;
   }
}

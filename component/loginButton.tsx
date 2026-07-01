// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import useLoggedIn from "@/hook/useLoggedIn";
import { Skeleton } from "./ui/skeleton";

// Creating and exporting LoginButton component as default
export default function LoginButton() {
   // Defining hooks
   const { isLoggedIn, isLoading, data } = useLoggedIn();

   // Conditional rendering
   if (isLoading) {
      return (
         <>
            <Skeleton className="h-9 w-20 rounded-md lg:block hidden" />
            <Skeleton className="size-9 rounded-md lg:hidden block" />
         </>
      );
   } else {
      if (data) {
         return (
            <>
               <Button asChild className="lg:flex hidden">
                  <Link href={isLoggedIn ? "/admin" : "/login"}>
                     <LogIn />
                     {isLoggedIn
                        ? `${data.firstName} ${data.lastName}`
                        : "Login"}
                  </Link>
               </Button>
               <Tooltip>
                  <TooltipTrigger>
                     <Button asChild className="lg:hidden flex" size={"icon"}>
                        <Link href={isLoggedIn ? "/admin" : "/login"}>
                           <LogIn />
                        </Link>
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                     {isLoggedIn
                        ? `${data.firstName} ${data.lastName}`
                        : "Login"}
                  </TooltipContent>
               </Tooltip>
            </>
         );
      } else {
         return (
            <>
               <Button asChild className="lg:flex hidden">
                  <Link href={"/login"}>
                     <LogIn />
                     Login
                  </Link>
               </Button>
               <Tooltip>
                  <TooltipTrigger>
                     <Button asChild className="lg:hidden flex" size={"icon"}>
                        <Link href={"/login"}>
                           <LogIn />
                        </Link>
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Login</TooltipContent>
               </Tooltip>
            </>
         );
      }
   }
}

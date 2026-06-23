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
   const { isLoggedIn, isLoading } = useLoggedIn();

   // Conditional rendering
   if (isLoading) {
      return (
         <>
            <Skeleton className="h-9 w-20 rounded-md lg:block hidden" />
            <Skeleton className="size-9 rounded-md lg:hidden block" />
         </>
      );
   } else {
      return (
         <>
            <Button asChild className="lg:flex hidden">
               <Link href={isLoggedIn ? "/dashboard" : "/login"}>
                  <LogIn />
                  {isLoggedIn ? "Dashboard" : "Login"}
               </Link>
            </Button>
            <Tooltip>
               <TooltipTrigger>
                  <Button asChild className="lg:hidden flex" size={"icon"}>
                     <Link href={isLoggedIn ? "/dashboard" : "/login"}>
                        <LogIn />
                     </Link>
                  </Button>
               </TooltipTrigger>
               <TooltipContent>
                  {isLoggedIn ? "Dashboard" : "Login"}
               </TooltipContent>
            </Tooltip>
         </>
      );
   }
}

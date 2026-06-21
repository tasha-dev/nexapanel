// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

// Creating and exporting LoginButton component as default
export default function LoginButton() {
   // Defining variables
   const isLoggedIn = false;

   // Returning JSX
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

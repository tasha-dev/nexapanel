// Codes by mahdi tasha
// Forcing next.js to render this component as client side
"use client";

// Importing part
import { AdminLayoutProps } from "@/type/component";
import AuthProvider from "./authProvider";
import { cn } from "@/lib/util";
import Header from "../header";
import Navbar from "../admin/navbar";
import { createContext, useState } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { AlignLeftIcon } from "lucide-react";

// Defining contexts
export const navbarContext = createContext<
   | {
        navbarOpened: boolean;
        setNavbarOpened: (value: boolean) => void;
     }
   | undefined
>(undefined);

// Creating and exporting AdminLayout component as default
export default function AdminLayout({ children, className }: AdminLayoutProps) {
   // Defining hooks
   const [navbarOpened, setNavbarOpened] = useState<boolean>(false);

   // Returning JSX
   return (
      <AuthProvider authOnly>
         <navbarContext.Provider
            value={{
               navbarOpened,
               setNavbarOpened,
            }}
         >
            <div
               className={cn(
                  "h-dvh flex flex-col gap-0 items-center justify-between w-full overflow-hidden",
                  className,
               )}
            >
               <Header />
               <div className="h-full overflow-hidden grid grid-cols-5 w-full">
                  <Navbar />
                  <div className="max-w-4xl p-4 mx-auto h-full w-full overflow-hidden col-span-4">
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Button
                              className="lg:hidden flex mb-4"
                              onClick={() => setNavbarOpened((prev) => !prev)}
                              size="icon"
                           >
                              <AlignLeftIcon />
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                           Open/Close navigation bar.
                        </TooltipContent>
                     </Tooltip>
                     {children}
                  </div>
               </div>
            </div>
         </navbarContext.Provider>
      </AuthProvider>
   );
}

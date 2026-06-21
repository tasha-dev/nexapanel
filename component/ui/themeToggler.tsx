// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { Button } from "@/component/ui/button";
import { ThemeTogglerProps } from "@/type/component";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

// Creating and exporting ThemeToggler component
export function ThemeToggler({
   size = "icon",
   variant = "default",
}: ThemeTogglerProps) {
   // Defining hooks
   const { theme, setTheme } = useTheme();

   // Returning JSX
   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Button
               size={size}
               variant={variant}
               onClick={() => {
                  if (theme === "dark") setTheme("light");
                  else setTheme("dark");
               }}
            >
               <SunMoon />
            </Button>
         </TooltipTrigger>
         <TooltipContent>Toggle theme</TooltipContent>
      </Tooltip>
   );
}

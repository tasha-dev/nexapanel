// Codes by mahdi tasha
// Importing part
import Github from "@/component/icon/github";
import { Button } from "@/component/ui/button";
import { ThemeToggler } from "@/component/ui/themeToggler";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/image/logo.png";
import LoginButton from "./loginButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import CartSheet from "./cart/cartSheet";

// Creating and exporting Header component as default
export default function Header() {
   // Returning JSX
   return (
      <header className="border-b border-b-foreground/10">
         <div className="max-w-4xl flex items-center justify-between mx-auto h-14 px-4">
            <Link href="/">
               <Image
                  src={Logo.src}
                  alt="NextPanel Logo"
                  width={100}
                  height={100}
                  className="size-9"
               />
            </Link>
            <div className="flex items-center justify-center gap-2">
               <ThemeToggler variant="outline" />
               <CartSheet />
               <Button variant={"outline"} asChild className="lg:flex hidden">
                  <Link href="https://github.com/tasha-dev" target="_blank">
                     <Github />
                     Github
                  </Link>
               </Button>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        variant={"outline"}
                        asChild
                        className="lg:hidden flex"
                        size={"icon"}
                     >
                        <Link href="https://github.com/tasha-dev">
                           <Github />
                        </Link>
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Github</TooltipContent>
               </Tooltip>
               <LoginButton />
            </div>
         </div>
      </header>
   );
}

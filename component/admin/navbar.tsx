// Codes by mahdi tasha
// Forcing next.js to render this component as client side
"use client";

// Importing part
import { ReactNode, useContext } from "react";
import { navbarContext } from "../layout/adminLayout";
import {
   CheckSquare,
   Home,
   LogOut,
   MessageCircleMore,
   Pen,
   Pizza,
   Quote,
   ShoppingCart,
   User,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

// Defining data of nav bar to render init
const data: {
   href: string;
   label: string;
   icon: ReactNode;
}[] = [
   {
      href: "/admin/users",
      label: "Users",
      icon: <User />,
   },
   {
      href: "/admin/carts",
      label: "Carts",
      icon: <ShoppingCart />,
   },
   {
      href: "/admin/products",
      label: "Products",
      icon: <ShoppingCart />,
   },
   {
      href: "/admin/recepies",
      label: "Recepies",
      icon: <Pizza />,
   },
   {
      href: "/admin/posts",
      label: "Posts",
      icon: <Pen />,
   },
   {
      href: "/admin/todos",
      label: "Todos",
      icon: <CheckSquare />,
   },
   {
      href: "/admin/quotes",
      label: "Quotes",
      icon: <Quote />,
   },
   {
      href: "/admin/comments",
      label: "Comments",
      icon: <MessageCircleMore />,
   },
];

// Creating and exporting Navbar component as default
export default function Navbar() {
   // Defining hooks
   const navbarState = useContext(navbarContext);

   // Returning JSX
   return (
      <>
         <div
            data-open={navbarState?.navbarOpened ?? false}
            className="lg:hidden block h-dvh z-40 w-dvw bg-foreground/5 fixed left-0 top-0 backdrop-blur-xl transition-all duration-500o lg:data-[data=true]:pointer-events-none lg:data-[data=false]:pointer-events-none data-[open=false]:pointer-events-none data-[open=false]:opacity-0 data-[open=true]:opacity-100 data-[open=true]:pointer-events-auto delay-300"
            onClick={() => navbarState?.setNavbarOpened(false)}
         />
         <nav
            data-open={navbarState?.navbarOpened ?? false}
            className="lg:h-full h-dvh border-r border-foreground/5 overflow-hidden lg:static fixed left-0 top-0 z-50 bg-background lg:transition-none transition-all lg:duration-0 duration-500 lg:data-[open=false]:w-auto lg:data-[open=true]:w-auto lg:data-[open=false]:visible lg:data-[open=true]:visible  data-[open=false]:invisible data-[open=false]:w-0 data-[open=true]:w-3/4 data-[open=true]:visible flex flex-col items-center justify-between"
         >
            <div className="w-full space-y-3 h-full overflow-auto p-4">
               <span className="text-base leading-normal font-medium block text-left">
                  Admin panel
               </span>
               {data.map((item, index) => (
                  <Button
                     asChild
                     key={index}
                     variant={"outline"}
                     className="w-full justify-start"
                  >
                     <Link href={item.href}>
                        {item.icon}
                        {item.label}
                     </Link>
                  </Button>
               ))}
            </div>
            <div className="p-4 w-full shrink-0 border-t border-t-foreground/5 flex flex-col">
               <Button asChild className="mb-3 w-full justify-start">
                  <Link href="/">
                     <Home />
                     Head home
                  </Link>
               </Button>
               <Button variant={"destructive"} className="w-full justify-start">
                  <LogOut />
                  Log out
               </Button>
            </div>
         </nav>
      </>
   );
}

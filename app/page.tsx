// Codes by mahdi tasha
// Importing part
import Header from "@/component/header";
import { Button } from "@/component/ui/button";
import {
   CheckSquare,
   MessageCircleMore,
   Pen,
   Pizza,
   Quote,
   ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

// Defining data to render usefull links
const data: {
   href: string;
   label: string;
   icon: ReactNode;
}[] = [
   {
      href: "/products",
      label: "Products",
      icon: <ShoppingCart />,
   },
   {
      href: "/recepies",
      label: "Recepies",
      icon: <Pizza />,
   },
   {
      href: "/posts",
      label: "Posts",
      icon: <Pen />,
   },
   {
      href: "/todos",
      label: "Todos",
      icon: <CheckSquare />,
   },
   {
      href: "/quotes",
      label: "Quotes",
      icon: <Quote />,
   },
   {
      href: "/comments",
      label: "Comments",
      icon: <MessageCircleMore />,
   },
];

// Creating and exporting Home page as default
export default function HomePage() {
   // Returning Jsx
   return (
      <>
         <Header />
         <section className="flex items-center justify-center min-h-[calc(100dvh-60px)]">
            <main className="prose prose-neutral dark:prose-invert max-w-lg w-full p-4">
               <h1 className="text-center mt-0 mb-3">NextPanel</h1>
               <p className="text-center mt-0 mb-6">
                  A modern admin dashboard built with <br /> Next.js,
                  TypeScript, and Tailwind CSS.
               </p>
               <div className="flex justify-center flex-wrap gap-2 items-center">
                  {data.map((item, index) => (
                     <Button asChild variant={"outline"} key={index}>
                        <Link href={item.href} className="no-underline">
                           {item.icon}
                           {item.label}
                        </Link>
                     </Button>
                  ))}
               </div>
            </main>
         </section>
      </>
   );
}

// Codes by mahdi tasha
// Importing part
import Header from "@/component/header";
import { Button } from "@/component/ui/button";
import { CheckSquare, Pen, Pizza, Quote, ShoppingCart } from "lucide-react";
import Link from "next/link";

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
                  <Button asChild variant={"outline"}>
                     <Link href="/products" className="no-underline">
                        <ShoppingCart />
                        Products
                     </Link>
                  </Button>
                  <Button asChild variant={"outline"}>
                     <Link href="/recepies" className="no-underline">
                        <Pizza />
                        Recepies
                     </Link>
                  </Button>
                  <Button asChild variant={"outline"}>
                     <Link href="/posts" className="no-underline">
                        <Pen />
                        Posts
                     </Link>
                  </Button>
                  <Button asChild variant={"outline"}>
                     <Link href="/todos" className="no-underline">
                        <CheckSquare />
                        Todos
                     </Link>
                  </Button>
                  <Button asChild variant={"outline"}>
                     <Link href="/quotes" className="no-underline">
                        <Quote />
                        Quotes
                     </Link>
                  </Button>
               </div>
            </main>
         </section>
      </>
   );
}

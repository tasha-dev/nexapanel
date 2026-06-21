// Codes by mahdi tasha
// Importing part
import Header from "@/component/header";
import { Button } from "@/component/ui/button";
import { Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

// Defining metadata
export const metadata: Metadata = {
   title: "Not Found",
};

// Creating and exporting NotFound page as default
export default function NotFoundPage() {
   // Returning Jsx
   return (
      <>
         <Header />
         <section className="flex items-center justify-center min-h-[calc(100dvh-60px)]">
            <main className="prose prose-neutral dark:prose-invert max-w-lg w-full p-4">
               <h1 className="text-center mt-0 mb-3">404</h1>
               <p className="text-center mt-0 mb-6">
                  The page you are looking for is not found!
               </p>
               <div className="flex justify-center flex-wrap gap-2 items-center">
                  <Button asChild variant={"outline"}>
                     <Link href="/products" className="no-underline">
                        <Home />
                        Head Home
                     </Link>
                  </Button>
               </div>
            </main>
         </section>
      </>
   );
}

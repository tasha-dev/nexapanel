// Codes by mahdi tasha
// Forcing next.js to render this page as client side
"use client";

// Importing part
import Header from "@/component/header";
import { Button } from "@/component/ui/button";
import { ErrorPageProps } from "@/type/page";
import { RefreshCcw } from "lucide-react";

// Creating and exporting Error page as default
export default function ErrorPage({ error, reset }: ErrorPageProps) {
   // Returning Jsx
   return (
      <>
         <Header />
         <section className="flex items-center justify-center min-h-[calc(100dvh-60px)]">
            <main className="prose prose-neutral dark:prose-invert max-w-lg w-full p-4">
               <h1 className="text-center mt-0 mb-3 text-destructive">Error</h1>
               <pre>
                  <p>{error.message}</p>
               </pre>
               <div className="flex justify-center flex-wrap gap-2 items-center">
                  <Button variant={"outline"} onClick={reset}>
                     <RefreshCcw />
                     Try again
                  </Button>
               </div>
            </main>
         </section>
      </>
   );
}

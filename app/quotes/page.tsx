// Codes by mahdi tasha
// Importing part
import Header from "@/component/header";
import type { Metadata } from "next";
import QuotesContainer from "@/component/container/quotesContainer";

// Defining metadata
export const metadata: Metadata = {
   title: "Quotes",
};

// Creating and exporting Quotes page as default
export default function Quotes() {
   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Quotes</h1>
            </div>
            <QuotesContainer />
         </section>
      </>
   );
}

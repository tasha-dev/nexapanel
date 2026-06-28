// Codes by mahdi tasha
// Importing part
import RecepiesContainer from "@/component/container/recepies/recepiesContainer";
import Header from "@/component/header";
import type { Metadata } from "next";

// Defining metadata
export const metadata: Metadata = {
   title: "Recepies",
};

// Creating and exporting RecepiesPage as default
export default function RecepiesPage() {
   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Recepies</h1>
            </div>
            <RecepiesContainer />
         </section>
      </>
   );
}

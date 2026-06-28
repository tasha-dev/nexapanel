// Codes by mahdi tasha
// Importing part
import TagRecepiesContainer from "@/component/container/recepies/tagRecepiesContainer";
import Header from "@/component/header";
import type { Metadata } from "next";

// Defining metadata
export const metadata: Metadata = {
   title: "Recipes of tag",
};

// Creating and exporting TagRecepiesPage as default
export default function TagRecepiesPage() {
   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Recipes of tag</h1>
            </div>
            <TagRecepiesContainer />
         </section>
      </>
   );
}

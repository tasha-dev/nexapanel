// Codes by mahdi tasha
// Importing part
import TagsContainer from "@/component/container/recepies/tagsContainer";
import Header from "@/component/header";
import type { Metadata } from "next";

// Defining metadata
export const metadata: Metadata = {
   title: "Recipe Tags",
};

// Creating and exporting Tags page as default
export default function Tags() {
   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Recipes Tags</h1>
            </div>
            <TagsContainer />
         </section>
      </>
   );
}

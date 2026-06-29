// Codes by mahdi tasha
// Importing part
import CategoryProductsContainer from "@/component/container/product/categoryProductsContainer";
import Header from "@/component/header";
import type { Metadata } from "next";

// Defining metadata
export const metadata: Metadata = {
   title: "Category Products",
};

// Creating and exporting CategoryProducts page as default
export default function CategoryProducts() {
   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Category Products</h1>
            </div>
            <CategoryProductsContainer />
         </section>
      </>
   );
}

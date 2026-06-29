// Codes by mahdi tasha
// Importing part
import ProductCategoriesContainer from "@/component/container/product/productCategoriesContainer";
import Header from "@/component/header";
import type { Metadata } from "next";

// Defining metadata
export const metadata: Metadata = {
   title: "Product Categories",
};

// Creating and exporting Categories page as default
export default function Categories() {
   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Product Categories</h1>
            </div>
            <ProductCategoriesContainer />
         </section>
      </>
   );
}

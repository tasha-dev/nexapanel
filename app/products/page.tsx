// Codes by mahdi tasha
// Importing part
import type { Metadata } from "next";
import ProductsContainer from "@/component/container/product/productsContainer";
import Header from "@/component/header";

// Defining metadata
export const metadata: Metadata = {
   title: "Products",
};

// Creating and exporting Products page as default
export default function Products() {
   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Products</h1>
            </div>
            <ProductsContainer />
         </section>
      </>
   );
}

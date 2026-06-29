// Codes by mahdi tasha
// Importing part
import CommentsContainer from "@/component/container/commentsContainer";
import Header from "@/component/header";
import type { Metadata } from "next";

// Defining metadata
export const metadata: Metadata = {
   title: "Comments",
};

// Creating and exporting Comments page as default
export default function Comments() {
   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Comments</h1>
            </div>
            <CommentsContainer />
         </section>
      </>
   );
}

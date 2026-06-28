// Codes by mahdi tasha
// Importing part
import TagPostsContainer from "@/component/container/post/tagPostsContainer";
import Header from "@/component/header";
import { Metadata } from "next";

// Defining metadata
export const metadata: Metadata = {
   title: "Posts of tag",
};

// Creating and exporting TagPostPage as default
export default function TagPostPage() {
   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Posts of tag</h1>
            </div>
            <TagPostsContainer />
         </section>
      </>
   );
}

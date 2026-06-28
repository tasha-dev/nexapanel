// Codes by mahdi tasha
// Importing part
import PostsContainer from "@/component/container/post/postsContainer";
import Header from "@/component/header";
import type { Metadata } from "next";

// Defining metadata
export const metadata: Metadata = {
   title: "Posts",
};

// Creating and exporting Posts page as default
export default function Posts() {
   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Posts</h1>
            </div>
            <PostsContainer />
         </section>
      </>
   );
}

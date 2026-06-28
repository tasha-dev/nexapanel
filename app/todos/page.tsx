// Codes by mahdi tasha
// Importing part
import TodosContainer from "@/component/container/todosContainer";
import Header from "@/component/header";
import type { Metadata } from "next";

// Defining metadata
export const metadata: Metadata = {
   title: "Todos",
};

// Creating and exporting Todos page as default
export default function Todos() {
   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Todos</h1>
            </div>
            <TodosContainer />
         </section>
      </>
   );
}

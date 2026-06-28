// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Header from "@/component/header";
import Pagination from "@/component/pagination";
import Product from "@/component/product/product";
import Todo from "@/component/todo";
import {
   Alert,
   AlertAction,
   AlertDescription,
   AlertTitle,
} from "@/component/ui/alert";
import { Button } from "@/component/ui/button";
import {
   Empty,
   EmptyDescription,
   EmptyHeader,
   EmptyMedia,
   EmptyTitle,
} from "@/component/ui/empty";
import { axiosInstance } from "@/lib/axios";
import { GETTodoType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";

// Creating and exporting Todos page as default
export default function Todos() {
   // Defining hooks
   const [skip, setSkip] = useState(0);
   const todos = useQuery<GETTodoType>({
      queryKey: ["todos", skip],
      queryFn: async () => {
         const data = await axiosInstance.get(`/todos?skip=${skip}&limit=9`);
         return data.data;
      },
   });

   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Todos</h1>
            </div>
            <main>
               {todos.isPending ? (
                  <div className="h-[500px] flex items-center justify-center">
                     <Loader2 className="size-8 animate-spin" />
                  </div>
               ) : todos.isError ? (
                  <Alert variant={"destructive"}>
                     <AlertTitle>Error</AlertTitle>
                     <AlertDescription>
                        There was an error while trying to fetch the Todos.
                     </AlertDescription>
                     <AlertAction>
                        <Button onClick={() => todos.refetch()}>
                           Try again
                        </Button>
                     </AlertAction>
                  </Alert>
               ) : !todos.isPending && !todos.isError && todos.data ? (
                  todos.data.total === 0 ? (
                     <Empty>
                        <EmptyHeader>
                           <EmptyMedia>
                              <ShoppingCart />
                           </EmptyMedia>
                           <EmptyTitle>Nothing to show</EmptyTitle>
                           <EmptyDescription>
                              The list is empty and there is nothing to show !
                           </EmptyDescription>
                        </EmptyHeader>
                     </Empty>
                  ) : (
                     <>
                        {todos.isRefetching ? (
                           <div className="h-[500px] flex items-center justify-center">
                              <Loader2 className="size-8 animate-spin" />
                           </div>
                        ) : (
                           <>
                              <div className="grid lg:grid-cols-3 gap-5 mb-10 align-items-center">
                                 {todos.data.todos.map((item, index) => (
                                    <Todo data={item} key={index} />
                                 ))}
                              </div>
                           </>
                        )}
                        <Pagination
                           total={todos.data.total}
                           skip={todos.data.skip}
                           limit={todos.data.limit}
                           onPageChange={(page) => {
                              setSkip(page);
                           }}
                        />
                     </>
                  )
               ) : (
                  false
               )}
            </main>
         </section>
      </>
   );
}

// Codes by mahdi tasha
// Forcing next.js to render this compoent as client side
"use client";

// Importing part
import Pagination from "@/component/pagination";
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

// Creating and exporting TodosContainer component as default
export default function TodosContainer() {
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
                  <Button onClick={() => todos.refetch()}>Try again</Button>
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
   );
}

// Codes by mahdi tasha
// Importing part
// Forcing next.js to rende this page as client side
"use client";

import Header from "@/component/header";
import Pagination from "@/component/pagination";
import Recpie from "@/component/recepie";
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
import { GETRecipeType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Pizza } from "lucide-react";
import { useState } from "react";

// Creating and exporting RecepiesPage as default
export default function RecepiesPage() {
   // Defining hooks
   const [skip, setSkip] = useState(0);
   const recepies = useQuery<GETRecipeType>({
      queryKey: ["recepies", skip],
      queryFn: async () => {
         const data = await axiosInstance.get(`/recipes?skip=${skip}&limit=9`);

         return data.data;
      },
   });

   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Recepies</h1>
            </div>
            <main>
               {recepies.isPending ? (
                  <div className="h-[500px] flex items-center justify-center">
                     <Loader2 className="size-8 animate-spin" />
                  </div>
               ) : recepies.isError ? (
                  <Alert variant={"destructive"}>
                     <AlertTitle>Error</AlertTitle>
                     <AlertDescription>
                        There was an error while trying to fetch the recepies.
                     </AlertDescription>
                     <AlertAction>
                        <Button onClick={() => recepies.refetch()}>
                           Try again
                        </Button>
                     </AlertAction>
                  </Alert>
               ) : !recepies.isPending && !recepies.isError && recepies.data ? (
                  recepies.data.total === 0 ? (
                     <Empty>
                        <EmptyHeader>
                           <EmptyMedia>
                              <Pizza />
                           </EmptyMedia>
                           <EmptyTitle>Nothing to show</EmptyTitle>
                           <EmptyDescription>
                              The list is empty and there is nothing to show !
                           </EmptyDescription>
                        </EmptyHeader>
                     </Empty>
                  ) : (
                     <>
                        {recepies.isRefetching ? (
                           <div className="h-[500px] flex items-center justify-center">
                              <Loader2 className="size-8 animate-spin" />
                           </div>
                        ) : (
                           <>
                              <div className="grid lg:grid-cols-3 gap-5 mb-10 align-items-center">
                                 {recepies.data.recipes.map((item, index) => (
                                    <Recpie data={item} key={index} />
                                 ))}
                              </div>
                           </>
                        )}
                        <Pagination
                           total={recepies.data.total}
                           skip={recepies.data.skip}
                           limit={recepies.data.limit}
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

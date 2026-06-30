// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Pagination from "@/component/pagination";
import Quote from "@/component/quote";
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
import { GETQuoteType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2, LucideQuote } from "lucide-react";
import { useState } from "react";

// Creating and exporting QuotesContainer component as default
export default function QuotesContainer() {
   // Defining hooks
   const [skip, setSkip] = useState(0);
   const quotes = useQuery<GETQuoteType>({
      queryKey: ["quotes", skip],
      queryFn: async () => {
         const data = await axiosInstance.get(`/quotes?skip=${skip}&limit=9`);
         return data.data;
      },
   });

   // Returning JSX
   return (
      <main>
         {quotes.isPending ? (
            <div className="h-[500px] flex items-center justify-center">
               <Loader2 className="size-8 animate-spin" />
            </div>
         ) : quotes.isError ? (
            <Alert variant={"destructive"}>
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>
                  There was an error while trying to fetch the Quotes.
               </AlertDescription>
               <AlertAction>
                  <Button onClick={() => quotes.refetch()}>Try again</Button>
               </AlertAction>
            </Alert>
         ) : !quotes.isPending && !quotes.isError && quotes.data ? (
            quotes.data.total === 0 ? (
               <Empty>
                  <EmptyHeader>
                     <EmptyMedia variant={"icon"}>
                        <LucideQuote />
                     </EmptyMedia>
                     <EmptyTitle>Nothing to show</EmptyTitle>
                     <EmptyDescription>
                        The list is empty and there is nothing to show !
                     </EmptyDescription>
                  </EmptyHeader>
               </Empty>
            ) : (
               <>
                  {quotes.isRefetching ? (
                     <div className="h-[500px] flex items-center justify-center">
                        <Loader2 className="size-8 animate-spin" />
                     </div>
                  ) : (
                     <>
                        <div className="grid lg:grid-cols-3 gap-5 mb-10 align-items-center">
                           {quotes.data.quotes.map((item, index) => (
                              <Quote data={item} key={index} />
                           ))}
                        </div>
                     </>
                  )}
                  <Pagination
                     total={quotes.data.total}
                     skip={quotes.data.skip}
                     limit={quotes.data.limit}
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

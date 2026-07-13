// Codes by mahdi tasha
// Forcing next.js to treat this as a client component
"use client";

// Importing part
import { axiosInstance } from "@/lib/axios";
import { GETQuoteType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { Quote as LucidQuote, Loader2 } from "lucide-react";
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
import { useState } from "react";
import Pagination from "@/component/pagination";
import {
   Table,
   TableBody,
   TableCell,
   TableHeader,
   TableRow,
} from "@/component/ui/table";

// Creating and exporting QuotesContainer component as default
export default function QuotesContainer() {
   // Defining hooks
   const [skip, setSkip] = useState(0);
   const quotesQuery = useQuery<GETQuoteType>({
      queryKey: ["quotes", skip],
      queryFn: async () => {
         const response = await axiosInstance.get(
            `/quotes?limit=20&skip=${skip}`,
         );
         return response.data;
      },
   });

   // Returning JSX
   return (
      <div className="relative">
         {quotesQuery.isPending ? (
            <div className="h-[500px] flex items-center justify-center">
               <Loader2 className="size-8 animate-spin" />
            </div>
         ) : quotesQuery.isError ? (
            <Alert variant={"destructive"}>
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>
                  There was an error while trying to fetch the quotes.
               </AlertDescription>
               <AlertAction>
                  <Button onClick={() => quotesQuery.refetch()}>
                     Try again
                  </Button>
               </AlertAction>
            </Alert>
         ) : !quotesQuery.isPending &&
           !quotesQuery.isError &&
           quotesQuery.data ? (
            quotesQuery.data.total === 0 ? (
               <Empty>
                  <EmptyHeader>
                     <EmptyMedia variant={"icon"}>
                        <LucidQuote />
                     </EmptyMedia>
                     <EmptyTitle>Nothing to show</EmptyTitle>
                     <EmptyDescription>
                        The list is empty and there is nothing to show !
                     </EmptyDescription>
                  </EmptyHeader>
               </Empty>
            ) : (
               <div className="space-y-4">
                  {quotesQuery.isRefetching ? (
                     <div className="h-[500px] flex items-center justify-center">
                        <Loader2 className="size-8 animate-spin" />
                     </div>
                  ) : (
                     <Table>
                        <TableHeader>
                           <TableRow>
                              <TableCell>Id</TableCell>
                              <TableCell>Author</TableCell>
                              <TableCell>Quote</TableCell>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {quotesQuery.data.quotes.map((item, index) => (
                              <TableRow key={index}>
                                 <TableCell>{item.id}</TableCell>
                                 <TableCell>{item.author}</TableCell>
                                 <TableCell>{item.quote}</TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  )}
                  <Pagination
                     total={quotesQuery.data.total}
                     skip={quotesQuery.data.skip}
                     limit={quotesQuery.data.limit}
                     onPageChange={(page) => {
                        setSkip(page);
                     }}
                  />
               </div>
            )
         ) : (
            false
         )}
      </div>
   );
}

// Codes by mahdi tasha
// Forcing next.js to treat this as a client component
"use client";

// Importing part
import { axiosInstance } from "@/lib/axios";
import { GETUsersType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2, LucideQuote } from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import {
   Empty,
   EmptyDescription,
   EmptyHeader,
   EmptyMedia,
   EmptyTitle,
} from "../ui/empty";
import { useState } from "react";
import Pagination from "../pagination";

// Creating and exporting UsersContainer component as default
export default function UsersContainer() {
   // Defining hooks
   const [skip, setSkip] = useState(0);
   const usersQuery = useQuery<GETUsersType>({
      queryKey: ["users", skip],
      queryFn: async () => {
         const response = await axiosInstance.get(
            `/users?limit=10&skip=${skip}`,
         );
         return response.data;
      },
   });

   // Returning JSX
   return (
      <>
         {usersQuery.isPending ? (
            <div className="h-[500px] flex items-center justify-center">
               <Loader2 className="size-8 animate-spin" />
            </div>
         ) : usersQuery.isError ? (
            <Alert variant={"destructive"}>
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>
                  There was an error while trying to fetch the Quotes.
               </AlertDescription>
               <AlertAction>
                  <Button onClick={() => usersQuery.refetch()}>
                     Try again
                  </Button>
               </AlertAction>
            </Alert>
         ) : !usersQuery.isPending && !usersQuery.isError && usersQuery.data ? (
            usersQuery.data.total === 0 ? (
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
                  {usersQuery.isRefetching ? (
                     <div className="h-[500px] flex items-center justify-center">
                        <Loader2 className="size-8 animate-spin" />
                     </div>
                  ) : (
                     <>
                        <pre>
                           <p>
                              {JSON.stringify(usersQuery.data.users, null, 2)}
                           </p>
                        </pre>
                     </>
                  )}
                  <Pagination
                     total={usersQuery.data.total}
                     skip={usersQuery.data.skip}
                     limit={usersQuery.data.limit}
                     onPageChange={(page) => {
                        setSkip(page);
                     }}
                  />
               </>
            )
         ) : (
            false
         )}
      </>
   );
}

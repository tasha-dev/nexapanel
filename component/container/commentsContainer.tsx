// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Comment from "@/component/comment";
import Pagination from "@/component/pagination";
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
import { GETCommentsType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";

// Creating and exporting CommentsContainer component as default
export default function CommentsContainer() {
   // Defining hooks
   const [skip, setSkip] = useState(0);
   const comments = useQuery<GETCommentsType>({
      queryKey: ["comments", skip],
      queryFn: async () => {
         const data = await axiosInstance.get(`/comments?skip=${skip}&limit=9`);
         return data.data;
      },
   });

   // Returning JSX
   return (
      <main>
         {comments.isPending ? (
            <div className="h-[500px] flex items-center justify-center">
               <Loader2 className="size-8 animate-spin" />
            </div>
         ) : comments.isError ? (
            <Alert variant={"destructive"}>
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>
                  There was an error while trying to fetch the Comments.
               </AlertDescription>
               <AlertAction>
                  <Button onClick={() => comments.refetch()}>Try again</Button>
               </AlertAction>
            </Alert>
         ) : !comments.isPending && !comments.isError && comments.data ? (
            comments.data.total === 0 ? (
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
                  {comments.isRefetching ? (
                     <div className="h-[500px] flex items-center justify-center">
                        <Loader2 className="size-8 animate-spin" />
                     </div>
                  ) : (
                     <>
                        <div className="grid lg:grid-cols-3 gap-5 mb-10 align-items-center">
                           {comments.data.comments.map((item, index) => (
                              <Comment data={item} key={index} />
                           ))}
                        </div>
                     </>
                  )}
                  <Pagination
                     total={comments.data.total}
                     skip={comments.data.skip}
                     limit={comments.data.limit}
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

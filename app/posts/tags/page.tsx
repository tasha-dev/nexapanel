// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Header from "@/component/header";
import {
   Alert,
   AlertAction,
   AlertDescription,
   AlertTitle,
} from "@/component/ui/alert";
import { Badge } from "@/component/ui/badge";
import { Button } from "@/component/ui/button";
import {
   Empty,
   EmptyDescription,
   EmptyHeader,
   EmptyMedia,
   EmptyTitle,
} from "@/component/ui/empty";
import { axiosInstance } from "@/lib/axios";
import { GETPostsTags } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { Hash, Loader2, Pen } from "lucide-react";
import Link from "next/link";

// Creating and exporting Tags page as default
export default function Tags() {
   // Defining hooks
   const tags = useQuery<GETPostsTags>({
      queryKey: ["recpie-tags"],
      queryFn: async () => {
         const data = await axiosInstance.get("/posts/tags");
         return data.data;
      },
   });

   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Post Tags</h1>
            </div>
            <main>
               {tags.isPending ? (
                  <div className="h-[500px] flex items-center justify-center">
                     <Loader2 className="size-8 animate-spin" />
                  </div>
               ) : tags.isError ? (
                  <Alert variant={"destructive"}>
                     <AlertTitle>Error</AlertTitle>
                     <AlertDescription>
                        There was an error while trying to fetch the Tags.
                     </AlertDescription>
                     <AlertAction>
                        <Button onClick={() => tags.refetch()}>
                           Try again
                        </Button>
                     </AlertAction>
                  </Alert>
               ) : !tags.isPending && !tags.isError && tags.data ? (
                  tags.data.length === 0 ? (
                     <Empty>
                        <EmptyHeader>
                           <EmptyMedia>
                              <Pen />
                           </EmptyMedia>
                           <EmptyTitle>Nothing to show</EmptyTitle>
                           <EmptyDescription>
                              The list is empty and there is nothing to show !
                           </EmptyDescription>
                        </EmptyHeader>
                     </Empty>
                  ) : (
                     <>
                        <div className="flex flex-wrap gap-2">
                           {tags.data.map((item, index) => (
                              <Badge asChild key={index}>
                                 <Link href={`/posts/tags/${item.slug}`}>
                                    <Hash />
                                    {item.name}
                                 </Link>
                              </Badge>
                           ))}
                        </div>
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

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
import { GETCategoriesType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ShoppingCart, Tag } from "lucide-react";
import Link from "next/link";

// Creating and exporting Categories page as default
export default function Categories() {
   // Defining hooks
   const categories = useQuery<GETCategoriesType>({
      queryKey: ["categories"],
      queryFn: async () => {
         const data = await axiosInstance.get("/products/categories");
         return data.data;
      },
   });

   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Categories</h1>
            </div>
            <main>
               {categories.isPending ? (
                  <div className="h-[500px] flex items-center justify-center">
                     <Loader2 className="size-8 animate-spin" />
                  </div>
               ) : categories.isError ? (
                  <Alert variant={"destructive"}>
                     <AlertTitle>Error</AlertTitle>
                     <AlertDescription>
                        There was an error while trying to fetch the Categories.
                     </AlertDescription>
                     <AlertAction>
                        <Button onClick={() => categories.refetch()}>
                           Try again
                        </Button>
                     </AlertAction>
                  </Alert>
               ) : !categories.isPending &&
                 !categories.isError &&
                 categories.data ? (
                  categories.data.length === 0 ? (
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
                        <div className="flex flex-wrap gap-2">
                           {categories.data.map((item, index) => (
                              <Badge asChild key={index}>
                                 <Link href={`/category/${item.slug}`}>
                                    <Tag />
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

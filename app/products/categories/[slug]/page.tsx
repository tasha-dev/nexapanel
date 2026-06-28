// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Header from "@/component/header";
import Pagination from "@/component/pagination";
import Product from "@/component/product/product";
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
import { GETProductType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

// Creating and exporting CategoryProducts page as default
export default function CategoryProducts() {
   // Defining hooks
   const params = useParams<{ slug: string }>();
   const [skip, setSkip] = useState(0);
   const products = useQuery<GETProductType>({
      queryKey: ["category-products", skip],
      queryFn: async () => {
         const data = await axiosInstance.get(
            `/products/category/${params.slug}/?skip=${skip}&limit=9`,
         );
         return data.data;
      },
   });

   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>{params.slug} Products</h1>
            </div>
            <main>
               {products.isPending ? (
                  <div className="h-[500px] flex items-center justify-center">
                     <Loader2 className="size-8 animate-spin" />
                  </div>
               ) : products.isError ? (
                  <Alert variant={"destructive"}>
                     <AlertTitle>Error</AlertTitle>
                     <AlertDescription>
                        There was an error while trying to fetch the products.
                     </AlertDescription>
                     <AlertAction>
                        <Button onClick={() => products.refetch()}>
                           Try again
                        </Button>
                     </AlertAction>
                  </Alert>
               ) : !products.isPending && !products.isError && products.data ? (
                  products.data.total === 0 ? (
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
                        {products.isRefetching ? (
                           <div className="h-[500px] flex items-center justify-center">
                              <Loader2 className="size-8 animate-spin" />
                           </div>
                        ) : (
                           <>
                              <div className="grid lg:grid-cols-3 gap-5 mb-10 align-items-center">
                                 {products.data.products.map((item, index) => (
                                    <Product data={item} key={index} />
                                 ))}
                              </div>
                           </>
                        )}
                        <Pagination
                           total={products.data.total}
                           skip={products.data.skip}
                           limit={products.data.limit}
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

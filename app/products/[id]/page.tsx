// Codes by mahdi tasha
// https://dummyjson.com/
// Forcing next.js to render this component as client side component
"use client";

import Header from "@/component/header";
import {
   Alert,
   AlertAction,
   AlertDescription,
   AlertTitle,
} from "@/component/ui/alert";
import { Badge } from "@/component/ui/badge";
import { Button } from "@/component/ui/button";
import { Card } from "@/component/ui/card";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/component/ui/carousel";
import { axiosInstance } from "@/lib/axios";
import { Product } from "@/type/general";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

// Creating and exporting Single Product page as default
export default function SingleProduct() {
   // Defining hooks
   const params = useParams<{ id: string }>();
   const product = useQuery<Product>({
      queryKey: ["product", params.id],
      queryFn: async () => {
         const data = await axiosInstance.get(`/products/${params.id}`);
         return data.data;
      },
   });

   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto lg:pb-4 pb-20">
            <main>
               {product.isPending ? (
                  <div className="h-[500px] flex items-center justify-center">
                     <Loader2 className="size-8 animate-spin" />
                  </div>
               ) : product.isError ? (
                  <Alert variant={"destructive"}>
                     <AlertTitle>Error</AlertTitle>
                     <AlertDescription>
                        There was an error while trying to fetch the products.
                     </AlertDescription>
                     <AlertAction>
                        <Button onClick={() => product.refetch()}>
                           Try again
                        </Button>
                     </AlertAction>
                  </Alert>
               ) : !product.isPending && !product.isError && product.data ? (
                  <>
                     <div className="grid lg:grid-cols-6 gap-4 mb-10">
                        <Carousel className="lg:col-span-2">
                           <CarouselContent className="flex">
                              {product.data.images.map((item, index) => (
                                 <CarouselItem key={index}>
                                    <Card className="flex items-center justify-center overflow-hidden lg:h-[293px]">
                                       <Image
                                          alt={product.data.title}
                                          src={item}
                                          width={100}
                                          height={100}
                                          className="h-auto w-3/4"
                                       />
                                    </Card>
                                 </CarouselItem>
                              ))}
                           </CarouselContent>
                        </Carousel>
                        <div className="prose dark:prose-invert prose-neutral lg:col-span-4 w-full max-w-full">
                           <h1 className="truncate mt-0 mb-3">
                              {product.data.title}
                           </h1>
                           <h2 className="mt-0 mb-4">{product.data.price}$</h2>
                           <ul className="mt-0">
                              <li>
                                 Discount : {product.data.discountPercentage}
                              </li>
                              <li>Rating : {product.data.rating}</li>
                              <li>Stock : {product.data.stock}</li>
                              <li>Brand : {product.data.brand}</li>
                           </ul>
                           <div
                              className="lg:bg-transparent bg-foreground/5 lg:static fixed bottom-0 left-0 w-full lg:p-0 p-4 lg:border-t-0 border-t border-foreground/10 lg:backdrop-blur-none backdrop-blur-2xl z-20
                              "
                           >
                              <Button className="lg:w-auto w-full">
                                 <ShoppingCart />
                                 Add To Cart
                              </Button>
                           </div>
                        </div>
                     </div>
                     <div className="prose dark:prose-invert prose-neutral w-full max-w-full">
                        <p>{product.data.description}</p>
                        <h4>Infomation :</h4>
                        <ul className="mt-0">
                           <li>Discount : {product.data.discountPercentage}</li>
                           <li>Rating : {product.data.rating}</li>
                           <li>Stock : {product.data.stock}</li>
                           <li>Brand : {product.data.brand}</li>
                           <li>Stock : {product.data.stock}</li>
                           <li>weight: {product.data.weight}</li>
                           <li>
                              Dimensions : {product.data.dimensions.width} *{" "}
                              {product.data.dimensions.height} *{" "}
                              {product.data.dimensions.depth}
                           </li>
                        </ul>
                     </div>
                  </>
               ) : (
                  false
               )}
            </main>
         </section>
      </>
   );
}

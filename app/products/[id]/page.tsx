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
} from "@/component/ui/carousel";
import { axiosInstance } from "@/lib/axios";
import { Product } from "@/type/general";
import { useQuery } from "@tanstack/react-query";
import { Hash, Heading4, Loader2, ShoppingCart, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import moment from "moment";
import ProductReview from "@/component/product/productReview";

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
                           <div className="lg:bg-transparent bg-foreground/5 lg:static fixed bottom-0 left-0 w-full lg:p-0 p-4 lg:border-t-0 border-t border-foreground/10 lg:backdrop-blur-none backdrop-blur-2xl z-20">
                              <Button className="lg:w-auto w-full">
                                 <ShoppingCart />
                                 Add To Cart
                              </Button>
                           </div>
                        </div>
                     </div>
                     <Badge asChild className="mb-4">
                        <Link href={`/categories/${product.data.category}`}>
                           <Tag />
                           {product.data.category}
                        </Link>
                     </Badge>
                     <div className="prose dark:prose-invert prose-neutral w-full max-w-full">
                        <p>{product.data.description}</p>
                        <h4>Infomation :</h4>
                        <ul className="mt-0">
                           <li>
                              Last updated at :{" "}
                              {moment(product.data.meta.updatedAt).format(
                                 "YYYY/MM/DD HH:mm",
                              )}
                           </li>
                           <li>
                              Availibilty : {product.data.availabilityStatus}
                           </li>
                           <li>Discount : {product.data.discountPercentage}</li>
                           <li>Rating : {product.data.rating}</li>
                           <li>Stock : {product.data.stock}</li>
                           <li>Brand : {product.data.brand}</li>
                           <li>Stock : {product.data.stock}</li>
                           <li>weight: {product.data.weight}</li>
                           <li>
                              Minimum Order Quantity :{" "}
                              {product.data.minimumOrderQuantity}
                           </li>
                           <li>
                              Dimensions : {product.data.dimensions.width} *{" "}
                              {product.data.dimensions.height} *{" "}
                              {product.data.dimensions.depth}
                           </li>
                        </ul>
                        <h4>Warrany Information :</h4>
                        <p>{product.data.warrantyInformation}</p>
                        <h4>Shipping Information:</h4>
                        <p>{product.data.shippingInformation}</p>
                        <h4>Return Policy:</h4>
                        <p>{product.data.returnPolicy}</p>
                     </div>
                     <div className="mt-4 flex flex-wrap gap-3 mb-6">
                        {product.data.tags.map((tag, index) => (
                           <Badge key={index}>
                              <Hash />
                              {tag}
                           </Badge>
                        ))}
                     </div>
                     <hr />
                     {product.data.reviews.length !== 0 && (
                        <div className="flex flex-col gap-4 pt-8">
                           <h4 className="mb-2 leading-1.5 font-semibold block text-forground text-xl">
                              Reviews
                           </h4>
                           {product.data.reviews.map((item, index) => (
                              <ProductReview data={item} key={index} />
                           ))}
                           <hr />
                        </div>
                     )}
                     <Link
                        href={product.data.meta.qrCode}
                        target="_blank"
                        className="inline-block mt-4 border border-border rounded-md cursor-pointer overflow-hidden transition-all duration-300 active:scale-95"
                     >
                        <Image
                           src={product.data.meta.qrCode}
                           alt={"Qr CODE"}
                           width={100}
                           height={100}
                           className="size-auto"
                        />
                     </Link>
                  </>
               ) : (
                  false
               )}
            </main>
         </section>
      </>
   );
}

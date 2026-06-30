// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { AddToCartButtonProps } from "@/type/component";
import { cn } from "@/lib/util";
import { Button, buttonVariants } from "../ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import useLoggedIn from "@/hook/useLoggedIn";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import cartStore from "@/store/cart";
import { toast } from "sonner";

// Creating and exporting AddToCartButton component as default
export default function AddToCartButton({
   className,
   variant = "default",
   product,
}: AddToCartButtonProps) {
   // Defining hooks
   const { addProduct, cart, updateQuantity, removeProduct } = cartStore();

   const { data, isLoggedIn, isLoading } = useLoggedIn();
   const router = useRouter();

   // Defining variables
   const productInCart = cart.find((item) => item.id === product.id);

   // Conditional rendering
   if (isLoading) {
      return <Skeleton className={cn("h-9 min-w-[200px]", className)} />;
   } else {
      if (!!productInCart) {
         return (
            <div
               className={cn(
                  "min-w-[200px] flex items-center justify-center overflow-hidden",
                  buttonVariants({
                     size: "default",
                     variant,
                     className,
                  }),
               )}
            >
               <button
                  className="h-9 flex items-center justify-center shrink-0"
                  onClick={() => {
                     const quantityToSet = productInCart.quantity - 1;

                     quantityToSet >= 1
                        ? updateQuantity(product.id, quantityToSet)
                        : removeProduct(product.id);
                  }}
               >
                  <Minus />
               </button>
               <div className="flex-1 flex items-center justify-center">
                  <span className="block text-sm font-normal trunacte">
                     {productInCart.quantity}
                  </span>
               </div>
               <button
                  className="h-9 flex items-center justify-center shrink-0"
                  onClick={() => {
                     const quantityToSet = productInCart.quantity + 1;

                     quantityToSet < product.stock
                        ? updateQuantity(product.id, quantityToSet)
                        : toast.error(
                             "The quantity of this product is more than the stock of it",
                          );
                  }}
               >
                  <Plus />
               </button>
            </div>
         );
      } else {
         return (
            <Button
               variant={variant}
               className={cn("w-full", className)}
               onClick={() => {
                  if (isLoggedIn && data) {
                     addProduct({
                        discountPercentage: product.discountPercentage,
                        id: product.id,
                        price: product.price,
                        quantity: 1,
                        thumbnail: product.thumbnail,
                        title: product.title,
                     });
                  } else {
                     router.push(`/login?redirectToPrev=true`);
                  }
               }}
            >
               <ShoppingCart />
               Add To cart
            </Button>
         );
      }
   }
}

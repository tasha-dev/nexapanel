// Codes by mahdi tasha
// Forcing next.js to render this component as client side
"use client";

// Importing part
import cartStore from "@/store/cart";
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/component/ui/sheet";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/component/ui/tooltip";
import { Button } from "@/component/ui/button";
import { Loader2, ShoppingCart, Trash } from "lucide-react";
import {
   Empty,
   EmptyDescription,
   EmptyHeader,
   EmptyMedia,
   EmptyTitle,
} from "@/component/ui/empty";
import CartItem from "./cartItem";
import { toast } from "sonner";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import useLoggedIn from "@/hook/useLoggedIn";
import { GETCart } from "@/type/api";
import { Cart } from "@/type/general";
import { formatCurrency } from "@/lib/util";

// Creating and exporting CartSheet component as default
export default function CartSheet() {
   // Defining hooks
   const { cart, clearCart, setCart } = cartStore();
   const { data, isLoggedIn } = useLoggedIn();
   const cartMutation = useMutation({
      mutationFn: ({
         userId,
         products,
      }: {
         userId: number;
         products: {
            id: number;
            quantity: number;
         }[];
      }) => axiosInstance.post("/carts/add", { userId, products }),
   });

   const userCartQuery = useQuery<GETCart>({
      queryKey: ["my-cart", data?.id],
      queryFn: async () => {
         const response = await axiosInstance.get(`/carts/user/${data!.id}`);
         return response.data;
      },
      enabled: Boolean(data?.id && isLoggedIn),
      refetchInterval: Infinity,
      gcTime: Infinity,
   });

   // Using useEffect to set cart items when user auth check is happened
   useEffect(() => {
      if (
         data &&
         !userCartQuery.isLoading &&
         !userCartQuery.isError &&
         userCartQuery.data
      ) {
         const products = userCartQuery.data.carts?.[0]?.products ?? [];
         const mappedProducts: Cart[] = products.map((item) => {
            return {
               discountPercentage: item.discountPercentage,
               id: item.id,
               price: item.price,
               quantity: item.quantity,
               thumbnail: item.thumbnail,
               title: item.title,
            };
         });

         setCart(mappedProducts);
      }
   }, [
      userCartQuery.isLoading,
      userCartQuery.isError,
      userCartQuery.data,
      data,
      setCart,
   ]);

   // Using useEffect to debug the issue of zustand
   // useEffect(() => {
   //    console.log(`✅ CartSheet : Cart : ${cart}, CartLenght :${cart.length}`);
   // }, [cart]);

   // Defining variables
   const total = cart.reduce((sum, item) => {
      return sum + item.price * (item.quantity || 1);
   }, 0);

   // Returning JSX
   return (
      <Sheet>
         <SheetTrigger>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button size="icon" variant="outline" className="relative">
                     <ShoppingCart />
                  </Button>
               </TooltipTrigger>
               <TooltipContent>Shopping cart</TooltipContent>
            </Tooltip>
         </SheetTrigger>
         <SheetContent className="h-dvh flex flex-col">
            <SheetHeader className="shrink-0">
               <SheetTitle>Shopping cart</SheetTitle>
               <SheetDescription>
                  Products you want to order are shown here.
               </SheetDescription>
            </SheetHeader>
            <div className="p-4 h-full overflow-auto">
               {cart.length === 0 ? (
                  <Empty>
                     <EmptyHeader>
                        <EmptyMedia variant={"icon"}>
                           <ShoppingCart />
                        </EmptyMedia>
                        <EmptyTitle>Nothing to show</EmptyTitle>
                        <EmptyDescription>
                           The list is empty and there is nothing to show !
                        </EmptyDescription>
                     </EmptyHeader>
                  </Empty>
               ) : (
                  <div className="space-y-4">
                     {cart.map((item, index) => (
                        <CartItem
                           data={item}
                           key={`cart-${index}-${item.title}-${item.id}`}
                        />
                     ))}
                  </div>
               )}
            </div>
            {cart.length !== 0 && (
               <SheetFooter className="shrink-0">
                  <p className="cn-font-heading text-base font-medium text-foreground">
                     Total :{" "}
                     <span className="text-sm/relaxed text-muted-foreground">
                        {formatCurrency(total)}
                     </span>
                  </p>
                  <Button
                     disabled={cartMutation.isPending}
                     onClick={async () => {
                        if (isLoggedIn && data) {
                           try {
                              const mappedArray = cart.map((item) => {
                                 return {
                                    id: item.id,
                                    quantity: item.quantity,
                                 };
                              });

                              await cartMutation.mutateAsync({
                                 products: mappedArray,
                                 userId: data.id,
                              });

                              toast.success(
                                 "The cart has been successfully added.",
                              );
                           } catch {
                              toast.error(
                                 "There was an issue while trying to add cart.",
                              );
                           }
                        }
                     }}
                  >
                     {cartMutation.isPending ? (
                        <Loader2 className="animate-spin" />
                     ) : (
                        <ShoppingCart />
                     )}
                     Add
                  </Button>
                  <Button
                     variant={"destructive"}
                     onClick={() => {
                        clearCart();
                        toast.success("Your cart is empty now.");
                     }}
                  >
                     <Trash />
                     Clear Cart
                  </Button>
               </SheetFooter>
            )}
         </SheetContent>
      </Sheet>
   );
}

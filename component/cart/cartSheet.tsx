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
import { ShoppingCart } from "lucide-react";
import {
   Empty,
   EmptyDescription,
   EmptyHeader,
   EmptyMedia,
   EmptyTitle,
} from "@/component/ui/empty";
import CartItem from "./cartItem";
import { toast } from "sonner";
import { useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { MeContext } from "../layout/authProvider";

// Creating and exporting CartSheet component as default
export default function CartSheet() {
   // Defining hooks
   const { cart, clearCart } = cartStore();
   const userInfo = useContext(MeContext);
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

   // Using useEffect to debug the issue of zustand
   useEffect(() => {
      console.log(`✅ CartSheet : Cart : ${cart}, CartLenght :${cart.length}`);
   }, [cart]);

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
                     {cart.map((item) => (
                        <CartItem data={item} />
                     ))}
                  </div>
               )}
            </div>
            {cart.length !== 0 && (
               <SheetFooter className="shrink-0">
                  <p className="cn-font-heading text-base font-medium text-foreground">
                     Total :{" "}
                     <span className="text-sm/relaxed text-muted-foreground">
                        {total.toFixed(2)} $
                     </span>
                  </p>
                  <Button
                     onClick={async () => {
                        try {
                           if (userInfo && userInfo !== "401") {
                              const mappedArray = cart.map((item) => {
                                 return {
                                    id: item.id,
                                    quantity: item.quantity,
                                 };
                              });

                              await cartMutation.mutateAsync({
                                 products: mappedArray,
                                 userId: userInfo.id,
                              });

                              toast.success(
                                 "The cart has been successfully added.",
                              );
                           }
                        } catch {
                           toast.error(
                              "The're was an issue while trying to add cart.",
                           );
                        }
                     }}
                  >
                     Pay
                  </Button>
                  <Button
                     variant={"outline"}
                     onClick={() => {
                        clearCart();
                        toast.success("Your cart is empty now.");
                     }}
                  >
                     Clear Cart
                  </Button>
               </SheetFooter>
            )}
         </SheetContent>
      </Sheet>
   );
}

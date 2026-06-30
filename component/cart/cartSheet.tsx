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

// Creating and exporting CartSheet component as default
export default function CartSheet() {
   // Defining hooks
   const { cart, clearCart } = cartStore();

   // Returning JSX
   return (
      <Sheet>
         <SheetTrigger>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button size="icon" variant="outline">
                     <ShoppingCart />
                  </Button>
               </TooltipTrigger>
               <TooltipContent>Shopping cart</TooltipContent>
            </Tooltip>
         </SheetTrigger>
         <SheetContent>
            <SheetHeader>
               <SheetTitle>Shopping cart</SheetTitle>
               <SheetDescription>
                  Products you want to order are shown here.
               </SheetDescription>
            </SheetHeader>
            <div className="p-4">
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
                        <CartItem data={item} key={index} />
                     ))}
                  </div>
               )}
            </div>
            {cart.length !== 0 && (
               <SheetFooter>
                  <Button>Pay</Button>
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

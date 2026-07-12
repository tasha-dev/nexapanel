// Codes by mahdi tasha
// Forcing next.js to treat this as a client component
"use client";

// Importing part
import CartItem from "@/component/cart/cartItem";
import { Button } from "@/component/ui/button";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogPortal,
   DialogTitle,
} from "@/component/ui/dialog";
import {
   Empty,
   EmptyDescription,
   EmptyHeader,
   EmptyMedia,
   EmptyTitle,
} from "@/component/ui/empty";
import { axiosInstance } from "@/lib/axios";
import { EditCartDialogProps } from "@/type/component";
import { Cart } from "@/type/general";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Creating and exporting EditCart Dialog component as default
export default function EditCart({
   data,
   onOpenChange,
   open,
   refetch,
}: EditCartDialogProps) {
   // Defining hooks
   const [dataToRender, setDataToRender] = useState<Cart[]>(data.products);
   const mutation = useMutation({
      mutationFn: async () => {
         const response = await axiosInstance.put(`/carts/${data.id}`, {
            products: dataToRender.map((item) => {
               return {
                  id: item.id,
                  quantity: item.quantity,
               };
            }),
         });
         return response.data;
      },
      onSuccess: () => {
         toast.success("Cart updated successfully");
         refetch?.();
      },
      onError: () => toast.error("Failed to update cart"),
      onSettled: () => onOpenChange?.(false),
   });

   // Returning JSX
   return (
      <Dialog
         open={open}
         onOpenChange={(open) => {
            if (!mutation.isPending) {
               onOpenChange?.(open);
            }
         }}
      >
         <DialogPortal>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Edit Cart</DialogTitle>
                  <DialogDescription>
                     Update the cart details. Review the customer, items,
                     quantities, discounts, and other information before saving
                     your changes.
                  </DialogDescription>
               </DialogHeader>
               {dataToRender.length === 0 ? (
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
                  <div className="space-y-2">
                     {dataToRender.map((cart, index) => (
                        <CartItem
                           data={cart}
                           key={index}
                           onDelete={() => {
                              const copy = [...dataToRender];
                              const dataToSet = copy.filter(
                                 (item) => item.id !== cart.id,
                              );

                              setDataToRender(dataToSet);
                           }}
                        />
                     ))}
                  </div>
               )}
               <DialogFooter>
                  <Button
                     disabled={mutation.isPending}
                     type="submit"
                     onClick={() => mutation.mutate()}
                  >
                     {mutation.isPending ? (
                        <Loader2 className="animate-spin" />
                     ) : (
                        <Send />
                     )}
                     Submit
                  </Button>
                  <DialogClose asChild>
                     <Button
                        type="button"
                        variant="outline"
                        disabled={mutation.isPending}
                     >
                        Cancel
                     </Button>
                  </DialogClose>
               </DialogFooter>
            </DialogContent>
         </DialogPortal>
      </Dialog>
   );
}

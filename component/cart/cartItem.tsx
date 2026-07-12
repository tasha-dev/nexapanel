// Codes by mahdi tash
// Forcing next.js to render this component as client side
"use client";

// Importing part
import { cn, formatCurrency } from "@/lib/util";
import { CartItemProps } from "@/type/component";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import cartStore from "@/store/cart";
import { toast } from "sonner";

// Creating and exporting CartItem component as default
export default function CartItem({ data, className, onDelete }: CartItemProps) {
   // Defining hooks
   const { removeProduct } = cartStore();

   // Returning JSX
   return (
      <div className={cn("flex gap-3", className)}>
         <Image
            alt={data.title}
            src={data.thumbnail}
            width={200}
            height={200}
            className="rounded-md object-cover size-[75px] bg-muted border border-foreground/10 shirnk-0"
         />
         <div className="flex-1 overflow-hidden">
            <Link
               href={`/products/${data.id}`}
               className="block text-sm mb-1 font-medium text-foreground truncate underline underline-offset-2"
            >
               {data.title}
            </Link>
            <span className="block text-xs font-light text-muted-foreground truncate mb-0.5">
               {formatCurrency(data.price)}
            </span>
            <div className="flex items-end justify-between">
               <span className="block text-xs font-light text-muted-foreground truncate flex-1">
                  Quantity : {data.quantity}
               </span>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        variant={"destructive"}
                        size="icon-sm"
                        type="button"
                        className="shrink-0"
                        onClick={() => {
                           if (onDelete) {
                              onDelete?.();
                           } else {
                              removeProduct(data.id);
                              toast.success(
                                 "The item is successfully delete from your cart.",
                              );
                           }
                        }}
                     >
                        <Trash />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
               </Tooltip>
            </div>
         </div>
      </div>
   );
}

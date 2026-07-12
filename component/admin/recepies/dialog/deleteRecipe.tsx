// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
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
import { Loader2, Trash } from "lucide-react";
import { DeleteUserDialogProps } from "@/type/component";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

// Creating and exporting DeleteRecipe Dialog as default
export default function DeleteRecipe({
   refetch,
   id,
   onOpenChange,
   open,
}: DeleteUserDialogProps) {
   // Defining hooks
   const mutation = useMutation({
      mutationFn: async () => {
         const response = await axiosInstance.delete(`/recipes/${id}`);
         return response.data;
      },
      onSuccess: () => {
         refetch?.();
         toast.success("Recipe deleted successfully");
      },
      onError: () =>
         toast.error("here was an error while trying to delete recipe."),
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
                  <DialogTitle>Delete Recipe</DialogTitle>
                  <DialogDescription>
                     Are you sure you want to delete this recipe? This action
                     cannot be undone, and all associated data will be
                     permanently removed.
                  </DialogDescription>
               </DialogHeader>
               <DialogFooter>
                  <Button
                     disabled={mutation.isPending}
                     onClick={() => mutation.mutate()}
                     variant={"destructive"}
                  >
                     {mutation.isPending ? (
                        <Loader2 className="animate-spin" />
                     ) : (
                        <Trash />
                     )}
                     Delete
                  </Button>
                  <DialogClose asChild>
                     <Button variant="outline" disabled={mutation.isPending}>
                        Cancel
                     </Button>
                  </DialogClose>
               </DialogFooter>
            </DialogContent>
         </DialogPortal>
      </Dialog>
   );
}

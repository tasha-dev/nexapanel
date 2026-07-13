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
   DialogTitle,
   DialogTrigger,
} from "@/component/ui/dialog";
import { Loader2, Plus, Send, X } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { commentFormSchema as formSchema } from "@/lib/formSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import { DialogProps } from "@/type/component";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/component/ui/tooltip";
import { Textarea } from "@/component/ui/textarea";

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting AddNewComment Dialog as default
export default function AddNewComment({ refetch }: DialogProps) {
   // Defining hooks
   const [open, setOpen] = useState(false);
   const form = useForm<formType>({
      resolver: zodResolver(formSchema),
   });

   const mutation = useMutation({
      mutationFn: async ({ data }: { data: formType }) => {
         const response = await axiosInstance.post("/comments/add", {
            ...data,
         });
         return response.data;
      },
   });

   // Defining submit handler
   const submitHandler: SubmitHandler<formType> = async (data) => {
      try {
         await mutation.mutateAsync({
            data,
         });

         refetch?.();

         toast.success("Comment added successfully");
         form.reset();
      } catch {
         toast.error("There was an error while trying to create new comment.");
      } finally {
         setOpen(false);
      }
   };

   // Returning JSX
   return (
      <Dialog
         open={open}
         onOpenChange={(open) => {
            if (!form.formState.isSubmitting) {
               setOpen(open);
            }
         }}
      >
         <DialogTrigger>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button size="icon" className="fixed bottom-2 right-10 z-20">
                     <Plus />
                  </Button>
               </TooltipTrigger>
               <TooltipContent>
                  <p>Create Comment</p>
               </TooltipContent>
            </Tooltip>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Create Comment</DialogTitle>
               <DialogDescription>
                  Add a new comment by providing its title and body.
               </DialogDescription>
            </DialogHeader>
            <form action="#" onSubmit={form.handleSubmit(submitHandler)}>
               <div className="space-y-4">
                  <Controller
                     name="postId"
                     control={form.control}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor={field.name}>Post ID</FieldLabel>
                           <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter Post Id"
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
                  <Controller
                     name="userId"
                     control={form.control}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor={field.name}>User ID</FieldLabel>
                           <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter User Id"
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
                  <Controller
                     name="body"
                     control={form.control}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor={field.name}>Body</FieldLabel>
                           <Textarea
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter content"
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
               </div>
               <DialogFooter className="mt-4">
                  <Button disabled={form.formState.isSubmitting} type="submit">
                     {form.formState.isSubmitting ? (
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
                        disabled={form.formState.isSubmitting}
                     >
                        Cancel
                     </Button>
                  </DialogClose>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}

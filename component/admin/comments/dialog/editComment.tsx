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
import { Loader2, Plus, Send } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { commentFormSchema as formSchema } from "@/lib/formSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import { EditCommentDialogProps } from "@/type/component";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/component/ui/tooltip";
import { Textarea } from "@/component/ui/textarea";

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting EditComment Dialog as default
export default function EditComment({
   refetch,
   onOpenChange,
   open,
   data,
}: EditCommentDialogProps) {
   // Defining hooks
   const form = useForm<formType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         body: data.body,
         postId: String(data.postId),
         userId: String(data.user.id),
      },
   });

   const mutation = useMutation({
      mutationFn: async ({ newData }: { newData: formType }) => {
         const response = await axiosInstance.put(`/comments/${data.id}`, {
            ...newData,
         });
         return response.data;
      },
   });

   // Defining submit handler
   const submitHandler: SubmitHandler<formType> = async (data) => {
      try {
         await mutation.mutateAsync({
            newData: data,
         });

         refetch?.();

         toast.success("Comment edited successfully");
         form.reset();
      } catch {
         toast.error("There was an error while trying to editing comment.");
      } finally {
         onOpenChange?.(false);
      }
   };

   // Returning JSX
   return (
      <Dialog
         open={open}
         onOpenChange={(open) => {
            if (!form.formState.isSubmitting) {
               onOpenChange?.(open);
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
                  <p>Edit Comment</p>
               </TooltipContent>
            </Tooltip>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Edit Comment</DialogTitle>
               <DialogDescription>
                  Edit the comment by providing its title and body.
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

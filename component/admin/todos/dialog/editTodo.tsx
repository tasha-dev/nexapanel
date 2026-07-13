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
import { todoFormSchema as formSchema } from "@/lib/formSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import { EditTodoDialogProps } from "@/type/component";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { Switch } from "@/component/ui/switch";

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting EditTodo Dialog as default
export default function EditTodo({
   refetch,
   open,
   onOpenChange,
   data,
}: EditTodoDialogProps) {
   // Defining hooks
   const form = useForm<formType>({
      resolver: zodResolver(formSchema),
      defaultValues: data,
   });

   const mutation = useMutation({
      mutationFn: async ({ newData }: { newData: formType }) => {
         const response = await axiosInstance.put(`/todos/${data.id}`, {
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

         toast.success("Todo updated successfully");
         form.reset();
      } catch {
         toast.error("There was an error while trying to update todo.");
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
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Edit Todo</DialogTitle>
               <DialogDescription>
                  Edit the todo by updating its title and completion status.
               </DialogDescription>
            </DialogHeader>
            <form action="#" onSubmit={form.handleSubmit(submitHandler)}>
               <div className="space-y-4">
                  <Controller
                     name="todo"
                     control={form.control}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor={field.name}>Todo</FieldLabel>
                           <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter todo title"
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
                  <Controller
                     name="completed"
                     control={form.control}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <div className="flex items-center justify-between gap-2">
                              <FieldLabel
                                 htmlFor={field.name}
                                 className="flex-1 truncate block"
                              >
                                 Completed
                              </FieldLabel>
                              <Switch
                                 id={field.name}
                                 aria-invalid={fieldState.invalid}
                                 onCheckedChange={field.onChange}
                                 checked={field.value}
                                 className="shrink-0"
                              />
                           </div>
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

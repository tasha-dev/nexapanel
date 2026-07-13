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
import { DialogProps } from "@/type/component";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { useContext, useState } from "react";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/component/ui/tooltip";
import { MeContext } from "@/component/layout/authProvider";
import { Switch } from "@/component/ui/switch";

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting AddNewTodo Dialog as default
export default function AddNewTodo({ refetch }: DialogProps) {
   // Defining hooks
   const [open, setOpen] = useState(false);
   const userInfo = useContext(MeContext);
   const form = useForm<formType>({
      resolver: zodResolver(formSchema),
   });

   const mutation = useMutation({
      mutationFn: async ({ data }: { data: formType }) => {
         const response = await axiosInstance.post("/todos/add", {
            ...data,
            userId: userInfo ? (userInfo === "401" ? 0 : userInfo.id) : 0,
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

         toast.success("Todo added successfully");
         form.reset();
      } catch {
         toast.error("There was an error while trying to create new todo.");
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
         <DialogTrigger className="fixed bottom-2 right-10 z-20">
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button size="icon">
                     <Plus />
                  </Button>
               </TooltipTrigger>
               <TooltipContent>
                  <p>Create Todo</p>
               </TooltipContent>
            </Tooltip>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Create Todo</DialogTitle>
               <DialogDescription>
                  Add a new todo by providing its title and completion status.
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

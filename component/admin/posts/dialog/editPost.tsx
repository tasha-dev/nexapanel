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
} from "@/component/ui/dialog";
import { Loader2, Plus, Send, X } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { postFormSchema as formSchema } from "@/lib/formSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import { EditPostDialogProps } from "@/type/component";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { useContext } from "react";
import { tagsContext } from "../postsContainer";
import { Badge } from "@/component/ui/badge";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu";
import { Textarea } from "@/component/ui/textarea";
import { MeContext } from "@/component/layout/authProvider";

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting EditPost Dialog as default
export default function EditPost({
   data,
   onOpenChange,
   open,
   refetch,
}: EditPostDialogProps) {
   // Defining hooks
   const tags = useContext(tagsContext);
   const userInfo = useContext(MeContext);
   const form = useForm<formType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         tags: data.tags,
         title: data.title,
         body: data.body,
      },
   });

   const mutation = useMutation({
      mutationFn: async ({ newData }: { newData: formType }) => {
         const response = await axiosInstance.post(`/posts/${data.id}`, {
            ...newData,
            userId: userInfo ? (userInfo === "401" ? 0 : userInfo.id) : 0,
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

         toast.success("Post edited successfully");
         form.reset();
      } catch {
         toast.error("There was an error while trying to edit post.");
      } finally {
         onOpenChange?.(false);
      }
   };

   // Defining variables
   const formTags = form.watch("tags");

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
               <DialogTitle>Edit Post</DialogTitle>
               <DialogDescription>
                  edit post by editing its title, body, and tags.
               </DialogDescription>
            </DialogHeader>
            <form action="#" onSubmit={form.handleSubmit(submitHandler)}>
               <div className="space-y-4">
                  <Controller
                     name="title"
                     control={form.control}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                           <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter name"
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
                  <div>
                     <Controller
                        name="tags"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>Tags</FieldLabel>
                              <DropdownMenu>
                                 <DropdownMenuTrigger asChild>
                                    <Button
                                       aria-invalid={fieldState.invalid}
                                       variant={"outline"}
                                       className="justify-start text-left"
                                    >
                                       Select Tags
                                    </Button>
                                 </DropdownMenuTrigger>
                                 <DropdownMenuContent>
                                    {tags.map((item, index) => (
                                       <DropdownMenuItem
                                          key={index}
                                          onSelect={() => {
                                             if (!formTags.includes(item)) {
                                                form.setValue(
                                                   "tags",
                                                   [...formTags, item],
                                                   {
                                                      shouldValidate: true,
                                                   },
                                                );
                                             }
                                          }}
                                       >
                                          {item}
                                       </DropdownMenuItem>
                                    ))}
                                 </DropdownMenuContent>
                              </DropdownMenu>
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                     {formTags.length !== 0 && (
                        <div className="gap-2 mt-4 flex items-center justify-start flex-wrap">
                           {formTags &&
                              formTags.map((tag, index) => (
                                 <Badge
                                    key={index}
                                    className="cursor-pointer"
                                    onClick={() => {
                                       form.setValue(
                                          "tags",
                                          formTags.filter((t) => t !== tag),
                                          {
                                             shouldValidate: true,
                                          },
                                       );
                                    }}
                                 >
                                    <X />
                                    {tag}
                                 </Badge>
                              ))}
                        </div>
                     )}
                  </div>
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
                              placeholder="Enter body"
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

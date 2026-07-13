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
import { postFormSchema as formSchema } from "@/lib/formSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/component/ui/select";
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

// Creating and exporting AddNewPost Dialog as default
export default function AddNewPost({ refetch }: DialogProps) {
   // Defining hooks
   const [open, setOpen] = useState(false);
   const tags = useContext(tagsContext);
   const userInfo = useContext(MeContext);
   const form = useForm<formType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         tags: [],
      },
   });

   const mutation = useMutation({
      mutationFn: async ({ data }: { data: formType }) => {
         const response = await axiosInstance.post("/posts/add", {
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

         toast.success("Post added successfully");
         form.reset();
      } catch {
         toast.error("There was an error while trying to create new post.");
      } finally {
         setOpen(false);
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
               setOpen(open);
            }
         }}
      >
         <DialogTrigger>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button variant={"outline"} size="icon">
                     <Plus />
                  </Button>
               </TooltipTrigger>
               <TooltipContent>
                  <p>Create Post</p>
               </TooltipContent>
            </Tooltip>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Create Post</DialogTitle>
               <DialogDescription>
                  Add a new post by providing its title, body, and tags.
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

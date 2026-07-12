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
import { Hash, Loader2, Plus, Send, X } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { recipeFormSchema as formSchema } from "@/lib/formSchema";
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
import { Textarea } from "@/component/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { useContext, useState } from "react";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/component/ui/tooltip";
import { tagsContext } from "../recepiesContainer";
import { Badge } from "@/component/ui/badge";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu";

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting AddNewRecipe Dialog as default
export default function AddNewRecipe({ refetch }: DialogProps) {
   // Defining hooks
   const [open, setOpen] = useState(false);
   const tags = useContext(tagsContext);
   const form = useForm<formType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         tags: [],
      },
   });

   const mutation = useMutation({
      mutationFn: async ({ data }: { data: formType }) => {
         const response = await axiosInstance.post("/recipes/add", data);
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

         toast.success("Recipe added successfully");
         form.reset();
      } catch {
         toast.error("There was an error while trying to create new recipe.");
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
                  <p>Create Recipe</p>
               </TooltipContent>
            </Tooltip>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Create Recipe</DialogTitle>
               <DialogDescription>
                  Add a new recipe by providing its title, category, and other
                  required details. Make sure all information is accurate before
                  saving.
               </DialogDescription>
            </DialogHeader>
            <form action="#" onSubmit={form.handleSubmit(submitHandler)}>
               <div className="space-y-4">
                  <Controller
                     name="name"
                     control={form.control}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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
                  <Controller
                     name="cuisine"
                     control={form.control}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel htmlFor={field.name}>Cuisine</FieldLabel>
                           <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter cuisine"
                           />
                           {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                           )}
                        </Field>
                     )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                     <Controller
                        name="prepTime"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                 Prep Time
                              </FieldLabel>
                              <Input
                                 {...field}
                                 id={field.name}
                                 aria-invalid={fieldState.invalid}
                                 placeholder="Enter prep time"
                                 type="number"
                              />
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                     <Controller
                        name="servings"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                 Servings
                              </FieldLabel>
                              <Input
                                 {...field}
                                 id={field.name}
                                 aria-invalid={fieldState.invalid}
                                 placeholder="Enter servings"
                                 type="number"
                              />
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                  </div>
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
                  <div className="grid grid-cols-2 gap-4">
                     <Controller
                        name="rating"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                 Rating
                              </FieldLabel>
                              <Input
                                 {...field}
                                 id={field.name}
                                 aria-invalid={fieldState.invalid}
                                 placeholder="Enter rating"
                                 type="number"
                              />
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                     <Controller
                        name="difficulty"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                 Difficulty
                              </FieldLabel>
                              <Select
                                 value={field.value}
                                 onValueChange={field.onChange}
                                 aria-invalid={fieldState.invalid}
                              >
                                 <SelectTrigger
                                    aria-invalid={fieldState.invalid}
                                 >
                                    <SelectValue placeholder="Select difficulty" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {["Easy", "Medium", "Hard"].map(
                                       (item, index) => (
                                          <SelectItem
                                             key={index}
                                             value={item.toLowerCase()}
                                          >
                                             {item}
                                          </SelectItem>
                                       ),
                                    )}
                                 </SelectContent>
                              </Select>
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                  </div>
                  <Controller
                     name="image"
                     control={form.control}
                     render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                           <FieldLabel
                              htmlFor={field.name}
                              className="truncate"
                           >
                              Image
                           </FieldLabel>
                           <Input
                              id={field.name}
                              onChange={(e) => {
                                 const file = e.target.files?.[0];

                                 if (file) {
                                    field.onChange(URL.createObjectURL(file));
                                 }
                              }}
                              aria-invalid={fieldState.invalid}
                              placeholder="Enter thumbnail URL"
                              type="file"
                              accept="image/*"
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

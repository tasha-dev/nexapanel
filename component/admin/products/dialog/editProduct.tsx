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
   DialogTrigger,
} from "@/component/ui/dialog";
import { Loader2, Plus, Send } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { productSchema as formSchema } from "@/lib/formSchema";
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
import { EditProductDialogProps } from "@/type/component";
import { Textarea } from "@/component/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { useContext } from "react";
import { categoriesContext } from "../productsContainer";

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting EditProduct Dialog as default
export default function EditProduct({
   refetch,
   data,
   onOpenChange,
   open,
}: EditProductDialogProps) {
   // Defining hooks
   const categories = useContext(categoriesContext);
   const form = useForm<formType>({
      resolver: zodResolver(formSchema),
      defaultValues: data
         ? {
              ...data,
              thumbnail: data.thumbnail,
              price: String(data.price),
              discountPercentage: String(data.discountPercentage),
              rating: String(data.rating),
              stock: String(data.stock),
           }
         : undefined,
   });

   const mutation = useMutation({
      mutationFn: async ({ data }: { data: formType }) => {
         const response = await axiosInstance.post("/products/add", data);
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
         toast.success("Product added successfully");
         form.reset();
      } catch {
         toast.error("There was an error while trying to create new product.");
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
         <DialogPortal>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                  <DialogDescription>
                     Fill in the required information to edit a product. Provide
                     accurate product details before submitting.
                  </DialogDescription>
               </DialogHeader>
               <form action="#" onSubmit={form.handleSubmit(submitHandler)}>
                  <div className="space-y-4">
                     <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                 Title
                              </FieldLabel>
                              <Input
                                 {...field}
                                 id={field.name}
                                 aria-invalid={fieldState.invalid}
                                 placeholder="Enter title"
                              />
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                     <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                 Description
                              </FieldLabel>
                              <Textarea
                                 {...field}
                                 id={field.name}
                                 aria-invalid={fieldState.invalid}
                                 placeholder="Enter description"
                              />
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                     <div className="grid grid-cols-2 gap-4">
                        <Controller
                           name="brand"
                           control={form.control}
                           render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                 <FieldLabel htmlFor={field.name}>
                                    Brand
                                 </FieldLabel>
                                 <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter brand"
                                 />
                                 {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                 )}
                              </Field>
                           )}
                        />
                        <Controller
                           name="category"
                           control={form.control}
                           render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                 <FieldLabel htmlFor={field.name}>
                                    Category
                                 </FieldLabel>
                                 <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                 >
                                    <SelectTrigger
                                       aria-invalid={fieldState.invalid}
                                    >
                                       <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       {categories.map((item, index) => (
                                          <SelectItem
                                             key={index}
                                             value={item.name.toLowerCase()}
                                          >
                                             {item.name}
                                          </SelectItem>
                                       ))}
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
                                 min={0}
                                 max={5}
                                 placeholder="Enter rating"
                                 type="number"
                              />
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                     <div className="grid grid-cols-2 gap-4">
                        <Controller
                           name="price"
                           control={form.control}
                           render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                 <FieldLabel htmlFor={field.name}>
                                    Price
                                 </FieldLabel>
                                 <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter price"
                                    type="number"
                                    min={1}
                                 />
                                 {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                 )}
                              </Field>
                           )}
                        />
                        <Controller
                           name="discountPercentage"
                           control={form.control}
                           render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                 <FieldLabel htmlFor={field.name}>
                                    Discount Percentage
                                 </FieldLabel>
                                 <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter discount percentage"
                                    type="number"
                                    min={0}
                                    max={100}
                                 />
                                 {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                 )}
                              </Field>
                           )}
                        />
                     </div>
                     <Controller
                        name="stock"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel
                                 htmlFor={field.name}
                                 className="truncate"
                              >
                                 Stock
                              </FieldLabel>
                              <Input
                                 {...field}
                                 id={field.name}
                                 aria-invalid={fieldState.invalid}
                                 placeholder="Enter stock"
                                 type="number"
                                 min={0}
                              />
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                     <Controller
                        name="thumbnail"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel
                                 htmlFor={field.name}
                                 className="truncate"
                              >
                                 Thumbnail
                              </FieldLabel>
                              <Input
                                 id={field.name}
                                 onChange={(e) => {
                                    const file = e.target.files?.[0];

                                    if (file) {
                                       field.onChange(
                                          URL.createObjectURL(file),
                                       );
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
                     <Button
                        disabled={form.formState.isSubmitting}
                        type="submit"
                     >
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
         </DialogPortal>
      </Dialog>
   );
}

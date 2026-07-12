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
import { Edit, Loader2, Send } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UserFormSchema as formSchema } from "@/lib/formSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import { DatePicker } from "@/component/ui/datePicker";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/component/ui/select";
import countries from "@/data/countries.json";
import { EditUserDialogProps } from "@/type/component";
import { Textarea } from "@/component/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/component/ui/dropdown-menu";

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting EditUser Dialog as default
export default function EditUser({
   refetch,
   info,
   onOpenChange,
   open,
}: EditUserDialogProps) {
   // Defining hooks
   const form = useForm<formType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         dateOfBirth: new Date(info.birthDate).toISOString(),
         country: info.address.country,
         address: info.address.address,
         email: info.email,
         firstName: info.firstName,
         lastName: info.lastName,
         gender: info.gender,
         phone: info.phone,
         role: info.role,
      },
   });

   const mutation = useMutation({
      mutationFn: async ({ data }: { data: formType }) => {
         const response = await axiosInstance.put(`/users/${info.id}`, data);
         return response.data;
      },
   });

   // Defining submit handler
   const submitHandler: SubmitHandler<formType> = async (data) => {
      try {
         await mutation.mutateAsync({ data });
         refetch?.();

         toast.success("User updated successfully");
         onOpenChange?.(false);
      } catch {
         toast.error("There was an error while trying to update user.");
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
                  <DialogTitle>Edit User</DialogTitle>
                  <DialogDescription>
                     Update the user's personal, contact, company, and account
                     information. Review the changes carefully before saving to
                     ensure all details are accurate and up to date.
                  </DialogDescription>
               </DialogHeader>
               <form action="#" onSubmit={form.handleSubmit(submitHandler)}>
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-3">
                        <Controller
                           name="firstName"
                           control={form.control}
                           render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                 <FieldLabel htmlFor={field.name}>
                                    First Name
                                 </FieldLabel>
                                 <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your First Name"
                                    autoComplete="off"
                                 />
                                 {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                 )}
                              </Field>
                           )}
                        />
                        <Controller
                           name="lastName"
                           control={form.control}
                           render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                 <FieldLabel htmlFor={field.name}>
                                    Last Name
                                 </FieldLabel>
                                 <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your Last Name"
                                    autoComplete="off"
                                 />
                                 {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                 )}
                              </Field>
                           )}
                        />
                     </div>
                     <Controller
                        name="dateOfBirth"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                 Birth date
                              </FieldLabel>
                              <DatePicker
                                 disableAfterToday
                                 aria-invalid={fieldState.invalid}
                                 value={
                                    field.value
                                       ? new Date(field.value)
                                       : undefined
                                 }
                                 onValueChange={(date) =>
                                    field.onChange(
                                       date ? date.toISOString() : "",
                                    )
                                 }
                              />
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                     <Controller
                        name="gender"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                 Gender
                              </FieldLabel>
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value}
                              >
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">
                                       Female
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                     <div className="grid grid-cols-2 gap-3">
                        <Controller
                           name="email"
                           control={form.control}
                           render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                 <FieldLabel htmlFor={field.name}>
                                    Email
                                 </FieldLabel>
                                 <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your Email"
                                    autoComplete="off"
                                 />
                                 {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                 )}
                              </Field>
                           )}
                        />
                        <Controller
                           name="phone"
                           control={form.control}
                           render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                 <FieldLabel htmlFor={field.name}>
                                    Phone Number
                                 </FieldLabel>
                                 <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your phone number"
                                    autoComplete="off"
                                 />
                                 {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                 )}
                              </Field>
                           )}
                        />
                     </div>
                     <Controller
                        name="role"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value}
                              >
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="moderator">
                                       Moderator
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                     <Controller
                        name="country"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                 Country
                              </FieldLabel>
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value}
                              >
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {countries.map((country, index) => (
                                       <SelectItem
                                          key={index}
                                          value={country.name}
                                       >
                                          {country.name}
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
                     <Controller
                        name="address"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                 Address
                              </FieldLabel>
                              <Textarea
                                 {...field}
                                 id={field.name}
                                 aria-invalid={fieldState.invalid}
                                 placeholder="Enter your address"
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

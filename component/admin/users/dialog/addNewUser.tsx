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
import { DialogProps } from "@/type/component";
import { Textarea } from "@/component/ui/textarea";

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting AddNewUser Dialog as default
export default function AddNewUser({ refetch }: DialogProps) {
   // Defining hooks
   const form = useForm<formType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         dateOfBirth: new Date().toISOString(),
      },
   });

   // Defining submit handler
   const submitHandler: SubmitHandler<formType> = async (data) => {
      refetch?.();
      console.log(data);
   };

   // Returning JSX
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button className="shrink-0" variant={"secondary"}>
               <Plus />
               Add New User
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Create New User</DialogTitle>
               <DialogDescription>
                  Fill in the required information to create a new user account.
                  Provide accurate personal, contact, company, and account
                  details before submitting.
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
                              onValueChange={field.onChange}
                              aria-invalid={fieldState.invalid}
                              value={new Date(field.value)}
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
                           <FieldLabel htmlFor={field.name}>Gender</FieldLabel>
                           <Select
                              onValueChange={field.onChange}
                              value={field.value}
                           >
                              <SelectTrigger>
                                 <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="male">Male</SelectItem>
                                 <SelectItem value="female">Female</SelectItem>
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
                           <FieldLabel htmlFor={field.name}>Country</FieldLabel>
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
                           <FieldLabel htmlFor={field.name}>Address</FieldLabel>
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
                  <Button disabled={form.formState.isSubmitting} type="submit">
                     {form.formState.isSubmitting ? (
                        <Loader2 className="animate-spin" />
                     ) : (
                        <Send />
                     )}
                     Submit
                  </Button>
                  <DialogClose asChild>
                     <Button type="button" variant="outline">
                        Cancel
                     </Button>
                  </DialogClose>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}

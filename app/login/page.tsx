// Codes by mahdi tasha
// Forcing next.js to treat this as a client component
"use client";

// Importing part
import { Button } from "@/component/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/component/ui/card";
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import { Home, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { loginFormSchema as FormSchema } from "@/lib/formSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

// Defining typeo of form
type FormType = z.infer<typeof FormSchema>;

// Creating and Exporting Login page as default
export default function Login() {
   // Defining hooks
   const form = useForm<FormType>({
      resolver: zodResolver(FormSchema),
   });

   const mutation = useMutation({
      mutationFn: (data: FormType) =>
         axiosInstance.post("/auth/login", { expiresInMins: 60, ...data }),
   });

   // Defining submit handler
   const submitHandler: SubmitHandler<FormType> = async (data) => {
      try {
         await mutation.mutateAsync(data);
         toast.success("Logged in successfully. 🍻");
      } catch {
         toast.error("There was an error while fetching your data.", {
            action: (
               <Button onClick={form.handleSubmit(submitHandler)}>
                  Try again
               </Button>
            ),
         });
      }
   };

   // Returning JSX
   return (
      <section className="lg:min-h-dvh lg:flex lg:items-center lg:justify-center">
         <main>
            <Card className="lg:w-lg w-full lg:rounded-xl rounded-none lg:border border-none lg:min-h-auto min-h-dvh">
               <CardHeader>
                  <CardTitle>Sign in to your account</CardTitle>
                  <CardDescription>
                     Enter your credentials to manage your projects, data, and
                     settings securely.
                  </CardDescription>
               </CardHeader>
               <form action="#" onSubmit={form.handleSubmit(submitHandler)}>
                  <CardContent className="space-y-3 mb-5">
                     <Controller
                        name="username"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                 Username
                              </FieldLabel>
                              <Input
                                 {...field}
                                 id={field.name}
                                 aria-invalid={fieldState.invalid}
                                 placeholder="Enter your username"
                                 autoComplete="off"
                              />
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                     <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                           <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                 Password
                              </FieldLabel>
                              <Input
                                 {...field}
                                 id={field.name}
                                 aria-invalid={fieldState.invalid}
                                 placeholder="Enter your passwrod"
                                 autoComplete="off"
                              />
                              {fieldState.invalid && (
                                 <FieldError errors={[fieldState.error]} />
                              )}
                           </Field>
                        )}
                     />
                  </CardContent>
                  <CardFooter className="flex gap-2 flex-wrap">
                     <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                     >
                        {form.formState.isSubmitting ? (
                           <Loader2 className="animate-spin" />
                        ) : (
                           <Send />
                        )}
                        Submit
                     </Button>
                     <Button
                        asChild
                        type="button"
                        variant={"outline"}
                        disabled={form.formState.isSubmitting}
                     >
                        <Link href="/">
                           <Home />
                           Head home
                        </Link>
                     </Button>
                  </CardFooter>
               </form>
            </Card>
         </main>
      </section>
   );
}

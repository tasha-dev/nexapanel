// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { Button } from "@/component/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/component/ui/dialog";
import { Plus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserFormSchema as formSchema } from "@/lib/formSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Defining form type
type formType = z.infer<typeof formSchema>;

// Defining data of inputs to render

// Creating and exporting AddNewUser Dialog as default
export default function AddNewUser() {
   // Defining hooks
   const form = useForm<formType>({
      resolver: zodResolver(formSchema),
   });

   // Defining submit handler
   const submitHandler: SubmitHandler<formType> = async (data) => {
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
               <DialogContent></DialogContent>
               <DialogFooter></DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}

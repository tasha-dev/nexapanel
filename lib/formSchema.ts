// Codes by mahdi tasha
// Importing part
import z from "zod";

// Creating and exporting form schmeas with zod used with react hook form
export const loginFormSchema = z.object({
   username: z
      .string({
         message: "Username is required.",
      })
      .min(3, "The username must be at least 3 characters long.")
      .max(12, "The username must be at most 12 characters long."),
   password: z
      .string({
         message: "Password is required.",
      })
      .min(8, "The password must be at least 8 characters long.")
      .max(12, "The password must be at most 12 characters long."),
});

export const UserFormSchema = z.object({
   firstName: z
      .string({
         message: "Please fill this field.",
      })
      .min(2, {
         message: "This field has to be at least, 2 characters long.",
      })
      .max(20, {
         message: "This field has to be, 20 characters long at most.",
      }),
   lastName: z
      .string({
         message: "Please fill this field.",
      })
      .min(2, {
         message: "This field has to be at least, 2 characters long.",
      })
      .max(20, {
         message: "This field has to be, 20 characters long at most.",
      }),
   dateOfBirth: z.string({
      message: "Please fill this field.",
   }),
   gender: z.enum(["male", "female"], {
      message: "Please fill this field.",
   }),
   email: z.email({
      message: "Please fill this field.",
   }),
   phone: z
      .string({
         message: "Please fill this field.",
      })
      .regex(/^\+?[0-9\s\-()]{10,20}$/, "Invalid phone number"),
   role: z.enum(["admin", "user", "moderator"], {
      message: "Please fill this field.",
   }),
   country: z.string({
      message: "Please fill this field.",
   }),
   address: z
      .string({
         message: "Please fill this field.",
      })
      .min(10, {
         message: "This field has to be at least, 10 characters long.",
      })
      .max(256, {
         message: "This field has to be, 256 characters long at most.",
      }),
});

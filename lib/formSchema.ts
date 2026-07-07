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
   firstName: z.string().min(1),
   lastName: z.string().min(1),
   dateOfBirth: z.string(),
   gender: z.enum(["male", "female"]),
   email: z.email(),
   phone: z.string().min(1),
   role: z.enum(["admin", "user", "moderator"]),
   country: z.string(),
   address: z.string(),
});

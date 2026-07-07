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
   maidenName: z.string(),
   age: z.number().min(0),
   gender: z.enum(["male", "female"]),
   email: z.email(),
   phone: z.string().min(1),
   username: z.string().min(3),
   password: z.string().min(6),
   birthDate: z.string(),
   image: z.string().url(),
   bloodGroup: z.string(),
   height: z.number(),
   weight: z.number(),
   eyeColor: z.string(),
   hair: z.object({
      color: z.string(),
      type: z.string(),
   }),
   ip: z.string(),
   address: z.object({
      address: z.string(),
      city: z.string(),
      state: z.string(),
      stateCode: z.string(),
      postalCode: z.string(),
      coordinates: z.object({
         lat: z.number(),
         lng: z.number(),
      }),
      country: z.string(),
   }),
   macAddress: z.string(),
   university: z.string(),
   bank: z.object({
      cardExpire: z.string(),
      cardNumber: z.string(),
      cardType: z.string(),
      currency: z.string(),
      iban: z.string(),
   }),
   company: z.object({
      department: z.string(),
      name: z.string(),
      title: z.string(),
      address: z.object({
         address: z.string(),
         city: z.string(),
         state: z.string(),
         stateCode: z.string(),
         postalCode: z.string(),
         coordinates: z.object({
            lat: z.number(),
            lng: z.number(),
         }),
         country: z.string(),
      }),
   }),
   ein: z.number(),
   ssn: z.number(),
   userAgent: z.string(),
   crypto: z.object({
      coin: z.string(),
      wallet: z.string(),
      network: z.string(),
   }),
   role: z.enum(["admin", "user"]),
});

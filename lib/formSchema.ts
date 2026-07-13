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

const numberField = (
   label: string,
   options?: {
      min?: number;
      max?: number;
      int?: boolean;
   },
) =>
   z
      .string()
      .trim()
      .refine((value) => value !== "", {
         message: `${label} is required.`,
      })
      .refine((value) => !Number.isNaN(value), {
         message: `${label} must be a valid number.`,
      })
      .refine(
         (value) => options?.min === undefined || Number(value) >= options.min,
         {
            message: `${label} must be greater than or equal to ${options?.min}.`,
         },
      )
      .refine(
         (value) => options?.max === undefined || Number(value) <= options.max,
         {
            message: `${label} cannot exceed ${options?.max}.`,
         },
      )
      .refine((value) => !options?.int || Number.isInteger(Number(value)), {
         message: `${label} must be a whole number.`,
      });

export const productSchema = z.object({
   title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters.")
      .max(100, "Title cannot exceed 100 characters."),

   thumbnail: z.string().trim().url("Please enter a valid image URL."),

   description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters.")
      .max(1000, "Description cannot exceed 1000 characters."),

   brand: z
      .string()
      .trim()
      .min(2, "Brand is required.")
      .max(50, "Brand cannot exceed 50 characters."),

   category: z.string(),

   price: numberField("Price", { min: 0 }),

   discountPercentage: numberField("Discount percentage", {
      min: 1,
      max: 100,
   }),

   rating: numberField("Rating", {
      min: 0,
      max: 5,
   }),

   stock: numberField("Stock", {
      min: 0,
      int: true,
   }),

   tags: z.array(z.string()).optional(),
});

export const recipeFormSchema = z.object({
   name: z
      .string()
      .trim()
      .min(3, "Recipe name must be at least 3 characters.")
      .max(100, "Recipe name must not exceed 100 characters."),
   cuisine: z
      .string()
      .trim()
      .min(3, "Cuisine name must be at least 3 characters.")
      .max(100, "Cuisine name must not exceed 100 characters."),
   prepTime: numberField("Prep time", {
      min: 1,
      int: true,
   }),
   servings: numberField("Servings", {
      min: 1,
      int: true,
   }),
   difficulty: z.enum(["Easy", "Medium", "Hard"], {
      message: "Please select a difficulty level.",
   }),
   tags: z.array(z.string()).min(1, "Please select at least one tag."),
   rating: numberField("Rating", {
      min: 0,
      max: 5,
   }),
   image: z.string().trim().url("Please enter a valid image URL."),
});

export const postFormSchema = z.object({
   title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters.")
      .max(100, "Title must not exceed 100 characters."),
   body: z
      .string()
      .trim()
      .min(20, "Body must be at least 3 characters.")
      .max(512, "Body name must not exceed 100 characters."),
   tags: z.array(z.string()).min(1, "Please select at least one tag."),
});

export const todoFormSchema = z.object({
   todo: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters.")
      .max(100, "Title must not exceed 100 characters."),
   completed: z.boolean(),
});

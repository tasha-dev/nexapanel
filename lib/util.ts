// Codes by mahdi tasha
// Importing part
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Creating and exporting utility functions
export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

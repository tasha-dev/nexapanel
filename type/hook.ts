// Codes by mahdi tasha
// Importing part
import { GETCart } from "./api";

// Creating and exporting type for custom hooks (props and returns)
export interface UseCartReturnType {
   isLoading: boolean;
   addItem: (id: number, quantity: number) => void;
   removeItem: (id: number) => void;
   cart: GETCart;
}

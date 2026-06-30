// Codes by mahdi tasha
// Importing part
import { Cart } from "./general";

// Defining types for the zustand stores
export interface CartStoreType {
   cart: Cart[];
   setCart: (products: Cart[]) => void;
   removeProduct: (id: number) => void;
   addProduct: (item: Cart) => void;
   updateQuantity: (id: number, quantity: number) => void;
   clearCart: () => void;
}

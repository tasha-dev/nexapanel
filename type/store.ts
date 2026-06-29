// Codes by mahdi tasha
// Defining types for the zustand stores
export interface CartStoreType {
   cart: {
      userId: number;
      products: {
         id: number;
         quantity: number;
      }[];
   };
   setCart: (
      products: {
         id: number;
         quantity: number;
      }[],
   ) => void;
   setUserId: (id: number) => void;
   removeProduct: (id: number) => void;
   addProduct: (id: number) => void;
   updateQuantity: (id: number, quantity: number) => void;
   clearCart: () => void;
}

// Codes by mahdi tasha
// Importing part
import { create } from "zustand";
import { CartStoreType } from "@/type/store";
import { persist } from "zustand/middleware";

// Creating cartStore
const cartStore = create<CartStoreType>()(
   persist(
      (set) => ({
         cart: [],
         setCart: (products) =>
            set((state) => ({
               cart: {
                  ...state.cart,
                  products,
               },
            })),
         addProduct: (item) =>
            set((state) => {
               const exists = state.cart.find(
                  (product) => product.id === item.id,
               );

               if (exists) {
                  return state;
               } else {
                  return {
                     cart: [...state.cart, item],
                  };
               }
            }),

         removeProduct: (id) =>
            set((state) => ({
               cart: state.cart.filter((product) => product.id !== id),
            })),

         updateQuantity: (id, quantity) =>
            set((state) => ({
               cart: state.cart.map((product) =>
                  product.id === id
                     ? {
                          ...product,
                          quantity,
                       }
                     : product,
               ),
            })),

         clearCart: () =>
            set(() => ({
               cart: [],
            })),
      }),
      {
         name: "cart",
      },
   ),
);

// Exporting the store as default
export default cartStore;

// Codes by mahdi tasha
// Importing part
import { create } from "zustand";
import { CartStoreType } from "@/type/store";
import { persist } from "zustand/middleware";

// Creating cartStore
const cartStore = create<CartStoreType>()(
   persist(
      (set) => ({
         cart: {
            userId: 0,
            products: [],
         },

         setCart: (products) =>
            set((state) => ({
               cart: {
                  ...state.cart,
                  products,
               },
            })),

         setUserId: (id) =>
            set((state) => ({
               cart: {
                  ...state.cart,
                  userId: id,
               },
            })),

         addProduct: (id) =>
            set((state) => {
               const exists = state.cart.products.find(
                  (product) => product.id === id,
               );

               if (exists) {
                  return {
                     cart: {
                        ...state.cart,
                        products: state.cart.products.map((product) =>
                           product.id === id
                              ? {
                                   ...product,
                                   quantity: product.quantity + 1,
                                }
                              : product,
                        ),
                     },
                  };
               }

               return {
                  cart: {
                     ...state.cart,
                     products: [
                        ...state.cart.products,
                        {
                           id,
                           quantity: 1,
                        },
                     ],
                  },
               };
            }),

         removeProduct: (id) =>
            set((state) => ({
               cart: {
                  ...state.cart,
                  products: state.cart.products.filter(
                     (product) => product.id !== id,
                  ),
               },
            })),

         updateQuantity: (id, quantity) =>
            set((state) => ({
               cart: {
                  ...state.cart,
                  products: state.cart.products.map((product) =>
                     product.id === id
                        ? {
                             ...product,
                             quantity,
                          }
                        : product,
                  ),
               },
            })),

         clearCart: () =>
            set((state) => ({
               cart: {
                  userId: state.cart.userId,
                  products: [],
               },
            })),
      }),
      {
         name: "cart",
      },
   ),
);

// Exporting the store as default
export default cartStore;

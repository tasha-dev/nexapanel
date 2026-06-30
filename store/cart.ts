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
         setCart: (newCart) => set({ cart: newCart }),
         clearCart: () => set({ cart: [] }),
         addProduct: (item) => {
            try {
               set((state) => {
                  const exists = state.cart.some(
                     (product) => product.id === item.id,
                  );
                  if (exists) return state;

                  const newCart = [...state.cart, item];

                  console.log(
                     "✅ addProduct - New cart length:",
                     newCart.length,
                     "Items:",
                     newCart,
                  );

                  return {
                     cart: [...state.cart, item],
                  };
               });
            } catch {
               console.error("Product didnt add.");
            }
         },
         removeProduct: (id) =>
            set((state) => ({
               cart: state.cart.filter((product) => product.id !== id),
            })),
         updateQuantity: (id, quantity) =>
            set((state) => ({
               cart: state.cart.map((product) =>
                  product.id === id ? { ...product, quantity } : product,
               ),
            })),
      }),
      { name: "cart" },
   ),
);

// Exporting the store as default
export default cartStore;

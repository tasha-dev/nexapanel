// Codes by mahdi tasha
// Importing part
import { AuthStoreType } from "@/type/store";
import { create } from "zustand";

// Creating Auth store
const authStore = create<AuthStoreType>((set) => ({
   accsessToken: undefined,
   refreshToken: undefined,
   userData: undefined,
   setUserData: (value) =>
      set(() => ({
         userData: value,
      })),
   logout: () => {
      set(() => ({
         accsessToken: undefined,
         refreshToken: undefined,
      }));
   },
   setAccessToken: (value) =>
      set(() => ({
         accsessToken: value,
      })),
   setRefreshToken: (value) =>
      set(() => ({
         refreshToken: value,
      })),
}));

// Exporting auth store as default
export default authStore;

// Codes by mahdi tasha
// Importing part
import { POSTLoginType } from "./api";

// Importing part
export interface AuthStoreType {
   accsessToken?: string;
   refreshToken?: string;
   userData?: Omit<POSTLoginType, "accessToken" | "refreshToken">;
   setRefreshToken: (value: string) => void;
   setAccessToken: (value: string) => void;
   logout: () => void;
   setUserData: (
      value: Omit<POSTLoginType, "accessToken" | "refreshToken">,
   ) => void;
}

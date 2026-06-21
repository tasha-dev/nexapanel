// Codes by mahdi tasha
// Importing part
import { ReactNode } from "react";

// Creating and exporting props type of components
export interface ChildrenOnlyProps {
   children: ReactNode;
}

export interface ThemeTogglerProps {
   size?: "icon-sm" | "icon" | "icon-lg";
   variant?: "ghost" | "outline" | "default";
}

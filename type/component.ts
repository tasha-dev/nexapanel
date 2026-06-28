// Codes by mahdi tasha
// Importing part
import { ReactNode } from "react";
import { Post, Product, Recipe } from "./general";

// Creating and exporting props type of components
export interface ChildrenOnlyProps {
   children: ReactNode;
}

export interface ThemeTogglerProps {
   size?: "icon-sm" | "icon" | "icon-lg";
   variant?: "ghost" | "outline" | "default";
}

export interface AuthProviderProps {
   children: ReactNode;
   authOnly?: boolean | "reverse";
}

export interface ProductProps {
   data: Product;
   className?: string;
}

export interface PaginationProps {
   total: number;
   skip: number;
   limit: number;
   onPageChange: (skip: number) => void;
}

export interface ProductReviewProps {
   data: Product["reviews"][0];
   className?: string;
}

export interface RecpieProps {
   className?: string;
   data: Recipe;
}

export interface PostProps {
   className?: string;
   data: Post;
}

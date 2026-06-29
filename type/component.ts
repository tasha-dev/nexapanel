// Codes by mahdi tasha
// Importing part
import { ReactNode } from "react";
import { Comment, Post, Product, Quote, Recipe, Todo } from "./general";

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

export interface TodoProps {
   className?: string;
   data: Todo;
}

export interface QuoteProps {
   className?: string;
   data: Quote;
}

export interface CommentProps {
   className?: string;
   data: Comment;
}

export interface AddToCartButtonProps {
   variant?: "ghost" | "outline" | "default";
   className?: string;
   product: {
      id: number;
      stock: number;
   };
}

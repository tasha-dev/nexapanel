// Codes by mahdi tasha
// Importing part
import { ReactNode } from "react";
import { Cart, Comment, Post, Product, Quote, Recipe, Todo } from "./general";
import { GETCart, GETMeType } from "./api";

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
   product: Product;
}

export interface CartItemProps {
   className?: string;
   data: Cart;
   onDelete?: () => void;
}

export interface AdminLayoutProps {
   children: ReactNode;
   className?: string;
   title: string;
}

export interface ClassOnlytProps {
   className?: string;
}

export interface DatePickerProps {
   className?: string;
   value?: Date;
   onValueChange?: (date?: Date) => void;
   disableAfterToday?: boolean;
   "aria-invalid"?: boolean;
}

export interface DialogProps {
   refetch?: () => void;
   open?: boolean;
   onOpenChange?: (open: boolean) => void;
}

export interface EditUserDialogProps extends DialogProps {
   info: GETMeType;
}

export interface DeleteUserDialogProps extends DialogProps {
   id: number;
}

export interface EditCartDialogProps extends DialogProps {
   data: {
      id: number;
      products: Cart[];
   };
}

export interface DeleteCartDialogProps extends DialogProps {
   id: number;
}

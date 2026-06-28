// Codes by mahdi tasha
// Importing part
import { Post, Product, Recipe } from "./general";

// Creating and exporting type retriven data from api
export interface GETMeType {
   id: number;
   username: string;
   email: string;
   firstName: string;
   lastName: string;
   gender: string;
   image: string;
}

export interface GETProductType {
   products: Product[];
   total: number;
   skip: number;
   limit: number;
}

export type GETCategoriesType = {
   slug: string;
   name: string;
   url: string;
}[];

export interface GETCart {
   id: number;
   products: {
      id: number;
      title: string;
      price: number;
      quantity: number;
      total: number;
      discountPercentage: number;
      discountedTotal: number;
      thumbnail: string;
   }[];
   total: number;
   discountedTotal: number;
   userId: number;
   totalProducts: number;
   totalQuantity: number;
}

export interface POSTLoginType {
   id: number;
   username: string;
   email: string;
   firstName: string;
   lastName: string;
   gender: "male" | "female";
   image: string;
   accessToken: string;
   refreshToken: string;
}

export interface POSTRefreshType {
   refreshToken: string;
   accessToken: string;
}

export interface GETRecipeType {
   recipes: Recipe[];
   total: number;
   skip: number;
   limit: number;
}

export interface GETPostsType {
   posts: Post[];
   total: number;
   skip: number;
   limit: number;
}

// Codes by mahdi tasha
// Importing part
import { Product } from "./general";

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

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

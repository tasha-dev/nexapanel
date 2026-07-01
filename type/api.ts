// Codes by mahdi tasha
// Importing part
import { Comment, Post, Product, Quote, Recipe, Todo } from "./general";

// Creating and exporting type retriven data from api
export interface GETMeType {
   id: number;
   firstName: string;
   lastName: string;
   maidenName: string;
   age: number;
   gender: "male" | "female";
   email: string;
   phone: string;
   username: string;
   password: string;
   birthDate: string;
   image: string;
   bloodGroup: string;
   height: number;
   weight: number;
   eyeColor: string;
   hair: {
      color: string;
      type: string;
   };
   ip: string;
   address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
         lat: number;
         lng: number;
      };
      country: string;
   };
   macAddress: string;
   university: string;
   bank: {
      cardExpire: string;
      cardNumber: string;
      cardType: string;
      currency: string;
      iban: string;
   };
   company: {
      department: string;
      name: string;
      title: string;
      address: {
         address: string;
         city: string;
         state: string;
         stateCode: string;
         postalCode: string;
         coordinates: {
            lat: number;
            lng: number;
         };
         country: string;
      };
   };
   ein: number;
   ssn: number;
   userAgent: string;
   crypto: {
      coin: string;
      wallet: string;
      network: string;
   };
   role: "admin" | "user";
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
   carts: {
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
   }[];
   total: number;
   skip: number;
   limit: number;
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

export type GETPostsTags = {
   slug: string;
   name: string;
   url: string;
}[];

export interface GETTodoType {
   todos: Todo[];
   total: number;
   skip: number;
   limit: number;
}

export interface GETQuoteType {
   quotes: Quote[];
   total: number;
   skip: number;
   limit: number;
}

export interface GETCommentsType {
   comments: Comment[];
   total: number;
   skip: number;
   limit: number;
}

export interface GETUsersType {
   users: GETMeType[];
   total: number;
   skip: number;
   limit: number;
}

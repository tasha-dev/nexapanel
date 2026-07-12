// Codes by mahdi tasha
// Forcing next.js to treat this as a client component
"use client";

// Importing part
import { axiosInstance } from "@/lib/axios";
import { GETCategoriesType, GETProductType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import {
   Delete,
   Ellipsis,
   Loader2,
   Pen,
   ShoppingCart,
   Star,
} from "lucide-react";
import {
   Alert,
   AlertAction,
   AlertDescription,
   AlertTitle,
} from "@/component/ui/alert";
import { Button } from "@/component/ui/button";
import {
   Empty,
   EmptyDescription,
   EmptyHeader,
   EmptyMedia,
   EmptyTitle,
} from "@/component/ui/empty";
import { createContext, useState } from "react";
import Pagination from "@/component/pagination";
import {
   Table,
   TableBody,
   TableCell,
   TableHeader,
   TableRow,
} from "@/component/ui/table";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu";
import { Input } from "@/component/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/component/ui/select";
import { Product } from "@/type/general";
import Image from "next/image";
import { formatCurrency } from "@/lib/util";
import AddNewProduct from "./dialog/addProduct";
import EditProduct from "./dialog/editProduct";
import DeleteProduct from "./dialog/deleteProduct";

// Defining context
export const categoriesContext = createContext<GETCategoriesType>([]);

// Creating and exporting ProductsContainer component as default
export default function ProductsContainer() {
   // Defining hooks
   const [productInfoEdit, setProductInfoEdit] = useState<Product | undefined>(
      undefined,
   );

   const [productDeleteID, setProductDeleteID] = useState<number | undefined>(
      undefined,
   );

   const [skip, setSkip] = useState(0);
   const [searchAttempt, setSearchAttempt] = useState("");
   const [search, setSearch] = useState("");
   const [order, setOrder] = useState<"desc" | "asc">("desc");
   const productsQuery = useQuery<GETProductType>({
      queryKey: ["products", skip, search, order],
      queryFn: async () => {
         const response = await axiosInstance.get(
            `/products?limit=20&skip=${skip}&order=${order}${search ? `&search?q=${search}` : ""}`,
         );
         return response.data;
      },
   });

   const categoriesQuery = useQuery<GETCategoriesType>({
      queryKey: ["categories"],
      queryFn: async () => {
         const response = await axiosInstance.get(`/products/categories/`);
         return response.data;
      },
      enabled: productsQuery.isPending && productsQuery.data,
   });

   // Defining variables
   const isLoading = productsQuery.isLoading || categoriesQuery.isLoading;
   const isError = productsQuery.isError || categoriesQuery.isError;

   // Returning JSX
   return (
      <>
         {productDeleteID && (
            <DeleteProduct
               id={productDeleteID}
               open
               refetch={productsQuery.refetch}
               onOpenChange={(open) => {
                  if (!open) {
                     setProductDeleteID(undefined);
                  }
               }}
            />
         )}
         {isLoading ? (
            <div className="h-[500px] flex items-center justify-center">
               <Loader2 className="size-8 animate-spin" />
            </div>
         ) : isError ? (
            <Alert variant={"destructive"}>
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>
                  There was an error while trying to fetch the Products.
               </AlertDescription>
               <AlertAction>
                  <Button
                     onClick={() => {
                        productsQuery.refetch();
                        categoriesQuery.refetch();
                     }}
                  >
                     Try again
                  </Button>
               </AlertAction>
            </Alert>
         ) : !productsQuery.isPending &&
           !productsQuery.isError &&
           productsQuery.data ? (
            productsQuery.data.total === 0 ? (
               <Empty>
                  <EmptyHeader>
                     <EmptyMedia variant={"icon"}>
                        <ShoppingCart />
                     </EmptyMedia>
                     <EmptyTitle>Nothing to show</EmptyTitle>
                     <EmptyDescription>
                        The list is empty and there is nothing to show !
                     </EmptyDescription>
                  </EmptyHeader>
               </Empty>
            ) : (
               <categoriesContext.Provider
                  value={categoriesQuery.data ? categoriesQuery.data : []}
               >
                  {productInfoEdit && (
                     <EditProduct
                        refetch={productsQuery.refetch}
                        data={productInfoEdit}
                        open
                        onOpenChange={(open) => {
                           if (!open) {
                              setProductInfoEdit(undefined);
                           }
                        }}
                     />
                  )}
                  <div className="space-y-4">
                     <div className="flex gap-3">
                        <Input
                           className="flex-1"
                           placeholder="Search term"
                           onChange={(e) => setSearchAttempt(e.target.value)}
                           value={searchAttempt}
                        />
                        <Button
                           className="shrink-0"
                           onClick={() => {
                              setSearch(searchAttempt);
                           }}
                        >
                           Search
                        </Button>
                        <Select
                           value={order}
                           onValueChange={(value: "desc" | "asc") => {
                              setOrder(value);
                           }}
                        >
                           <SelectTrigger className="shrink-0">
                              <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="desc">Desc</SelectItem>
                              <SelectItem value="asc">Asc</SelectItem>
                           </SelectContent>
                        </Select>
                        <AddNewProduct refetch={productsQuery.refetch} />
                     </div>
                     {productsQuery.isRefetching ? (
                        <div className="h-[500px] flex items-center justify-center">
                           <Loader2 className="size-8 animate-spin" />
                        </div>
                     ) : (
                        <Table>
                           <TableHeader>
                              <TableRow>
                                 <TableCell>Id</TableCell>
                                 <TableCell>Info</TableCell>
                                 <TableCell>Brand</TableCell>
                                 <TableCell>Category</TableCell>
                                 <TableCell>Price</TableCell>
                                 <TableCell>Discount Percentage</TableCell>
                                 <TableCell>Rating</TableCell>
                                 <TableCell>Stock</TableCell>
                                 <TableCell />
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {productsQuery.data.products.map(
                                 (item, index) => (
                                    <TableRow key={index}>
                                       <TableCell>{item.id}</TableCell>
                                       <TableCell>
                                          <div className="flex items-center justify-start gap-2">
                                             <Image
                                                alt={"Thumbnail"}
                                                src={item.thumbnail}
                                                width={100}
                                                height={100}
                                                className="size-8 object-cover rounded-full bg-muted shrink-0"
                                             />
                                             <div className="flex-1 overflow-hidden">
                                                <span className="font-semibold text-sm block truncate mb-0.5">
                                                   {item.title}
                                                </span>
                                                <span className="block truncate font-normal text-xs text-current/50">
                                                   {item.description.slice(
                                                      0,
                                                      20,
                                                   )}
                                                </span>
                                             </div>
                                          </div>
                                       </TableCell>
                                       <TableCell>
                                          {item.brand ?? "-"}
                                       </TableCell>
                                       <TableCell>{item.category}</TableCell>
                                       <TableCell>
                                          {formatCurrency(item.price)}
                                       </TableCell>
                                       <TableCell>
                                          {item.discountPercentage} %
                                       </TableCell>
                                       <TableCell className="flex items-center justify-center">
                                          <div className="flex items-center justify-start">
                                             {item.rating}
                                             <Star className="fill-current size-3 ml-1" />
                                          </div>
                                       </TableCell>
                                       <TableCell>{item.stock}</TableCell>
                                       <TableCell className="justify-end flex">
                                          <DropdownMenu>
                                             <DropdownMenuTrigger asChild>
                                                <Button
                                                   size={"icon-sm"}
                                                   variant={"outline"}
                                                   className="text-foreground"
                                                >
                                                   <Ellipsis />
                                                </Button>
                                             </DropdownMenuTrigger>
                                             <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                   onSelect={() => {
                                                      setProductInfoEdit(item);
                                                   }}
                                                >
                                                   <Pen />
                                                   Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                   variant="destructive"
                                                   onSelect={() => {
                                                      setProductDeleteID(
                                                         item.id,
                                                      );
                                                   }}
                                                >
                                                   <Delete />
                                                   Delete
                                                </DropdownMenuItem>
                                             </DropdownMenuContent>
                                          </DropdownMenu>
                                       </TableCell>
                                    </TableRow>
                                 ),
                              )}
                           </TableBody>
                        </Table>
                     )}
                     <Pagination
                        total={productsQuery.data.total}
                        skip={productsQuery.data.skip}
                        limit={productsQuery.data.limit}
                        onPageChange={(page) => {
                           setSkip(page);
                        }}
                     />
                  </div>
               </categoriesContext.Provider>
            )
         ) : (
            false
         )}
      </>
   );
}

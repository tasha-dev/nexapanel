// Codes by mahdi tasha
// Forcing next.js to treat this as a client component
"use client";

// Importing part
import { axiosInstance } from "@/lib/axios";
import { GETCart } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { Ellipsis, Loader2, ShoppingCart } from "lucide-react";
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
import { useContext, useState } from "react";
import Pagination from "@/component/pagination";
import {
   Table,
   TableBody,
   TableCell,
   TableHeader,
   TableRow,
} from "@/component/ui/table";
import { cn, formatCurrency } from "@/lib/util";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu";
import { MeContext } from "@/component/layout/authProvider";
import { EditCartDialogProps } from "@/type/component";
import EditCart from "./dialog/editCart";
import DeleteCart from "./dialog/deleteCart";

// Creating and exporting CartsContainer component as default
export default function CartsContainer() {
   // Defining hooks
   const [cartInfoEdit, setCartInfoEdit] = useState<
      EditCartDialogProps["data"] | undefined
   >(undefined);

   const [cartDeleteID, setCartDeleteID] = useState<number | undefined>(
      undefined,
   );

   const [skip, setSkip] = useState(0);
   const userInfo = useContext(MeContext);
   const cartsQuery = useQuery<GETCart>({
      queryKey: ["carts-admin"],
      queryFn: async () => {
         const response = await axiosInstance.get(
            `/carts?limit=20&skip=${skip}`,
         );
         return response.data;
      },
   });

   // Returning JSX
   return (
      <>
         {cartInfoEdit && (
            <EditCart
               data={cartInfoEdit}
               open
               refetch={cartsQuery.refetch}
               onOpenChange={(open) => {
                  if (!open) setCartInfoEdit(undefined);
               }}
            />
         )}
         {cartDeleteID && (
            <DeleteCart
               id={cartDeleteID}
               open
               refetch={cartsQuery.refetch}
               onOpenChange={(open) => {
                  if (!open) setCartDeleteID(undefined);
               }}
            />
         )}
         {cartsQuery.isPending ? (
            <div className="h-[500px] flex items-center justify-center">
               <Loader2 className="size-8 animate-spin" />
            </div>
         ) : cartsQuery.isError ? (
            <Alert variant={"destructive"}>
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>
                  There was an error while trying to fetch the Carts.
               </AlertDescription>
               <AlertAction>
                  <Button onClick={() => cartsQuery.refetch()}>
                     Try again
                  </Button>
               </AlertAction>
            </Alert>
         ) : !cartsQuery.isPending && !cartsQuery.isError && cartsQuery.data ? (
            cartsQuery.data.total === 0 ? (
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
               <div className="space-y-4">
                  {cartsQuery.isRefetching ? (
                     <div className="h-[500px] flex items-center justify-center">
                        <Loader2 className="size-8 animate-spin" />
                     </div>
                  ) : (
                     <Table>
                        <TableHeader>
                           <TableRow>
                              <TableCell>Id</TableCell>
                              <TableCell>Total Products</TableCell>
                              <TableCell>Total Quantity</TableCell>
                              <TableCell>Discounted Total</TableCell>
                              <TableCell>Total</TableCell>
                              <TableCell />
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {cartsQuery.data.carts.map((item, index) => (
                              <TableRow
                                 key={index}
                                 className={cn(
                                    userInfo && userInfo !== "401"
                                       ? userInfo.id === item.userId
                                          ? "text-indigo-500 bg-current/5 border-current/30 hover:bg-current/20"
                                          : ""
                                       : "",
                                 )}
                              >
                                 <TableCell>{item.id}</TableCell>
                                 <TableCell>{item.totalProducts}</TableCell>
                                 <TableCell>{item.totalQuantity}</TableCell>
                                 <TableCell className="text-destructive">
                                    {formatCurrency(item.discountedTotal)}
                                 </TableCell>
                                 <TableCell>
                                    {formatCurrency(item.total)}
                                 </TableCell>
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
                                                setCartInfoEdit({
                                                   id: item.id,
                                                   products: item.products,
                                                });
                                             }}
                                          >
                                             Edit cart
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                             variant="destructive"
                                             onSelect={() =>
                                                setCartDeleteID(item.id)
                                             }
                                          >
                                             Delete cart
                                          </DropdownMenuItem>
                                       </DropdownMenuContent>
                                    </DropdownMenu>
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  )}
                  <Pagination
                     total={cartsQuery.data.total}
                     skip={cartsQuery.data.skip}
                     limit={cartsQuery.data.limit}
                     onPageChange={(page) => {
                        setSkip(page);
                     }}
                  />
               </div>
            )
         ) : (
            false
         )}
      </>
   );
}

// Codes by mahdi tasha
// Forcing next.js to rende this page as client side
"use client";

// Importing part
import Pagination from "@/component/pagination";
import Recpie from "@/component/recepie";
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
import { Input } from "@/component/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/component/ui/select";
import { axiosInstance } from "@/lib/axios";
import { GETRecipeType } from "@/type/api";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Pizza } from "lucide-react";
import { useState } from "react";

// Creating and exporting TagRecepiesContainer component as default
export default function TagRecepiesContainer() {
   // Defining hooks
   const param = useParams<{
      tag: string;
   }>();

   const [skip, setSkip] = useState(0);
   const [searchAttempt, setSearchAttempt] = useState("");
   const [search, setSearch] = useState("");
   const [order, setOrder] = useState<"desc" | "asc">("desc");
   const recepies = useQuery<GETRecipeType>({
      queryKey: ["recepies", skip, search, order],
      queryFn: async () => {
         const data = await axiosInstance.get(
            `/recipes/tag/${param.tag}?skip=${skip}&limit=9&order=${order}${search ? `&search?q=${search}` : ""}`,
         );

         return data.data;
      },
   });

   // Returning JSX
   return (
      <main>
         {recepies.isPending ? (
            <div className="h-[500px] flex items-center justify-center">
               <Loader2 className="size-8 animate-spin" />
            </div>
         ) : recepies.isError ? (
            <Alert variant={"destructive"}>
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>
                  There was an error while trying to fetch the recepies.
               </AlertDescription>
               <AlertAction>
                  <Button onClick={() => recepies.refetch()}>Try again</Button>
               </AlertAction>
            </Alert>
         ) : !recepies.isPending && !recepies.isError && recepies.data ? (
            recepies.data.total === 0 ? (
               <Empty>
                  <EmptyHeader>
                     <EmptyMedia>
                        <Pizza />
                     </EmptyMedia>
                     <EmptyTitle>Nothing to show</EmptyTitle>
                     <EmptyDescription>
                        The list is empty and there is nothing to show !
                     </EmptyDescription>
                  </EmptyHeader>
               </Empty>
            ) : (
               <>
                  <div className="flex gap-3 mb-5">
                     <Input
                        className="flex-1"
                        placeholder="Search term"
                        onChange={(e) => setSearchAttempt(e.target.value)}
                        value={searchAttempt}
                     />
                     <Button
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
                  </div>
                  {recepies.isRefetching ? (
                     <div className="h-[500px] flex items-center justify-center">
                        <Loader2 className="size-8 animate-spin" />
                     </div>
                  ) : (
                     <>
                        <div className="grid lg:grid-cols-3 gap-5 mb-10 align-items-center">
                           {recepies.data.recipes.map((item, index) => (
                              <Recpie data={item} key={index} />
                           ))}
                        </div>
                     </>
                  )}
                  <Pagination
                     total={recepies.data.total}
                     skip={recepies.data.skip}
                     limit={recepies.data.limit}
                     onPageChange={(page) => {
                        setSkip(page);
                     }}
                  />
               </>
            )
         ) : (
            false
         )}
      </main>
   );
}

// Codes by mahdi tasha
// Forcing next.js to treat this as a client component
"use client";

// Importing part
import { axiosInstance } from "@/lib/axios";
import { GETRecipeType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import {
   Delete,
   Ellipsis,
   Hash,
   Loader2,
   Pen,
   Pizza,
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
import { Recipe } from "@/type/general";
import Image from "next/image";
import AddNewRecipe from "./dialog/addNewRecipe";
import { Badge } from "@/component/ui/badge";
import EditRecipe from "./dialog/editRecipe";

// Defining context
export const tagsContext = createContext<string[]>([]);

// Creating and exporting RecipesContainer component as default
export default function RecipesContainer() {
   // Defining hooks
   const [recipesInfoEdit, setRecipesInfoEdit] = useState<Recipe | undefined>(
      undefined,
   );

   const [recipeDeleteID, setRecipeDeleteID] = useState<number | undefined>(
      undefined,
   );

   const [skip, setSkip] = useState(0);
   const [searchAttempt, setSearchAttempt] = useState("");
   const [search, setSearch] = useState("");
   const [order, setOrder] = useState<"desc" | "asc">("desc");
   const recipesQuery = useQuery<GETRecipeType>({
      queryKey: ["recipes", skip, search, order],
      queryFn: async () => {
         const response = await axiosInstance.get(
            `/recipes?limit=20&skip=${skip}&order=${order}${search ? `&search?q=${search}` : ""}`,
         );
         return response.data;
      },
   });

   const tagsQuery = useQuery<string[]>({
      queryKey: ["tags"],
      queryFn: async () => {
         const response = await axiosInstance.get(`/recipes/tags/`);
         return response.data;
      },
      enabled: recipesQuery.isPending && recipesQuery.data,
   });

   // Defining variables
   const isLoading = recipesQuery.isLoading || tagsQuery.isLoading;
   const isError = recipesQuery.isError || tagsQuery.isError;

   // Returning JSX
   return (
      <>
         {recipeDeleteID && "DELETE"}
         {isLoading ? (
            <div className="h-[500px] flex items-center justify-center">
               <Loader2 className="size-8 animate-spin" />
            </div>
         ) : isError ? (
            <Alert variant={"destructive"}>
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>
                  There was an error while trying to fetch the Recipes.
               </AlertDescription>
               <AlertAction>
                  <Button
                     onClick={() => {
                        recipesQuery.refetch();
                        tagsQuery.refetch();
                     }}
                  >
                     Try again
                  </Button>
               </AlertAction>
            </Alert>
         ) : !recipesQuery.isPending &&
           !recipesQuery.isError &&
           recipesQuery.data ? (
            recipesQuery.data.total === 0 ? (
               <Empty>
                  <EmptyHeader>
                     <EmptyMedia variant={"icon"}>
                        <Pizza />
                     </EmptyMedia>
                     <EmptyTitle>Nothing to show</EmptyTitle>
                     <EmptyDescription>
                        The list is empty and there is nothing to show !
                     </EmptyDescription>
                  </EmptyHeader>
               </Empty>
            ) : (
               <tagsContext.Provider
                  value={tagsQuery.data ? tagsQuery.data : []}
               >
                  {recipesInfoEdit && (
                     <EditRecipe
                        data={recipesInfoEdit}
                        open
                        refetch={recipesQuery.refetch}
                        onOpenChange={(open) => {
                           if (!open) {
                              setRecipesInfoEdit(undefined);
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
                        <AddNewRecipe refetch={recipesQuery.refetch} />
                     </div>
                     {recipesQuery.isRefetching ? (
                        <div className="h-[500px] flex items-center justify-center">
                           <Loader2 className="size-8 animate-spin" />
                        </div>
                     ) : (
                        <Table>
                           <TableHeader>
                              <TableRow>
                                 <TableCell>Id</TableCell>
                                 <TableCell>Info</TableCell>
                                 <TableCell>Prep time</TableCell>
                                 <TableCell>Servings</TableCell>
                                 <TableCell>Difficulty</TableCell>
                                 <TableCell>Rating</TableCell>
                                 <TableCell className="w-[300px]">
                                    Tags
                                 </TableCell>
                                 <TableCell />
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {recipesQuery.data.recipes.map((item, index) => (
                                 <TableRow key={index}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>
                                       <div className="flex items-center justify-start gap-2">
                                          <Image
                                             alt={"Thumbnail"}
                                             src={item.image}
                                             width={100}
                                             height={100}
                                             className="size-8 object-cover rounded-full bg-muted shrink-0"
                                          />
                                          <div className="flex-1 overflow-hidden">
                                             <span className="font-semibold text-sm block truncate mb-0.5">
                                                {item.name}
                                             </span>
                                             <span className="block truncate font-normal text-xs text-current/50">
                                                {item.cuisine}
                                             </span>
                                          </div>
                                       </div>
                                    </TableCell>
                                    <TableCell>
                                       {item.prepTimeMinutes} Minutes
                                    </TableCell>
                                    <TableCell>{item.servings}</TableCell>
                                    <TableCell>{item.difficulty}</TableCell>
                                    <TableCell>
                                       <div className="flex items-center justify-start">
                                          {item.rating}
                                          <Star className="fill-current size-3 ml-1" />
                                       </div>
                                    </TableCell>
                                    <TableCell>
                                       <div className="flex iems-center justify-start gap-2 flex-wrap">
                                          {item.tags.map((item, index) => (
                                             <Badge
                                                key={index}
                                                variant="default"
                                             >
                                                <Hash />
                                                {item}
                                             </Badge>
                                          ))}
                                       </div>
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
                                                   setRecipesInfoEdit(item);
                                                }}
                                             >
                                                <Pen />
                                                Edit
                                             </DropdownMenuItem>
                                             <DropdownMenuItem
                                                variant="destructive"
                                                onSelect={() => {
                                                   setRecipeDeleteID(item.id);
                                                }}
                                             >
                                                <Delete />
                                                Delete
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
                        total={recipesQuery.data.total}
                        skip={recipesQuery.data.skip}
                        limit={recipesQuery.data.limit}
                        onPageChange={(page) => {
                           setSkip(page);
                        }}
                     />
                  </div>
               </tagsContext.Provider>
            )
         ) : (
            false
         )}
      </>
   );
}

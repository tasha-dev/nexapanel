// Codes by mahdi tasha
// Forcing next.js to treat this as a client component
"use client";

// Importing part
import { axiosInstance } from "@/lib/axios";
import { GETPostsType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import {
   Delete,
   Ellipsis,
   Hash,
   Loader2,
   Pen,
   Star,
   ThumbsDown,
   ThumbsUp,
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
import { createContext, useContext, useState } from "react";
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
import { Post } from "@/type/general";
import { MeContext } from "@/component/layout/authProvider";
import { cn } from "@/lib/util";
import { Badge } from "@/component/ui/badge";

// Defining context
export const tagsContext = createContext<string[]>([]);

// Creating and exporting PostsContainer component as default
export default function PostsContainer() {
   // Defining hooks
   const [postInfoEdit, setPostInfoEdit] = useState<Post | undefined>(
      undefined,
   );

   const [postDeleteID, setPostDeleteID] = useState<number | undefined>(
      undefined,
   );

   const userInfo = useContext(MeContext);
   const [skip, setSkip] = useState(0);
   const [searchAttempt, setSearchAttempt] = useState("");
   const [search, setSearch] = useState("");
   const [order, setOrder] = useState<"desc" | "asc">("desc");
   const postsQuery = useQuery<GETPostsType>({
      queryKey: ["posts", skip, search, order],
      queryFn: async () => {
         const response = await axiosInstance.get(
            `/posts?limit=20&skip=${skip}&order=${order}${search ? `&search?q=${search}` : ""}`,
         );
         return response.data;
      },
   });

   const tagsQuery = useQuery<string[]>({
      queryKey: ["tags"],
      queryFn: async () => {
         const response = await axiosInstance.get(`/posts/tag-list/`);
         return response.data;
      },
      enabled: postsQuery.isPending && postsQuery.data,
   });

   // Defining variables
   const isLoading = postsQuery.isLoading || tagsQuery.isLoading;
   const isError = postsQuery.isError || tagsQuery.isError;

   // Returning JSX
   return (
      <>
         {postDeleteID && " DELTE "}
         {isLoading ? (
            <div className="h-[500px] flex items-center justify-center">
               <Loader2 className="size-8 animate-spin" />
            </div>
         ) : isError ? (
            <Alert variant={"destructive"}>
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>
                  There was an error while trying to fetch the Posts.
               </AlertDescription>
               <AlertAction>
                  <Button
                     onClick={() => {
                        postsQuery.refetch();
                        tagsQuery.refetch();
                     }}
                  >
                     Try again
                  </Button>
               </AlertAction>
            </Alert>
         ) : !postsQuery.isPending && !postsQuery.isError && postsQuery.data ? (
            postsQuery.data.total === 0 ? (
               <Empty>
                  <EmptyHeader>
                     <EmptyMedia variant={"icon"}>
                        <Pen />
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
                  {postInfoEdit && "EDIT"}
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
                        ADD
                     </div>
                     {postsQuery.isRefetching ? (
                        <div className="h-[500px] flex items-center justify-center">
                           <Loader2 className="size-8 animate-spin" />
                        </div>
                     ) : (
                        <Table>
                           <TableHeader>
                              <TableRow>
                                 <TableCell>Id</TableCell>
                                 <TableCell>User ID</TableCell>
                                 <TableCell>Title</TableCell>
                                 <TableCell>Body</TableCell>
                                 <TableCell className="w-[300px]">
                                    Tags
                                 </TableCell>
                                 <TableCell>Reactions</TableCell>
                                 <TableCell />
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {postsQuery.data.posts.map((item, index) => (
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
                                    <TableCell>{item.userId}</TableCell>
                                    <TableCell>
                                       {item.title.slice(0, 20).concat("...")}
                                    </TableCell>
                                    <TableCell>
                                       {item.body.slice(0, 20).concat("...")}
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
                                    <TableCell>
                                       <div className="flex iems-center justify-start gap-2">
                                          <Badge className="shrink-0 bg-green-500/20 text-green-500 border border-current/30">
                                             <ThumbsUp className="fill-current" />
                                             {item.reactions.likes}
                                          </Badge>
                                          <Badge className="shrink-0 bg-red-500/20 text-red-500 border border-current/30">
                                             <ThumbsDown className="fill-current" />
                                             {item.reactions.dislikes}
                                          </Badge>
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
                                                   setPostInfoEdit(item);
                                                }}
                                             >
                                                <Pen />
                                                Edit
                                             </DropdownMenuItem>
                                             <DropdownMenuItem
                                                variant="destructive"
                                                onSelect={() => {
                                                   setPostDeleteID(item.id);
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
                        total={postsQuery.data.total}
                        skip={postsQuery.data.skip}
                        limit={postsQuery.data.limit}
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

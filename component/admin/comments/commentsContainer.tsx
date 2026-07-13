// Codes by mahdi tasha
// Forcing next.js to treat this as a client component
"use client";

// Importing part
import { axiosInstance } from "@/lib/axios";
import { GETCommentsType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import {
   Delete,
   Ellipsis,
   Loader2,
   MessageCircleMore,
   Pen,
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
import { useContext, useState } from "react";
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
import { Comment } from "@/type/general";
import { cn } from "@/lib/util";
import { Badge } from "@/component/ui/badge";
import { MeContext } from "@/component/layout/authProvider";
import AddNewComment from "./dialog/addNewComment";

// Creating and exporting CommentsContainer component as default
export default function CommentsContainer() {
   // Defining hooks
   const [commentInfoEdit, setCommentInfoEdit] = useState<Comment | undefined>(
      undefined,
   );

   const [commentDeleteID, setCommentDeleteID] = useState<number | undefined>(
      undefined,
   );

   const [skip, setSkip] = useState(0);
   const userInfo = useContext(MeContext);
   const commentsQuery = useQuery<GETCommentsType>({
      queryKey: ["comments", skip],
      queryFn: async () => {
         const response = await axiosInstance.get(
            `/comments?limit=20&skip=${skip}`,
         );
         return response.data;
      },
   });

   // {recipeDeleteID && (
   //             <DeleteRecipe
   //                id={recipeDeleteID}
   //                refetch={recipesQuery.refetch}
   //                open
   //                onOpenChange={(open) => {
   //                   if (!open) setRecipeDeleteID(undefined);
   //                }}
   //             />
   //          )}
   //          {recipesInfoEdit && (
   //             <EditRecipe
   //                data={recipesInfoEdit}
   //                open
   //                refetch={recipesQuery.refetch}
   //                onOpenChange={(open) => {
   //                   if (!open) {
   //                      setRecipesInfoEdit(undefined);
   //                   }
   //                }}
   //             />
   //          )}

   // Returning JSX
   return (
      <div className="relative">
         {commentsQuery.isLoading ? (
            <div className="h-[500px] flex items-center justify-center">
               <Loader2 className="size-8 animate-spin" />
            </div>
         ) : commentsQuery.isError ? (
            <Alert variant={"destructive"}>
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>
                  There was an error while trying to fetch the Comments.
               </AlertDescription>
               <AlertAction>
                  <Button onClick={() => commentsQuery.refetch()}>
                     Try again
                  </Button>
               </AlertAction>
            </Alert>
         ) : !commentsQuery.isPending &&
           !commentsQuery.isError &&
           commentsQuery.data ? (
            commentsQuery.data.total === 0 ? (
               <Empty>
                  <EmptyHeader>
                     <EmptyMedia variant={"icon"}>
                        <MessageCircleMore />
                     </EmptyMedia>
                     <EmptyTitle>Nothing to show</EmptyTitle>
                     <EmptyDescription>
                        The list is empty and there is nothing to show !
                     </EmptyDescription>
                  </EmptyHeader>
               </Empty>
            ) : (
               <div className="space-y-4">
                  <AddNewComment refetch={commentsQuery.refetch} />
                  {commentsQuery.isRefetching ? (
                     <div className="h-[500px] flex items-center justify-center">
                        <Loader2 className="size-8 animate-spin" />
                     </div>
                  ) : (
                     <Table>
                        <TableHeader>
                           <TableRow>
                              <TableCell>Id</TableCell>
                              <TableCell>Post Id</TableCell>
                              <TableCell>user</TableCell>
                              <TableCell>body</TableCell>
                              <TableCell>likes</TableCell>
                              <TableCell />
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {commentsQuery.data.comments.map((item, index) => (
                              <TableRow
                                 key={index}
                                 className={cn(
                                    userInfo && userInfo !== "401"
                                       ? userInfo.id === item.user.id
                                          ? "text-indigo-500 bg-current/5 border-current/30 hover:bg-current/20"
                                          : ""
                                       : "",
                                 )}
                              >
                                 <TableCell>{item.id}</TableCell>
                                 <TableCell>{item.postId}</TableCell>
                                 <TableCell>
                                    <div className="flex items-center justify-start gap-2">
                                       <div className="size-8 rounded-full bg-muted shrink-0" />
                                       <div className="flex-1 overflow-hidden">
                                          <span className="font-semibold text-sm block truncate mb-0.5">
                                             {item.user.fullName}
                                          </span>
                                          <span className="block truncate font-normal text-xs text-current/50">
                                             @{item.user.username}
                                          </span>
                                       </div>
                                    </div>
                                 </TableCell>
                                 <TableCell>{item.body}</TableCell>
                                 <TableCell>
                                    <Badge className="shrink-0 bg-green-500/20 text-green-500 border border-current/30">
                                       <ThumbsUp className="fill-current" />
                                       {item.likes}
                                    </Badge>
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
                                                setCommentInfoEdit(item);
                                             }}
                                          >
                                             <Pen />
                                             Edit
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                             variant="destructive"
                                             onSelect={() => {
                                                setCommentDeleteID(item.id);
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
                     total={commentsQuery.data.total}
                     skip={commentsQuery.data.skip}
                     limit={commentsQuery.data.limit}
                     onPageChange={(page) => {
                        setSkip(page);
                     }}
                  />
               </div>
            )
         ) : (
            false
         )}
      </div>
   );
}

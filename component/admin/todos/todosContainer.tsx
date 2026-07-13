// Codes by mahdi tasha
// Forcing next.js to treat this as a client component
"use client";

// Importing part
import { axiosInstance } from "@/lib/axios";
import { GETTodoType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import {
   CheckSquare,
   Delete,
   Ellipsis,
   Loader2,
   Pen,
   Square,
   User,
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
import { cn } from "@/lib/util";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu";
import { MeContext } from "@/component/layout/authProvider";
import { Todo } from "@/type/general";
import AddNewTodo from "./dialog/addNewTodo";

// Creating and exporting TodosContainer component as default
export default function TodosContainer() {
   // Defining hooks
   const [todoInfoEdit, setTodoInfoEdit] = useState<Todo | undefined>(
      undefined,
   );

   const [todoDeleteID, setTodoDeleteID] = useState<number | undefined>(
      undefined,
   );

   const [skip, setSkip] = useState(0);
   const userInfo = useContext(MeContext);
   const todosQuery = useQuery<GETTodoType>({
      queryKey: ["todos", skip],
      queryFn: async () => {
         const response = await axiosInstance.get(
            `/todos?limit=20&skip=${skip}`,
         );
         return response.data;
      },
   });

   // {userInfoEdit && (
   //    <EditUser
   //       info={userInfoEdit}
   //       open
   //       refetch={usersQuery.refetch}
   //       onOpenChange={(open) => {
   //          if (!open) setUserInfoEdit(undefined);
   //       }}
   //    />
   // )}
   // {userDeleteID && (
   //    <DeleteUser
   //       id={userDeleteID}
   //       open
   //       refetch={usersQuery.refetch}
   //       onOpenChange={(open) => {
   //          if (!open) setUserDeleteID(undefined);
   //       }}
   //    />
   // )}

   // Returning JSX
   return (
      <div className="relative">
         {todosQuery.isPending ? (
            <div className="h-[500px] flex items-center justify-center">
               <Loader2 className="size-8 animate-spin" />
            </div>
         ) : todosQuery.isError ? (
            <Alert variant={"destructive"}>
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>
                  There was an error while trying to fetch the Todos.
               </AlertDescription>
               <AlertAction>
                  <Button onClick={() => todosQuery.refetch()}>
                     Try again
                  </Button>
               </AlertAction>
            </Alert>
         ) : !todosQuery.isPending && !todosQuery.isError && todosQuery.data ? (
            todosQuery.data.total === 0 ? (
               <Empty>
                  <EmptyHeader>
                     <EmptyMedia variant={"icon"}>
                        <CheckSquare />
                     </EmptyMedia>
                     <EmptyTitle>Nothing to show</EmptyTitle>
                     <EmptyDescription>
                        The list is empty and there is nothing to show !
                     </EmptyDescription>
                  </EmptyHeader>
               </Empty>
            ) : (
               <div className="space-y-4">
                  <AddNewTodo refetch={todosQuery.refetch} />
                  {todosQuery.isRefetching ? (
                     <div className="h-[500px] flex items-center justify-center">
                        <Loader2 className="size-8 animate-spin" />
                     </div>
                  ) : (
                     <Table>
                        <TableHeader>
                           <TableRow>
                              <TableCell>Id</TableCell>
                              <TableCell>User Id</TableCell>
                              <TableCell>Todo</TableCell>
                              <TableCell>Completed</TableCell>
                              <TableCell />
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {todosQuery.data.todos.map((item, index) => (
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
                                 <TableCell>{item.todo}</TableCell>
                                 <TableCell>
                                    {item.completed ? (
                                       <CheckSquare className="size-5" />
                                    ) : (
                                       <Square className="size-5" />
                                    )}
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
                                                setTodoInfoEdit(item);
                                             }}
                                          >
                                             <Pen />
                                             Edit
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                             variant="destructive"
                                             onSelect={() => {
                                                setTodoDeleteID(item.id);
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
                     total={todosQuery.data.total}
                     skip={todosQuery.data.skip}
                     limit={todosQuery.data.limit}
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

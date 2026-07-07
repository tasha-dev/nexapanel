// Codes by mahdi tasha
// Forcing next.js to treat this as a client component
"use client";

// Importing part
import { axiosInstance } from "@/lib/axios";
import { GETMeType, GETUsersType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import {
   Delete,
   Ellipsis,
   Loader2,
   LucideQuote,
   Mars,
   Pen,
   Venus,
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
import Image from "next/image";
import { Badge } from "@/component/ui/badge";
import { cn } from "@/lib/util";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu";
import moment from "moment";
import { Input } from "@/component/ui/input";
import { MeContext } from "@/component/layout/authProvider";
import AddNewUser from "./dialog/addNewUser";
import EditUser from "./dialog/editUser";
import DeleteUser from "./dialog/deleteUser";

// Creating and exporting UsersContainer component as default
export default function UsersContainer() {
   // Defining hooks
   const [userInfoEdit, setUserInfoEdit] = useState<GETMeType | undefined>(
      undefined,
   );

   const [userDeleteID, setUserDeleteID] = useState<number | undefined>(
      undefined,
   );

   const [skip, setSkip] = useState(0);
   const [searchAttempt, setSearchAttempt] = useState("");
   const [search, setSearch] = useState("");
   const userInfo = useContext(MeContext);
   const usersQuery = useQuery<GETUsersType>({
      queryKey: ["users", skip, search],
      queryFn: async () => {
         const response = await axiosInstance.get(
            `/users?limit=20&skip=${skip}${search ? `&search?q=${search}` : ""}`,
         );
         return response.data;
      },
   });

   // Returning JSX
   return (
      <>
         {userInfoEdit && (
            <EditUser
               info={userInfoEdit}
               open
               refetch={usersQuery.refetch}
               onOpenChange={(open) => {
                  if (!open) setUserInfoEdit(undefined);
               }}
            />
         )}
         {userDeleteID && (
            <DeleteUser
               id={userDeleteID}
               open
               refetch={usersQuery.refetch}
               onOpenChange={(open) => {
                  if (!open) setUserDeleteID(undefined);
               }}
            />
         )}
         {usersQuery.isPending ? (
            <div className="h-[500px] flex items-center justify-center">
               <Loader2 className="size-8 animate-spin" />
            </div>
         ) : usersQuery.isError ? (
            <Alert variant={"destructive"}>
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>
                  There was an error while trying to fetch the Quotes.
               </AlertDescription>
               <AlertAction>
                  <Button onClick={() => usersQuery.refetch()}>
                     Try again
                  </Button>
               </AlertAction>
            </Alert>
         ) : !usersQuery.isPending && !usersQuery.isError && usersQuery.data ? (
            usersQuery.data.total === 0 ? (
               <Empty>
                  <EmptyHeader>
                     <EmptyMedia variant={"icon"}>
                        <LucideQuote />
                     </EmptyMedia>
                     <EmptyTitle>Nothing to show</EmptyTitle>
                     <EmptyDescription>
                        The list is empty and there is nothing to show !
                     </EmptyDescription>
                  </EmptyHeader>
               </Empty>
            ) : (
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
                     <AddNewUser refetch={usersQuery.refetch} />
                  </div>
                  {usersQuery.isRefetching ? (
                     <div className="h-[500px] flex items-center justify-center">
                        <Loader2 className="size-8 animate-spin" />
                     </div>
                  ) : (
                     <Table>
                        <TableHeader>
                           <TableRow>
                              <TableCell>Id</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Age</TableCell>
                              <TableCell>Gender</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>Phone Number</TableCell>
                              <TableCell>Role</TableCell>
                              <TableCell>Address</TableCell>
                              <TableCell />
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {usersQuery.data.users.map((item, index) => (
                              <TableRow
                                 key={index}
                                 className={cn(
                                    userInfo && userInfo !== "401"
                                       ? userInfo.id === item.id
                                          ? "text-indigo-500 bg-current/5 border-current/30 hover:bg-current/20"
                                          : ""
                                       : "",
                                 )}
                              >
                                 <TableCell>{item.id}</TableCell>
                                 <TableCell>
                                    <div className="flex items-center justify-start gap-2">
                                       <Image
                                          alt={`${item.firstName} ${item.lastName}'s image`}
                                          src={item.image}
                                          width={100}
                                          height={100}
                                          className="size-8 object-cover rounded-full bg-muted shrink-0"
                                       />
                                       <div className="flex-1 overflow-hidden">
                                          <span className="font-semibold text-sm block truncate mb-0.5">
                                             {item.firstName}
                                          </span>
                                          <span className="block truncate font-normal text-xs text-current/50">
                                             {item.lastName}
                                          </span>
                                       </div>
                                    </div>
                                 </TableCell>
                                 <TableCell>
                                    <span className="font-semibold text-sm block truncate mb-0.5">
                                       {item.age}
                                    </span>
                                    <span className="block truncate font-normal text-xs text-current/50">
                                       {moment(item.birthDate).format(
                                          "D of MMMM YYYY",
                                       )}
                                    </span>
                                 </TableCell>
                                 <TableCell>
                                    <Badge
                                       className={cn(
                                          item.gender === "male"
                                             ? "text-blue-500"
                                             : "text-pink-500",
                                          "bg-current/10 border border-current/20 w-full",
                                       )}
                                    >
                                       {item.gender === "female" ? (
                                          <Venus />
                                       ) : (
                                          <Mars />
                                       )}
                                       {item.gender}
                                    </Badge>
                                 </TableCell>
                                 <TableCell>{item.email}</TableCell>
                                 <TableCell>{item.phone}</TableCell>
                                 <TableCell>{item.role}</TableCell>
                                 <TableCell>
                                    <span className="font-semibold text-sm block truncate mb-0.5">
                                       {item.address.country}
                                    </span>
                                    <span className="block truncate font-normal text-xs text-current/50">
                                       {item.address.address}
                                    </span>
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
                                                setUserInfoEdit(item);
                                             }}
                                          >
                                             <Pen />
                                             Edit user
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                             variant="destructive"
                                             onSelect={() => {
                                                setUserDeleteID(item.id);
                                             }}
                                          >
                                             <Delete />
                                             Delete user
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
                     total={usersQuery.data.total}
                     skip={usersQuery.data.skip}
                     limit={usersQuery.data.limit}
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

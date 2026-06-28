// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Header from "@/component/header";
import Pagination from "@/component/pagination";
import Post from "@/component/post";
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
import { GETPostsType } from "@/type/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";

// Creating and exporting Posts page as default
export default function Posts() {
   // Defining hooks
   const [skip, setSkip] = useState(0);
   const [searchAttempt, setSearchAttempt] = useState("");
   const [search, setSearch] = useState("");
   const [order, setOrder] = useState<"desc" | "asc">("desc");
   const posts = useQuery<GETPostsType>({
      queryKey: ["posts", skip, order, search],
      queryFn: async () => {
         const data = await axiosInstance.get(
            `/posts?skip=${skip}&limit=9&order=${order}${search ? `&search?q=${search}` : ""}`,
         );
         return data.data;
      },
   });

   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert prose-neutral w-full max-w-full mb-10">
               <h1>Posts</h1>
            </div>
            <main>
               {posts.isPending ? (
                  <div className="h-[500px] flex items-center justify-center">
                     <Loader2 className="size-8 animate-spin" />
                  </div>
               ) : posts.isError ? (
                  <Alert variant={"destructive"}>
                     <AlertTitle>Error</AlertTitle>
                     <AlertDescription>
                        There was an error while trying to fetch the posts.
                     </AlertDescription>
                     <AlertAction>
                        <Button onClick={() => posts.refetch()}>
                           Try again
                        </Button>
                     </AlertAction>
                  </Alert>
               ) : !posts.isPending && !posts.isError && posts.data ? (
                  posts.data.total === 0 ? (
                     <Empty>
                        <EmptyHeader>
                           <EmptyMedia>
                              <ShoppingCart />
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
                        {posts.isRefetching ? (
                           <div className="h-[500px] flex items-center justify-center">
                              <Loader2 className="size-8 animate-spin" />
                           </div>
                        ) : (
                           <>
                              <div className="grid lg:grid-cols-3 gap-5 mb-10 align-items-center">
                                 {posts.data.posts.map((item, index) => (
                                    <Post data={item} key={index} />
                                 ))}
                              </div>
                           </>
                        )}
                        <Pagination
                           total={posts.data.total}
                           skip={posts.data.skip}
                           limit={posts.data.limit}
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
         </section>
      </>
   );
}

// Codes by mahdi tasha
// https://dummyjson.com/
// Forcing next.js to render this component as client side component
"use client";

import Header from "@/component/header";
import {
   Alert,
   AlertAction,
   AlertDescription,
   AlertTitle,
} from "@/component/ui/alert";
import { Badge } from "@/component/ui/badge";
import { Button } from "@/component/ui/button";
import { axiosInstance } from "@/lib/axios";
import { Post } from "@/type/general";
import { useQuery } from "@tanstack/react-query";
import { Hash, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Creating and exporting Single Post page as default
export default function SinglePost() {
   // Defining hooks
   const params = useParams<{ id: string }>();
   const post = useQuery<Post>({
      queryKey: ["post", params.id],
      queryFn: async () => {
         const data = await axiosInstance.get(`/posts/${params.id}`);
         return data.data;
      },
   });

   // Returning JSX
   return (
      <>
         <Header />
         <section className="p-4 max-w-4xl mx-auto lg:pb-4 pb-20 overflow-hidden">
            <main>
               {post.isPending ? (
                  <div className="h-[500px] flex items-center justify-center">
                     <Loader2 className="size-8 animate-spin" />
                  </div>
               ) : post.isError ? (
                  <Alert variant={"destructive"}>
                     <AlertTitle>Error</AlertTitle>
                     <AlertDescription>
                        There was an error while trying to fetch the post.
                     </AlertDescription>
                     <AlertAction>
                        <Button onClick={() => post.refetch()}>
                           Try again
                        </Button>
                     </AlertAction>
                  </Alert>
               ) : !post.isPending && !post.isError && post.data ? (
                  <>
                     <div className="prose dark:prose-invert prose-neutral lg:col-span-4 w-full max-w-full">
                        <h1>{post.data.title}</h1>
                        <div className="flex flex-wrap gap-1">
                           {post.data.tags.map((tag, index) => (
                              <Badge asChild key={index}>
                                 <Link
                                    href={`/posts/tags/${tag}`}
                                    className="no-underline"
                                 >
                                    <Hash />
                                    {tag}
                                 </Link>
                              </Badge>
                           ))}
                        </div>
                        <p>{post.data.body}</p>
                        <hr />
                        <ul>
                           <li>Views : {post.data.views}</li>
                           <li>Likes : {post.data.reactions.likes}</li>
                           <li>Dislikes : {post.data.reactions.dislikes}</li>
                        </ul>
                     </div>
                  </>
               ) : (
                  false
               )}
            </main>
         </section>
      </>
   );
}

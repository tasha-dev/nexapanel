// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { PostProps } from "@/type/component";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Hash, Search, ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/util";
import Link from "next/link";
import { Button } from "./ui/button";

// Creating and exporting Post component as default
export default function Post({ data, className }: PostProps) {
   // Returning JSX
   return (
      <Card className={cn("pt-0", className)}>
         <div className="relative z-0 overflow-hidden bg-muted-foreground h-[200px]">
            <div className="bg-linear-0 from-card to-transparent absolute w-full h-[200px] left-0 bottom-0 z-10" />
            <div className="z-20 p-4 absolute left-0 top-0 w-full">
               <div className="flex items-start justify-end gap-2 w-full">
                  <Badge className="shrink-0 bg-green-500/20 text-green-500 border border-current/30">
                     <ThumbsUp className="fill-current" />
                     {data.reactions.likes}
                  </Badge>
                  <Badge className="shrink-0 bg-red-500/20 text-red-500 border border-current/30">
                     <ThumbsDown className="fill-current" />
                     {data.reactions.dislikes}
                  </Badge>
               </div>
            </div>
         </div>
         <CardHeader>
            <CardTitle className="truncate">{data.title}</CardTitle>
            <CardDescription className="line-clamp-2">
               {data.body}
            </CardDescription>
         </CardHeader>
         <CardContent>
            <div className="flex overflow-auto no-scrollbar gap-1 flex-1">
               {data.tags.map((item, index) => (
                  <Badge key={index} asChild>
                     <Link href={`/posts/tags/${item}`}>
                        <Hash />
                        {item}
                     </Link>
                  </Badge>
               ))}
            </div>
         </CardContent>
         <CardFooter className="flex-col gap-3">
            <Button className="w-full" asChild>
               <Link href={`/posts/${data.id}`}>
                  <Search />
                  See Details
               </Link>
            </Button>
         </CardFooter>
      </Card>
   );
}

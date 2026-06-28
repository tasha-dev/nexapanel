// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { CommentProps } from "@/type/component";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "./ui/card";
import { cn } from "@/lib/util";
import { Badge } from "./ui/badge";
import { ThumbsUp } from "lucide-react";

// Creating and exporting Comment component as default
export default function Comment({ data, className }: CommentProps) {
   // Returning JSX
   return (
      <Card className={cn("pt-0", className)}>
         <div className="relative z-0 overflow-hidden bg-muted-foreground h-[200px]">
            <div className="bg-linear-0 from-card to-transparent absolute w-full h-[200px] left-0 bottom-0 z-10" />
            <div className="z-20 p-4 absolute left-0 top-0 w-full flex items-start justify-end">
               <Badge className="shrink-0 bg-green-500/20 text-green-500 border border-current/30">
                  <ThumbsUp className="fill-current" />
                  {data.likes}
               </Badge>
            </div>
         </div>
         <CardHeader className="flex items-center justify-start gap-2 overflow-hidden">
            <div className="size-9 rounded-full shrink-0 bg-foreground" />
            <div className="flex-1 overflow-hidden">
               <CardTitle>{data.user.fullName}</CardTitle>
               <span className="text-muted-foreground text-sm font-normal block truncate">
                  @{data.user.username}
               </span>
            </div>
         </CardHeader>
         <CardContent>
            <CardDescription>{data.body}</CardDescription>
         </CardContent>
      </Card>
   );
}

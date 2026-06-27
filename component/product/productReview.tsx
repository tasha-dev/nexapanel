// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { cn } from "@/lib/util";
import { ProductReviewProps } from "@/type/component";
import { Star } from "lucide-react";
import moment from "moment";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "../ui/card";

// Creating and exporting ProductReview component as default
export default function ProductReview({ data, className }: ProductReviewProps) {
   // Returning JSX
   return (
      <Card className={className}>
         <CardHeader className="flex items-center justify-between gap-3 w-full">
            <div className="flex-1">
               <CardTitle className="truncate">{data.reviewerName}</CardTitle>
               <CardDescription className="truncate">
                  {data.reviewerEmail}
               </CardDescription>
            </div>
            <span className="block shrink-0 font-normal text-muted-foreground text-sm">
               {moment(data.date).format("YYYY/MM/DD HH:MM")}
            </span>
         </CardHeader>
         <CardContent className="prose prose-neutral dark:prose-invert">
            <p>{data.comment}</p>
         </CardContent>
         <CardFooter className="flex items-center justify-start gap-1 w-full">
            {[...new Array(5)].map((_, index) => (
               <Star
                  key={index}
                  className={cn(
                     "size-5",
                     index < data.rating
                        ? "text-orange-500 fill-orange-500"
                        : "text-muted-foreground",
                  )}
               />
            ))}
         </CardFooter>
      </Card>
   );
}

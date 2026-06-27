// Codes by mahdi tasha
// Forcing next.js to rende this page as client side
"use client";

// Importing part
import { cn } from "@/lib/util";
import { RecpieProps } from "@/type/component";
import {
   Card,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Hash, Search, Star } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

// Creating and exporting Recpie component as default
export default function Recpie({ data, className }: RecpieProps) {
   return (
      <Card className={cn("pt-0", className)}>
         <div className="relative z-0 overflow-hidden">
            <Image
               alt={data.name}
               src={data.image}
               width={300}
               height={500}
               className="w-full h-[200px] object-cover rounded-none z-0"
            />
            <div className="bg-linear-0 from-card to-transparent absolute w-full h-[200px] left-0 bottom-0 z-10" />
            <div className="z-20 p-4 absolute left-0 top-0 w-full">
               <div className="flex items-start justify-between gap-2 w-full">
                  <div className="flex flex-wrap gap-1 flex-1">
                     {data.tags.map((item, index) => (
                        <Badge key={index}>
                           <Hash />
                           {item}
                        </Badge>
                     ))}
                  </div>
                  <Badge className="shrink-0">
                     <Star className="fill-current stroke-current" />
                     {data.rating}
                  </Badge>
               </div>
            </div>
         </div>
         <CardHeader>
            <CardTitle className="truncate">{data.name}</CardTitle>
            <CardDescription className="line-clamp-2">
               {data.instructions.join(" ")}
            </CardDescription>
         </CardHeader>
         <CardFooter>
            <Button asChild className="w-full">
               <Link href={`/recepies/${data.id}`}>
                  <Search />
                  View Recipe
               </Link>
            </Button>
         </CardFooter>
      </Card>
   );
}

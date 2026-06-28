// Codes by mahdi tasha
// Importing part
import { ProductProps } from "@/type/component";
import {
   Card,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/component/ui/card";
import Image from "next/image";
import { Button } from "@/component/ui/button";
import { Search, ShoppingCart, Tag } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/component/ui/badge";
import { cn } from "@/lib/util";

// Creating and exporting Product component as default
export default function Product({ data, className }: ProductProps) {
   // Returning JSX
   return (
      <Card className={cn("pt-0", className)}>
         <div className="relative z-0 overflow-hidden bg-muted-foreground">
            <Image
               alt={data.title}
               src={data.thumbnail}
               width={300}
               height={500}
               className="w-full h-[200px] object-cover rounded-none z-0"
            />
            <div className="bg-linear-0 from-card to-transparent absolute w-full h-[200px] left-0 bottom-0 z-10" />
            <div className="z-20 p-4 absolute left-0 top-0 w-full">
               <Badge className="absolute left-4 top-4" asChild>
                  <Link href={`/products/categories/${data.category}`}>
                     <Tag />
                     {data.category}
                  </Link>
               </Badge>
            </div>
         </div>
         <CardHeader>
            <CardTitle className="truncate">{data.title}</CardTitle>
            <CardDescription className="line-clamp-2">
               {data.description}
            </CardDescription>
         </CardHeader>
         <CardFooter className="flex-col gap-3">
            <Button className="w-full" asChild>
               <Link href={`/products/${data.id}`}>
                  <Search />
                  See Details
               </Link>
            </Button>
            <Button variant={"outline"} className="w-full">
               <ShoppingCart />
               Add To cart
            </Button>
         </CardFooter>
      </Card>
   );
}

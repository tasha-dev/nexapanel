// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { QuoteProps } from "@/type/component";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/util";

// creating and exporting Quote component as default
export default function Quote({ data, className }: QuoteProps) {
   // Returning JSX
   return (
      <Card className={cn("pt-0", className)}>
         <div className="relative z-0 overflow-hidden bg-muted-foreground h-[200px]">
            <div className="bg-linear-0 from-card to-transparent absolute w-full h-[200px] left-0 bottom-0 z-10" />
         </div>
         <CardHeader>
            <CardTitle>{data.author}</CardTitle>
            <CardDescription>{data.quote}</CardDescription>
         </CardHeader>
      </Card>
   );
}

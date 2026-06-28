// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { TodoProps } from "@/type/component";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { CheckSquare, Square } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/util";

// creating and exporting Todo component as default
export default function Todo({ data, className }: TodoProps) {
   // Returning JSX
   return (
      <Card className={cn("pt-0", className)}>
         <div className="relative z-0 overflow-hidden bg-muted-foreground h-[200px]">
            <div className="bg-linear-0 from-card to-transparent absolute w-full h-[200px] left-0 bottom-0 z-10" />
            <div className="z-20 p-4 absolute left-0 top-0 w-full flex items-start justify-end">
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        size={"icon"}
                        variant={"outline"}
                        className="shrink-0"
                     >
                        {data.completed ? <CheckSquare /> : <Square />}
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                     {data.completed ? "Completed" : "Not completed"}
                  </TooltipContent>
               </Tooltip>
            </div>
         </div>
         <CardHeader>
            <CardTitle>Todo Id : {data.id}</CardTitle>
            <CardDescription>{data.todo}</CardDescription>
         </CardHeader>
      </Card>
   );
}

// Codes by mahdi tasha
// Forcing next.js to render this component as client side
"use client";

// Importing part
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/util";
import { Button } from "@/component/ui/button";
import { Calendar } from "@/component/ui/calendar";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/component/ui/popover";
import { useState } from "react";
import { DatePickerProps } from "@/type/component";

// Creating and exporting DatePicker component
export function DatePicker({
   onValueChange,
   value = undefined,
   className,
   disableAfterToday = false,
   "aria-invalid": ariaInvalid = false,
}: DatePickerProps) {
   // Defining hooks
   const [date, setDate] = useState<Date | undefined>(value);

   // Returning JSX
   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               data-empty={!date}
               aria-invalid={ariaInvalid}
               className={cn(
                  "justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
                  className,
               )}
            >
               <CalendarIcon />
               {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0">
            <Calendar
               mode="single"
               selected={date}
               disabled={
                  disableAfterToday && {
                     after: new Date(),
                  }
               }
               onSelect={(value) => {
                  setDate(value);
                  onValueChange?.(value);
               }}
            />
         </PopoverContent>
      </Popover>
   );
}

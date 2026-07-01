// Codes by mahdi tash
// Importing part
import {
   Alert,
   AlertAction,
   AlertDescription,
   AlertTitle,
} from "@/component/ui/alert";
import { Button } from "./ui/button";
import Link from "next/link";
import { ClassOnlytProps } from "@/type/component";

// Creating and exporting ApiProviderNote component as default
export default function ApiProviderNote({ className }: ClassOnlytProps) {
   // Returning JSX
   return (
      <Alert className={className}>
         <AlertAction>
            <Button asChild>
               <Link target="_blank" href="https://dummyjson.com">
                  Api Provider
               </Link>
            </Button>
         </AlertAction>
         <AlertTitle>API Limitations</AlertTitle>
         <AlertDescription>
            Write operations (POST, PATCH, PUT, DELETE) are disabled because of
            the current API provider restrictions. Read-only features remain
            available.
         </AlertDescription>
      </Alert>
   );
}

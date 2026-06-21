// Codes by mahdi tasha
// Forcing next.js to treat this as a client component
"use client";

// Importing part
import { ChildrenOnlyProps } from "@/type/component";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Defining qury client
const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         retry: 1,
         refetchOnWindowFocus: false,
      },
   },
});

// Creating and exporting QueryClientProviderWrapper component as default
export default function QueryClientProviderWrapper({
   children,
}: ChildrenOnlyProps) {
   // Returning JSX
   return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
   );
}

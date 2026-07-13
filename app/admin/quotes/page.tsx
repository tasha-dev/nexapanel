// Codes by mahdi tasha
// Importing part
import type { Metadata } from "next";
import AdminLayout from "@/component/layout/adminLayout";
import QuotesContainer from "@/component/admin/quotesContainer";

// Defining metadata
export const metadata: Metadata = {
   title: "Quotes Dashboard",
};

// Creating and exporting Quotes Admin home page as default
export default function QuotesAdminPage() {
   // Returning JSX
   return (
      <AdminLayout title="Quotes Dashboard">
         <QuotesContainer />
      </AdminLayout>
   );
}

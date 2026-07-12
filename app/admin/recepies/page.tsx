// Codes by mahdi tasha
// Importing part
import type { Metadata } from "next";
import AdminLayout from "@/component/layout/adminLayout";
import RecepiesContainer from "@/component/admin/recepies/recepiesContainer";

// Defining metadata
export const metadata: Metadata = {
   title: "Recepies Dashboard",
};

// Creating and exporting Recepies admin home page as default
export default function RecepiesAdminPage() {
   // Returning JSX
   return (
      <AdminLayout title="Recepies Dashboard">
         <RecepiesContainer />
      </AdminLayout>
   );
}

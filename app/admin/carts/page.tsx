// Codes by mahdi tasha
// Importing part
import type { Metadata } from "next";
import AdminLayout from "@/component/layout/adminLayout";
import CartsContainer from "@/component/admin/carts/cartsContainer";

// Defining metadata
export const metadata: Metadata = {
   title: "Carts Dashboard",
};

// Creating and exporting Carts admin home page as default
export default function CartsAdminPage() {
   // Returning JSX
   return (
      <AdminLayout title="Carts Dashboard">
         <CartsContainer />
      </AdminLayout>
   );
}

// Codes by mahdi tasha
// Importing part
import type { Metadata } from "next";
import AdminLayout from "@/component/layout/adminLayout";
import ProductsContainer from "@/component/admin/products/productsContainer";

// Defining metadata
export const metadata: Metadata = {
   title: "Products Dashboard",
};

// Creating and exporting Products admin home page as default
export default function ProductsAdminPage() {
   // Returning JSX
   return (
      <AdminLayout title="Products Dashboard">
         <ProductsContainer />
      </AdminLayout>
   );
}

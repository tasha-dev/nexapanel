// Codes by mahdi tasha
// Importing part
import type { Metadata } from "next";
import AdminLayout from "@/component/layout/adminLayout";

// Defining metadata
export const metadata: Metadata = {
   title: "Dashboard",
};

// Creating and exporting Admin home page as default
export default function AdminPage() {
   // Returning JSX
   return <AdminLayout>HI</AdminLayout>;
}

// Codes by mahdi tasha
// Importing part
import type { Metadata } from "next";
import AdminLayout from "@/component/layout/adminLayout";
import UsersContainer from "@/component/admin/users/usersContainer";

// Defining metadata
export const metadata: Metadata = {
   title: "Users Dashboard",
};

// Creating and exporting Admin home page as default
export default function AdminPage() {
   // Returning JSX
   return (
      <AdminLayout title="Users Dashboard">
         <UsersContainer />
      </AdminLayout>
   );
}

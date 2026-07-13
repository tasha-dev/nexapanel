// Codes by mahdi tasha
// Importing part
import type { Metadata } from "next";
import AdminLayout from "@/component/layout/adminLayout";
import TodosContainer from "@/component/admin/todos/todosContainer";

// Defining metadata
export const metadata: Metadata = {
   title: "Todos Dashboard",
};

// Creating and exporting Todos Admin home page as default
export default function TodosAdminPage() {
   // Returning JSX
   return (
      <AdminLayout title="Todos Dashboard">
         <TodosContainer />
      </AdminLayout>
   );
}

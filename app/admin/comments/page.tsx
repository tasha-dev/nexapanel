// Codes by mahdi tasha
// Importing part
import type { Metadata } from "next";
import AdminLayout from "@/component/layout/adminLayout";
import CommentsContainer from "@/component/admin/comments/commentsContainer";

// Defining metadata
export const metadata: Metadata = {
   title: "Comments Dashboard",
};

// Creating and exporting Comments Admin home page as default
export default function CommentsAdminPage() {
   // Returning JSX
   return (
      <AdminLayout title="Comments Dashboard">
         <CommentsContainer />
      </AdminLayout>
   );
}

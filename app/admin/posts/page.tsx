// Codes by mahdi tasha
// Importing part
import type { Metadata } from "next";
import AdminLayout from "@/component/layout/adminLayout";
import PostsContainer from "@/component/admin/posts/postsContainer";

// Defining metadata
export const metadata: Metadata = {
   title: "Posts Dashboard",
};

// Creating and exporting Posts Admin home page as default
export default function PostsAdminPage() {
   // Returning JSX
   return (
      <AdminLayout title="Posts Dashboard">
         <PostsContainer />
      </AdminLayout>
   );
}

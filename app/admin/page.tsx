// Codes by mahdi tasha
// Importing part
import type { Metadata } from "next";
import AdminLayout from "@/component/layout/adminLayout";
import {
   Empty,
   EmptyContent,
   EmptyDescription,
   EmptyHeader,
   EmptyMedia,
   EmptyTitle,
} from "@/component/ui/empty";
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/component/ui/button";
import Link from "next/link";
import ApiProviderNote from "@/component/apiProviderNote";

// Defining metadata
export const metadata: Metadata = {
   title: "Dashboard",
};

// Creating and exporting Admin home page as default
export default function AdminPage() {
   // Returning JSX
   return (
      <AdminLayout title="Dashboard">
         <Empty>
            <EmptyHeader>
               <EmptyMedia variant={"icon"}>
                  <LayoutDashboard />
               </EmptyMedia>
               <EmptyTitle>Welcome to Your Dashboard 👋</EmptyTitle>
               <EmptyDescription>
                  Choose a section from the sidebar to get started. Your data
                  and tools will appear here once you select a page.
               </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
               <Button asChild>
                  <Link href="/admin/users">
                     <LayoutDashboard />
                     Get Started
                  </Link>
               </Button>
            </EmptyContent>
         </Empty>
         <ApiProviderNote className="max-w-lg mx-auto" />
      </AdminLayout>
   );
}

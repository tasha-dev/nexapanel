// Codes by mahdi tasha
// Importing part
import { RootLayoutProps } from "@/type/component";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/style.css";
import { cn } from "@/lib/util";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/component/ui/sonner";

// Defining metadata
export const metadata: Metadata = {
   title: {
      default: "NexaPanel",
      template: "%s | NexaPanel",
   },
   description:
      "NexaPanel is a modern SaaS admin dashboard built with Next.js, TypeScript, Tailwind CSS, and React Query.",
   keywords: [
      "NexaPanel",
      "Admin Dashboard",
      "SaaS Dashboard",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
      "Frontend",
   ],
   authors: [
      {
         name: "Mahdi Tasha",
      },
   ],
   creator: "Mahdi Tasha",
   openGraph: {
      title: "NexaPanel - Modern Admin Dashboard",
      description:
         "A modern frontend admin dashboard with analytics, product management, and API integration.",
      type: "website",
      siteName: "NexaPanel",
   },
   twitter: {
      card: "summary_large_image",
      title: "NexaPanel - Modern Admin Dashboard",
      description:
         "A modern SaaS-style admin dashboard built with Next.js and TypeScript.",
   },
   robots: {
      index: true,
      follow: true,
   },
};

// Defining fonts
const InterFont = Inter({
   subsets: ["latin"],
   display: "block",
   style: "normal",
   weight: ["300", "400", "500", "600", "700", "800"],
});

// Creating and exporting RootLayout component as default
export default function RootLayout({ children }: RootLayoutProps) {
   // Returning JSX
   return (
      <ThemeProvider>
         <html suppressHydrationWarning lang="en">
            <body
               className={cn(
                  "overflow-x-hidden overflow-y-auto bg-background text-foreground",
                  InterFont.className,
               )}
            >
               <Toaster />
               {children}
            </body>
         </html>
      </ThemeProvider>
   );
}

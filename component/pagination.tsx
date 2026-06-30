// Codes by mahdi tasha
// Forcing next.js to render this component as client side
"use client";

// Importing part
import {
   Pagination as ShadPagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationNext,
   PaginationPrevious,
   PaginationLink,
} from "@/component/ui/pagination";
import { PaginationProps } from "@/type/component";
import { useEffect } from "react";

// Creating and exporting Pagination component as default
export default function Pagination({
   total,
   skip,
   limit,
   onPageChange,
}: PaginationProps) {
   // Defining variables
   const safeTotal = Math.max(0, total ?? 0);
   const safeLimit = Math.max(1, limit ?? 10);
   const safeSkip = Math.max(0, skip ?? 0);

   const totalPages = Math.ceil(safeTotal / safeLimit);
   let currentPage = Math.floor(safeSkip / safeLimit) + 1;

   // Clamp currentPage to valid range
   currentPage = Math.max(1, Math.min(currentPage, totalPages || 1));

   // using useEffect to auto-correct skip if it's out of bounds (e.g., after last page click or data change)
   useEffect(() => {
      const expectedSkip = (currentPage - 1) * safeLimit;
      if (safeSkip !== expectedSkip && totalPages > 0) {
         onPageChange(expectedSkip);
      }
   }, [safeSkip, currentPage, safeLimit, totalPages, onPageChange]);

   // Defining a function handle page change
   const changePage = (page: number) => {
      const targetPage = Math.max(1, Math.min(page, totalPages || 1));
      onPageChange((targetPage - 1) * safeLimit);
   };

   // Defining a function to return array of things to render (pages tough)
   const getPages = () => {
      const pages: (number | "...")[] = [];

      if (totalPages <= 5) {
         return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      pages.push(1, 2, 3, "...", totalPages);
      return pages;
   };

   // Conditional rendering
   if (totalPages <= 1) {
      return false;
   } else {
      return (
         <ShadPagination>
            <PaginationContent>
               <PaginationItem>
                  <PaginationPrevious
                     href="#"
                     onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                           changePage(currentPage - 1);
                        }
                     }}
                  />
               </PaginationItem>
               {getPages().map((page, index) => (
                  <PaginationItem key={index}>
                     {page === "..." ? (
                        <PaginationEllipsis />
                     ) : (
                        <PaginationLink
                           href="#"
                           isActive={page === currentPage}
                           onClick={(e) => {
                              e.preventDefault();
                              if (page !== currentPage) {
                                 changePage(page);
                              }
                           }}
                        >
                           {page}
                        </PaginationLink>
                     )}
                  </PaginationItem>
               ))}
               <PaginationItem>
                  <PaginationNext
                     href="#"
                     onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) {
                           changePage(currentPage + 1);
                        }
                     }}
                  />
               </PaginationItem>
            </PaginationContent>
         </ShadPagination>
      );
   }
}

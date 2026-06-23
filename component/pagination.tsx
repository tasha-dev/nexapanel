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
import { useState } from "react";

// Creating and exporting Pagination component as default
export default function Pagination({
   total,
   skip,
   limit,
   onPageChange,
}: PaginationProps) {
   // Defining variables
   const currentPage = Math.floor(skip / limit) + 1;
   const totalPages = Math.ceil(total / limit);

   // Defining change of pages function
   const changePage = (page: number) => {
      onPageChange((page - 1) * limit);
   };

   // Getting number of pages
   const getPages = () => {
      const pages: (number | "...")[] = [];

      if (totalPages <= 5) {
         return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      if (currentPage <= 3) {
         pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
         pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
         pages.push(1, "...", currentPage, "...", totalPages);
      }

      return pages;
   };

   // Returning JSX
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

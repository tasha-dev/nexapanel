// Codes by mahdi tasha
// Creating and exporting Type of props in pages
export interface ErrorPageProps {
   error: Error & { digest?: string };
   reset: () => void;
}

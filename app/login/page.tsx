// Codes by mahdi tasha
// Importing part
import AuthProvider from "@/component/layout/authProvider";
import LoginForm from "@/component/loginForm";
import type { Metadata } from "next";

// Defining metadata
export const metadata: Metadata = {
   title: "Login",
};

// Creating and Exporting Login page as default
export default function Login() {
   // Returning JSX
   return (
      <AuthProvider authOnly="reverse">
         <section className="lg:min-h-dvh lg:flex lg:items-center lg:justify-center">
            <main>
               <LoginForm />
            </main>
         </section>
      </AuthProvider>
   );
}

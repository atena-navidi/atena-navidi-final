// travel-agency/app/layout.js

import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/components/partials/providers/TanstackQueryProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Torino Travel Agency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" >
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <QueryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
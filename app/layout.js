import QueryProvider from "@/components/partials/providers/TanstackQueryProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Torino Travel Agency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster/>
      </body>
    </html>
  );
}



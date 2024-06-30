import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Grazle Admin",
  description: "Grazle Admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <ToastContainer />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "বাজার দর | প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর এক জায়গায়।",
  icons: { icon: "/logo-icon.png" },
};

export default function RootLayout({ children }) {
  return (
  <html lang="bn" data-theme="bazardor">
  <head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet"/></head>
  <body className="flex min-h-screen flex-col">
  <Navbar />
  <main className="flex-1">{children}</main>
  <Footer />
  <Toaster position="top-center" toastOptions={{ style: { fontFamily: "var(--font-sans)", fontSize: "14px", color: "#1d271f" } }}/>
  </body>
  </html>
  );
}
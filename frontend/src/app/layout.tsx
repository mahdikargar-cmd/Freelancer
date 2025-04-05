import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import React from "react";
import { AuthProvider } from "@/components/context/AuthContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className="dark:bg-color6 bg-light-color1" dir="rtl"
      >
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

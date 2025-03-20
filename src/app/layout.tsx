"use client"

import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import React from "react";
import { AuthProvider } from "@/components/context/AuthContext";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();

  if (pathname.startsWith("/login") || pathname.startsWith("/signUp")) {
    return (
      <html lang="en">

        <body
          className="bg-color6" dir="rtl"
        >
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">

        <body
          className="bg-color6" dir="rtl"
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
}

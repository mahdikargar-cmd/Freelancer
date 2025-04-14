import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import React from "react";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" dir="rtl">
        <body className="dark:bg-color6 bg-light-color1">
        <Header/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
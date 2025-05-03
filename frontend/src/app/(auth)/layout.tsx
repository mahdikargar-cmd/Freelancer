import "../globals.css";
import React from "react";
import Header from "@/components/header";

export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" dir="rtl">
        <body className="dark:bg-color6 bg-light-color1">
        <Header/>
        {children}
        </body>
        </html>
    );
}
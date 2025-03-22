"use client";

import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import { AuthProvider } from "./context/AuthContext";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      {pathname.startsWith("/login") || pathname.startsWith("/signUp") ? (
        <>
          <Header />
          {children}
        </>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </AuthProvider>
  );
}

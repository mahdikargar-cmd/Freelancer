"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const auth = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!auth || auth.loading) return;
        if (!auth.isAuthenticated) {
            router.push("/login");
        }
    }, [auth, router]);

    if (auth?.loading) {
        return <p>در حال بارگذاری...</p>;
    }

    return auth?.isAuthenticated ? children : null;
};

export default ProtectedRoute;

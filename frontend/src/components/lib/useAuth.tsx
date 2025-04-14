'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const token = Cookies.get('token');
        const userId = Cookies.get('userId');
        const loggedIn = !!(token && userId && userId !== 'undefined' && userId !== 'null');
        setIsLoggedIn(loggedIn);
        setUserId(loggedIn ? userId : null);
        console.log('🔍 useAuth - Checking login:', { token: token?.substring(0, 20), userId, loggedIn });
    }, []);

    const logout = () => {
        console.log('🔍 useAuth - Logging out');
        Cookies.remove('token');
        Cookies.remove('userId');
        setIsLoggedIn(false);
        setUserId(null);
        window.location.href = '/login';
    };

    return { isLoggedIn, userId, logout };
}
import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    userId: number;
    sub: string;
    exp: number;
    [key: string]: any;
}
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // کوکی‌های عمومی
    const token = request.cookies.get('token')?.value;
    const userId = request.cookies.get('userId')?.value;
    const isUserAuthenticated = token && userId && userId !== 'undefined' && userId !== 'null';

    // کوکی ادمین
    const adminToken = request.cookies.get('adminToken')?.value;
    let isAdminAuthenticated = false;

    // بررسی اعتبار توکن ادمین
    if (adminToken) {
        try {
            const decoded: DecodedToken = jwtDecode(adminToken);
            const currentTime = Date.now() / 1000;
            isAdminAuthenticated = decoded.exp > currentTime;
        } catch (error) {
            console.error("Invalid admin token:", error);
            isAdminAuthenticated = false;
        }
    }

    console.log('🔍 Middleware:', {
        pathname,
        isUserAuthenticated,
        isAdminAuthenticated,
    });

    // مسیرهای عمومی که نیازی به احراز هویت ندارند
    const publicPaths = ['/login', '/signUp', '/', '/adminlog', '/forgetPassword', '/projects', '/googleebb9475d40e7e023.html' ];
    
    // اگر مسیر عمومی باشد
    if (publicPaths.some(path => pathname === path || pathname.startsWith(path + '/')  )) {
        if (isAdminAuthenticated && pathname === '/adminlog') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        if (isUserAuthenticated && pathname === '/login') {
            return NextResponse.redirect(new URL('/dashboard', request.url)); // به مسیر داشبورد هدایت می‌شود
        }
        return NextResponse.next();
}


    // مسیرهای ادمین (مثل /admin و زیرمسیرهای آن)
    if (pathname.startsWith('/admin')) {
        if (!isAdminAuthenticated) {
            const redirectUrl = new URL('/adminlog', request.url);
            redirectUrl.searchParams.set('callbackUrl', pathname); // ذخیره مسیر قبلی برای بازگشت پس از ورود
            return NextResponse.redirect(redirectUrl);
        }
        const response = NextResponse.next();
        response.headers.set('x-admin', 'true');
        return response;
    }

    // مسیرهای غیرعمومی برای کاربران عمومی
    if (!isUserAuthenticated) {
        console.warn('🔍 Middleware: Access denied to protected path', { pathname });
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('callbackUrl', pathname); // ذخیره مسیر قبلی برای بازگشت پس از ورود
        return NextResponse.redirect(redirectUrl);
    }

    const response = NextResponse.next();
    response.headers.set('x-user-id', userId || '');
    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

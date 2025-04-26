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
    const publicPaths = ['/login', '/signUp', '/', '/adminlog','/forgetPassword','/projects']; // اضافه کردن /signUp
    // اگر مسیر عمومی باشد
    if (publicPaths.includes(pathname)) {
        // اگر کاربر عمومی لاگین کرده و در /login, /register, یا / است، به داشبورد هدایت شود
/*        if (
            isUserAuthenticated &&
            ['/login', '/register', '/'].includes(pathname)
        ) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }*/
        // اگر ادمین لاگین کرده و در /adminlog است، به داشبورد ادمین هدایت شود
        if (isAdminAuthenticated && pathname === '/adminlog') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.next();
    }

    // مسیرهای ادمین (مثل /admin و زیرمسیرهای آن)
    if (pathname.startsWith('/admin')) {
        if (!isAdminAuthenticated) {
            // ذخیره مسیر قبلی برای بازگشت پس از ورود
            const redirectUrl = new URL('/adminlog', request.url);
            redirectUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(redirectUrl);
        }
        const response = NextResponse.next();
        // تنظیم هدر برای ادمین
        response.headers.set('x-admin', 'true');
        return response;
    }

    // مسیرهای غیرعمومی برای کاربران عمومی
    if (!isUserAuthenticated) {
        console.warn('🔍 Middleware: Access denied to protected path', { pathname });
        // ذخیره مسیر قبلی برای بازگشت پس از ورود
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(redirectUrl);
    }

    const response = NextResponse.next();
    response.headers.set('x-user-id', userId || '');
    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
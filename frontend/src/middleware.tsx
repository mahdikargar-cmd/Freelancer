import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // کوکی‌های عمومی
    const token = request.cookies.get('token')?.value;
    const userId = request.cookies.get('userId')?.value;
    const isUserAuthenticated = token && userId && userId !== 'undefined' && userId !== 'null';

    // کوکی ادمین
    const adminToken = request.cookies.get('adminToken')?.value;
    const isAdminAuthenticated = !!adminToken;

    console.log('🔍 Middleware:', {
        pathname,
        isUserAuthenticated,
        isAdminAuthenticated,
    });

    // مسیرهای عمومی که نیازی به احراز هویت ندارند
    const publicPaths = ['/login', '/register', '/', '/adminlog'];

    // اگر مسیر عمومی باشد
    if (publicPaths.includes(pathname)) {
        // اگر کاربر عمومی لاگین کرده و در /login, /register, یا / است، به داشبورد هدایت شود
        if (
            isUserAuthenticated &&
            ['/login', '/register', '/'].includes(pathname)
        ) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        // اگر ادمین لاگین کرده و در /adminlog است، به داشبورد ادمین هدایت شود
        if (isAdminAuthenticated && pathname === '/adminlog') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.next();
    }

    // مسیرهای ادمین (مثل /admin و زیرمسیرهای آن)
    if (pathname.startsWith('/admin')) {
        if (!isAdminAuthenticated) {
            console.warn('🔍 Middleware: Access denied to admin path', { pathname });
            return NextResponse.redirect(new URL('/adminlog', request.url));
        }
        const response = NextResponse.next();
        // تنظیم هدر برای ادمین (اختیاری)
        response.headers.set('x-admin', 'true');
        return response;
    }

    // مسیرهای غیرعمومی برای کاربران عمومی
    if (!isUserAuthenticated) {
        console.warn('🔍 Middleware: Access denied to protected path', { pathname });
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const response = NextResponse.next();
    response.headers.set('x-user-id', userId || '');
    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
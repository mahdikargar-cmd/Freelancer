import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    const authCookie = request.cookies.get('token');

    // جلوگیری از ارسال کاربر لاگین‌شده به صفحه لاگین
    if (authCookie && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // بررسی لاگین نبودن کاربر برای ورود به داشبورد
    if (!authCookie && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const authCookie = request.cookies.get('token');
    const authAdmin = request.cookies.get('adminToken');
    
    // جلوگیری از ارسال کاربر لاگین‌شده به صفحه لاگین
    if (authCookie && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    if (authAdmin && request.nextUrl.pathname === '/adminlog') {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    // بررسی لاگین نبودن کاربر برای صفحات حفاظت شده
    if (!authCookie && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // اصلاح شده: فقط برای مسیرهای admin به غیر از adminlog چک کنیم
    if (!authAdmin && request.nextUrl.pathname.startsWith('/admin') && 
        !request.nextUrl.pathname.startsWith('/adminlog')) {
        return NextResponse.redirect(new URL('/adminlog', request.url));
    }

    return NextResponse.next();
}
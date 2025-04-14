import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
<<<<<<< HEAD
    const token = request.cookies.get('token')?.value;
    const userId = request.cookies.get('userId')?.value;

    console.log("🔍 Middleware - Checking cookies:", { token: token?.substring(0, 20), userId });

    // مسیرهای عمومی که نیاز به لاگین ندارن
    const publicPaths = ['/login', '/register', '/'];
    if (publicPaths.includes(request.nextUrl.pathname)) {
        if (token && userId && userId !== "undefined" && userId !== "null") {
            console.log("🔍 Redirecting logged-in user to dashboard");
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
=======
    const authCookie = request.cookies.get('token');
    const authAdmin = request.cookies.get('adminToken');
    
    // جلوگیری از ارسال کاربر لاگین‌شده به صفحه لاگین
    if (authCookie && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
>>>>>>> d8c454c65bb421a82ea9848b1a99fa405d546ae9
    }
    
    if (authAdmin && request.nextUrl.pathname === '/adminlog') {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

<<<<<<< HEAD
    // بررسی احراز هویت برای مسیرهای محافظت‌شده
    if (!token || !userId || userId === "undefined" || userId === "null") {
        console.log("🔍 No valid auth - Redirecting to login");
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // اضافه کردن userId به هدرهای پاسخ برای دسترسی در کلاینت
    const response = NextResponse.next();
    response.headers.set('x-user-id', userId);
    console.log("🔍 Authenticated - Proceeding with userId:", userId);
    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
=======
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
>>>>>>> d8c454c65bb421a82ea9848b1a99fa405d546ae9

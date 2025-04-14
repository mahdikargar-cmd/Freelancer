import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
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
    }

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
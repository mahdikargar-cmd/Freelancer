import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;
    const userId = request.cookies.get('userId')?.value;
    const isAuthenticated = token && userId && userId !== 'undefined' && userId !== 'null';

    console.log('🔍 Middleware:', { pathname, isAuthenticated });

    const publicPaths = ['/login', '/register', '/'];
    if (publicPaths.includes(pathname)) {
        return isAuthenticated ? NextResponse.redirect(new URL('/dashboard', request.url)) : NextResponse.next();
    }

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const response = NextResponse.next();
    response.headers.set('x-user-id', userId);
    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
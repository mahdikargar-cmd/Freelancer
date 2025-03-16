import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const authCookie = request.cookies.get('token');

    if (!authCookie) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (request.nextUrl.pathname === "/dashboard") {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/dashboard', request.url));
}
 
export const config = {
  matcher: ['/dashboard/:path*', '/'],
}

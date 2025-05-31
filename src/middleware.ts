import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const pathname = request.nextUrl.pathname;

  // Routes not allowed for logged-in users
  const authPages = ['/login', '/signup'];
  const isAuthPage = authPages.some(path => pathname.startsWith(path));

  // Routes protected for non-logged-in users
  const protectedPages = ['/forum', '/pricing', '/videos'];
  const isProtectedPage = protectedPages.some(path => pathname.startsWith(path));

  if (token && isAuthPage) {
    // Logged-in users shouldn't access login/signup
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (!token && isProtectedPage) {
    // Non-logged-in users shouldn't access protected pages
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

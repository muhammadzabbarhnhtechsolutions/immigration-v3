// middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import { clerkMiddleware, getAuth } from '@clerk/nextjs/server';

export default clerkMiddleware((auth, request) => {
  // const { userId } = auth();
  const token = request.cookies.get('access_token')?.value;
  // const token = request.cookies.get('access_token')?.value || null;
  const pathname = request.nextUrl.pathname;

  const authPages = ['/login', '/signup'];
  const protectedPages = ['/forum', '/videos'];

  const isAuthPage = authPages.some((path) => pathname.startsWith(path));
  const isProtectedPage = protectedPages.some((path) => pathname.startsWith(path));

  // ✅ If user is logged in and visits login/signup → redirect to home
  // if (token && isAuthPage) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/';
  //   return NextResponse.redirect(url);
  // }

  // ❌ If not logged in and tries to access protected page → redirect to login
  if (!token && isProtectedPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

// 🔧 Matcher config
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone();

  // Public route
  if (url.pathname === '/login' || url.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Token kontrolü
  if (!token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  const payload = await verifyToken(token);

  if (!payload) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'], // Korunan pathler
};

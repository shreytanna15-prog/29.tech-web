import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SESSION_COOKIE_NAME = '_sess_29_adm';

const DECOY_PATHS = [
  '/admin',
  '/administrator',
  '/dashboard',
  '/panel',
  '/cpanel',
  '/wp-admin',
  '/backend',
  '/login',
];

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET || 'super-secret-jwt-key-29tech-min32chars-fallback-key';
  return new TextEncoder().encode(secret);
}

async function isSessionValid(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return Boolean(payload?.username);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const secretPath = process.env.ADMIN_SECRET_PATH || '_sys_29_k8';

  // 1. Decoy Trap: Any attempt to access common admin/dashboard URLs returns 404
  for (const decoy of DECOY_PATHS) {
    if (pathname === decoy || pathname.startsWith(`${decoy}/`)) {
      const notFoundUrl = new URL('/not-found', request.url);
      return NextResponse.rewrite(notFoundUrl, { status: 404 });
    }
  }

  // 2. Secret Admin API Protection
  if (pathname.startsWith('/api/admin')) {
    // Login route is public
    if (pathname === '/api/admin/auth/login') {
      return NextResponse.next();
    }
    const valid = await isSessionValid(request);
    if (!valid) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  // 3. Secret Admin Panel UI Protection
  const adminBase = `/${secretPath}`;
  if (pathname === adminBase || pathname.startsWith(`${adminBase}/`)) {
    const isLoginPage = pathname === `${adminBase}/login`;
    const valid = await isSessionValid(request);

    // If already logged in and visiting login page, redirect to admin home
    if (isLoginPage && valid) {
      return NextResponse.redirect(new URL(adminBase, request.url));
    }

    // If not logged in and visiting protected admin pages, redirect to secret login
    if (!isLoginPage && !valid) {
      const loginUrl = new URL(`${adminBase}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Pass through with strict anti-discovery and anti-referrer security headers
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    response.headers.set('Referrer-Policy', 'no-referrer');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder static files (.svg, .png, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

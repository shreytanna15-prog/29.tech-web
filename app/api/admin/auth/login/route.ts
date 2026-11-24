import { NextResponse } from 'next/server';
import { createSessionToken, verifyAdminCredentials, SESSION_COOKIE_NAME } from '@/app/lib/auth';
import prisma from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body ?? {};

    if (!username || !password) {
      return NextResponse.json(
        { ok: false, error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminCredentials(username, password);

    if (!isValid) {
      // Small artificial delay to slow down automated brute force
      await new Promise((r) => setTimeout(r, 600));
      return NextResponse.json(
        { ok: false, error: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    // Generate JWT session token
    const token = await createSessionToken(username);

    // Try logging the login event (fails gracefully if DB not connected)
    try {
      const clientIp = request.headers.get('x-forwarded-for') || '127.0.0.1';
      const userAgent = request.headers.get('user-agent') || 'unknown';
      await prisma.activity.create({
        data: {
          type: 'admin_login',
          description: `Admin session started for ${username}`,
          metadata: {
            ip: clientIp.split(',')[0].trim(),
            userAgent: userAgent.slice(0, 100),
          },
        },
      });
    } catch (e) {
      console.warn('[auth] Could not log activity to DB:', e);
    }

    const response = NextResponse.json({ ok: true, message: 'Authenticated successfully.' });

    // Set secure cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('[auth] Login error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

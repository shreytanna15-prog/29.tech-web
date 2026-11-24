import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/app/lib/auth';

export async function POST() {
  const response = NextResponse.json({ ok: true, message: 'Logged out successfully.' });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}

import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import prisma from '@/app/lib/prisma';

export const SESSION_COOKIE_NAME = '_sess_29_adm';

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET || 'super-secret-jwt-key-29tech-min32chars-fallback-key';
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  username: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

export async function createSessionToken(username: string): Promise<string> {
  const secret = getJwtSecret();
  return new SignJWT({ username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  if (!username || !password) return false;

  const normalizedUsername = username.trim().toLowerCase();

  // 1. Primary Check: Query the Supabase database for the admin user
  try {
    const dbUser = await prisma.adminUser.findFirst({
      where: {
        username: {
          equals: normalizedUsername,
          mode: 'insensitive',
        },
      },
    });

    if (dbUser) {
      // Check bcrypt hash
      if (dbUser.passwordHash.startsWith('$2')) {
        const matches = await bcrypt.compare(password, dbUser.passwordHash);
        if (matches) return true;
      }
      // Check plaintext fallback (if entered manually in DB)
      if (dbUser.passwordHash === password) {
        return true;
      }
    }
  } catch (err) {
    console.warn('[auth] Error checking admin_users table in DB:', err);
  }

  // 2. Secondary / Bootstrapping Check: Fallback to .env configuration
  const expectedEnvUser = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase();
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (normalizedUsername === expectedEnvUser) {
    let isValid = false;

    if (expectedHash) {
      if (expectedHash.startsWith('$2')) {
        isValid = await bcrypt.compare(password, expectedHash);
      } else {
        isValid = password === expectedHash;
      }
    } else {
      // Default initial password fallback
      isValid = password === 'Admin29!Secure';
    }

    // If validated via .env, auto-seed/sync into the Supabase database
    if (isValid) {
      try {
        const hash = password.startsWith('$2')
          ? password
          : await bcrypt.hash(password, 10);

        await prisma.adminUser.upsert({
          where: { username: normalizedUsername },
          update: { passwordHash: hash },
          create: {
            username: normalizedUsername,
            passwordHash: hash,
          },
        });
      } catch (seedErr) {
        console.warn('[auth] Could not auto-sync admin user to DB:', seedErr);
      }

      return true;
    }
  }

  return false;
}

export function getAdminSecretPath(): string {
  return process.env.ADMIN_SECRET_PATH || '_sys_29_k8';
}

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '29.tech — Internal Console',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ secretPath: string }>;
}) {
  const { secretPath } = await params;
  const configuredSecret = process.env.ADMIN_SECRET_PATH || '_sys_29_k8';

  // Strict check: if the dynamic parameter does not match the configured secret path, return 404
  if (secretPath !== configuredSecret) {
    notFound();
  }

  return (
    <div
      data-lenis-prevent
      className="admin-root min-h-screen bg-[var(--bg-0)] text-[var(--text-1)]"
    >
      {children}
    </div>
  );
}

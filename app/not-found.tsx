import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-plex-mono), monospace',
          fontSize: '0.85rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-3)',
          marginBottom: '0.75rem',
        }}
      >
        404 — Page Not Found
      </span>
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 600,
          color: 'var(--text-1)',
          marginBottom: '1rem',
          maxWidth: '24ch',
        }}
      >
        The page you are looking for does not exist.
      </h1>
      <p
        style={{
          color: 'var(--text-2)',
          maxWidth: '42ch',
          marginBottom: '1.75rem',
          fontSize: '0.95rem',
          lineHeight: 1.5,
        }}
      >
        It might have been moved, removed, or the URL address was mistyped.
      </p>
      <Link
        href="/"
        className="btn btn-fill"
        style={{ fontSize: '0.9rem', padding: '0.65rem 1.4rem' }}
      >
        Return to Home
      </Link>
    </div>
  );
}

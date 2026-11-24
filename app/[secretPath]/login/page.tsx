'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();
  const secretPath = params?.secretPath as string;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || 'Authentication failed.');
        setLoading(false);
        return;
      }

      // Successfully authenticated — redirect to stealth dashboard
      router.push(`/${secretPath}`);
      router.refresh();
    } catch {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'var(--bg-0)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'var(--bg-1)',
          border: '1px solid var(--border-1)',
          borderRadius: '10px',
          boxShadow: 'var(--shadow-md)',
          padding: '2.25rem 2rem',
        }}
      >
        <div style={{ marginBottom: '1.75rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-plex-mono), monospace',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              marginBottom: '0.35rem',
            }}
          >
            29.tech // Internal
          </div>
          <h1
            style={{
              fontSize: '1.35rem',
              fontWeight: 600,
              color: 'var(--text-1)',
              margin: 0,
            }}
          >
            Console Sign In
          </h1>
        </div>

        {error && (
          <div
            role="alert"
            style={{
              padding: '0.75rem 0.9rem',
              borderRadius: '6px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div>
            <label
              htmlFor="username"
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 500,
                color: 'var(--text-2)',
                marginBottom: '0.4rem',
              }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                fontSize: '0.92rem',
                color: 'var(--text-1)',
                backgroundColor: 'var(--bg-1)',
                border: '1px solid var(--border-2)',
                borderRadius: '6px',
                outline: 'none',
                transition: 'border-color 0.15s ease',
              }}
              placeholder="admin"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 500,
                color: 'var(--text-2)',
                marginBottom: '0.4rem',
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                fontSize: '0.92rem',
                color: 'var(--text-1)',
                backgroundColor: 'var(--bg-1)',
                border: '1px solid var(--border-2)',
                borderRadius: '6px',
                outline: 'none',
                transition: 'border-color 0.15s ease',
              }}
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-fill"
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '0.92rem',
              fontWeight: 500,
              marginTop: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Authenticating…' : 'Access Console'}
          </button>
        </form>
      </div>
    </div>
  );
}

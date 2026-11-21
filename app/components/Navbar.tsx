'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const links = [
  { label: 'Capabilities', href: '/#services' },
  { label: 'Engagement', href: '/#engagement' },
  { label: 'Work', href: '/#work' },
  { label: 'Process', href: '/#process' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className={`site-header${scrolled || mobileOpen ? ' is-scrolled' : ''}`}>
      <div
        className="wrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 'var(--nav-h)',
          gap: '1rem',
        }}
      >
        <Link
          href="/"
          id="nav-logo"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            flex: '0 0 auto',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 32,
              height: 32,
              borderRadius: 'var(--r-sm)',
              overflow: 'hidden',
              border: '1px solid var(--border-1)',
              background: 'var(--bg-1)',
              flexShrink: 0,
            }}
          >
            <Image
              src="/logo 5.png"
              alt="29.tech"
              width={32}
              height={32}
              priority
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <span
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              letterSpacing: '-0.04em',
              color: 'var(--text-1)',
              lineHeight: 1,
            }}
          >
            29.tech
          </span>
        </Link>

        <nav
          className="nav-desktop-only"
          aria-label="Primary"
          style={{
            alignItems: 'center',
            gap: 2,
            marginLeft: 'auto',
            marginRight: '0.75rem',
          }}
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} id={`nav-${l.label.toLowerCase()}`} className="nav-link">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-desktop-only">
          <Link
            href="/contact"
            id="nav-cta"
            className="btn btn-fill"
            style={{ fontSize: '0.875rem', padding: '0.55rem 1.1rem' }}
          >
            Discuss Your Project
          </Link>
        </div>

        <button
          id="mobile-menu-btn"
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="nav-mobile-only"
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: '1px solid var(--border-1)',
            borderRadius: 'var(--r-sm)',
            cursor: 'pointer',
            padding: '8px 10px',
            flexDirection: 'column',
            gap: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 18,
                height: 1.5,
                background: 'var(--text-1)',
                borderRadius: 1,
                transition: 'transform 0.2s ease, opacity 0.15s ease',
                ...(mobileOpen && i === 0
                  ? { transform: 'translateY(6.5px) rotate(45deg)' }
                  : {}),
                ...(mobileOpen && i === 1 ? { opacity: 0 } : {}),
                ...(mobileOpen && i === 2
                  ? { transform: 'translateY(-6.5px) rotate(-45deg)' }
                  : {}),
              }}
            />
          ))}
        </button>
      </div>

      {mobileOpen && (
        <div
          style={{
            background: 'var(--bg-0)',
            borderTop: '1px solid var(--border-1)',
            padding: '0.75rem 0 1.25rem',
          }}
        >
          <div
            className="wrap"
            style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="nav-link"
                style={{ padding: '0.85rem 0.75rem', fontSize: '1rem' }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn btn-fill"
              style={{ marginTop: '0.75rem', justifyContent: 'center' }}
            >
              Discuss Your Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

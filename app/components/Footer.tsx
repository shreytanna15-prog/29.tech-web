import Link from 'next/link';

const navLinks = [
  { label: 'Capabilities', href: '/#services' },
  { label: 'Engagement', href: '/#engagement' },
  { label: 'Work', href: '/#work' },
  { label: 'Process', href: '/#process' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
];

const serviceLinks = [
  { label: 'Custom Software Development', href: '/#services' },
  { label: 'AI & Intelligent Automation', href: '/#cap-ai' },
  { label: 'SaaS & Product Engineering', href: '/#cap-saas' },
  { label: 'Cloud & DevOps', href: '/#cap-cloud' },
  { label: 'Integration & Modernization', href: '/#cap-integration' },
];

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/29-tech',
    ariaLabel: '29.tech on LinkedIn',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/29dot_tech',
    ariaLabel: '29.tech on X',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/29.tech_global',
    ariaLabel: '29.tech on Instagram',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-1)',
        borderTop: '1px solid var(--border-1)',
      }}
    >
      <div className="wrap" style={{ paddingBlock: '3.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '1.15rem',
                fontWeight: 600,
                letterSpacing: '-0.04em',
                color: 'var(--text-1)',
                marginBottom: '0.75rem',
              }}
            >
              29.tech
            </div>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-3)',
                lineHeight: 1.65,
                marginBottom: '1.25rem',
                maxWidth: 240,
              }}
            >
              IT consulting and software development partner for custom digital solutions.
            </p>
            <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.ariaLabel}
                  className="foot-social-btn"
                  style={{
                    display: 'inline-flex',
                    width: 36,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-0)',
                    border: '1px solid var(--border-1)',
                    borderRadius: 'var(--r-sm)',
                    color: 'var(--text-2)',
                    textDecoration: 'none',
                    transition: 'border-color 0.15s ease, color 0.15s ease, background 0.15s ease',
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mono-meta" style={{ marginBottom: '1rem' }}>
              Pages
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="foot-link">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mono-meta" style={{ marginBottom: '1rem' }}>
              Capabilities
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {serviceLinks.map((s) => (
                <Link key={s.label} href={s.href} className="foot-link">
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mono-meta" style={{ marginBottom: '1rem' }}>
              Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <a href="tel:+918849089880" className="foot-link">
                +91 88490 89880
              </a>
              <a href="mailto:hello@29.tech" className="foot-link">
                hello@29.tech
              </a>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-3)' }}>
                Rajkot, Gujarat, India
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-1)',
            paddingTop: '1.5rem',
          }}
        >
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-3)' }}>
            © {new Date().getFullYear()} 29.tech. All rights reserved.
          </span>
        </div>
      </div>

      <style>{`
        .foot-social-btn:hover {
          border-color: var(--border-2) !important;
          color: var(--text-1) !important;
          background: var(--bg-1) !important;
        }
      `}</style>
    </footer>
  );
}

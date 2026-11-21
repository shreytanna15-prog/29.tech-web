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
            <a
              href="https://linkedin.com/company/29-tech"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-linkedin"
              aria-label="29.tech on LinkedIn"
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
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
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
    </footer>
  );
}

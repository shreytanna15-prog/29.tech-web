import React from 'react';
import Link from 'next/link';

interface Reason {
  badge: string;
  title: string;
  body: string;
  highlight: string;
  icon: React.ReactNode;
}

const reasons: Reason[] = [
  {
    badge: 'Dedicated Lead',
    title: 'Dedicated Relationship Manager',
    body: 'A single, experienced point of contact who understands your business priorities, coordinates technical sprints, and ensures unblocked delivery without miscommunication.',
    highlight: 'Direct Slack / Teams channel & weekly strategy syncs',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    badge: 'Zero Guesswork',
    title: 'Daily updates for your project',
    body: 'Asynchronous daily summaries, commit milestones, and live preview deployments. You always know exactly what was delivered today, what is in flight, and what ships next.',
    highlight: 'Daily standup digests · Live staging URLs · Weekly demos',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M9 16l2 2 4-4" />
      </svg>
    ),
  },
  {
    badge: '< 1hr SLA',
    title: 'Super fast response',
    body: 'No bureaucratic ticketing queues or days of waiting. Direct line access to technical leadership with rapid triage and immediate answers to mission-critical questions.',
    highlight: 'Sub-hour response SLA · Direct messaging · Urgent escalation',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    badge: 'Senior Talent',
    title: 'Direct communication with engineers',
    body: 'Speak directly with the architects and developers writing the software. Technical discussions, scope adjustments, and architecture decisions happen in minutes, not days.',
    highlight: 'Zero account-rep telephone · Direct pair review sessions',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    badge: 'Full Lifecycle',
    title: 'End-to-end project accountability',
    body: 'One cohesive team takes complete ownership from technical discovery and UX engineering through to cloud infrastructure, automated testing, and production launch.',
    highlight: 'Discovery to deploy · CI/CD pipelines · Automated test suites',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    badge: 'Built To Scale',
    title: 'Scalable engineering & long-term partnership',
    body: 'Clean, modular architectures engineered for reliability and long-term ownership. We remain engaged post-launch for feature expansions, cloud monitoring, and performance tuning.',
    highlight: 'Clean documentation · Infrastructure monitoring · Post-launch SLA',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="section" style={{ background: 'var(--bg-0)' }}>
      <div className="wrap">
        <div
          className="why-header"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: 'clamp(2rem, 5vw, 4rem)',
            marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
            alignItems: 'end',
          }}
        >
          <div>
            <div className="mono-meta" style={{ marginBottom: '0.75rem', color: 'var(--text-3)' }}>
              Service Standards &amp; Accountability
            </div>
            <h2 className="heading">
              Why businesses
              <br />
              choose 29.tech.
            </h2>
          </div>
          <div>
            <p className="subheading" style={{ marginBottom: '1.5rem' }}>
              We operate as an embedded technology partner — not a black-box agency or a one-off
              freelance handoff. High-velocity execution, daily transparent updates, and dedicated
              ownership on every sprint.
            </p>
            <div className="why-header-actions">
              <Link href="/contact" className="btn btn-ink">
                Discuss Your Project
              </Link>
              <div className="why-sla-badge mono-meta">
                <span className="sla-pulse" aria-hidden="true" />
                <span>Avg. response: &lt; 1 hour</span>
              </div>
            </div>
          </div>
        </div>

        <div className="why-cards">
          {reasons.map((r) => (
            <article key={r.title} className="why-card">
              <div className="why-card-top">
                <div className="why-card-icon" aria-hidden="true">
                  {r.icon}
                </div>
                <span className="why-card-badge mono-meta">{r.badge}</span>
              </div>

              <h3 className="why-card-title">{r.title}</h3>
              <p className="why-card-body">{r.body}</p>

              <div className="why-card-footer mono-meta">
                <span className="why-footer-check" aria-hidden="true">✓</span>
                <span>{r.highlight}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="why-footer-strip">
          <div className="why-strip-item">
            <span className="strip-check" aria-hidden="true">✓</span>
            <span>Dedicated Relationship Manager</span>
          </div>
          <div className="why-strip-item">
            <span className="strip-check" aria-hidden="true">✓</span>
            <span>Daily asynchronous project updates</span>
          </div>
          <div className="why-strip-item">
            <span className="strip-check" aria-hidden="true">✓</span>
            <span>Sub-hour priority response SLA</span>
          </div>
          <div className="why-strip-item">
            <span className="strip-check" aria-hidden="true">✓</span>
            <span>Direct engineer-to-engineer collaboration</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .why-header {
            grid-template-columns: 1fr !important;
            align-items: start !important;
          }
        }

        .why-header-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .why-sla-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.75rem;
          background: var(--bg-1);
          border: 1px solid var(--border-1);
          border-radius: var(--r-sm);
          font-size: 0.75rem;
          color: var(--text-2);
        }

        .sla-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }

        .why-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
        }

        @media (max-width: 960px) {
          .why-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 620px) {
          .why-cards {
            grid-template-columns: 1fr;
          }
        }

        .why-card {
          display: flex;
          flex-direction: column;
          padding: clamp(1.5rem, 3vw, 1.85rem);
          background: var(--bg-1);
          border: 1px solid var(--border-1);
          border-radius: var(--r-md);
          box-shadow: var(--shadow-sm);
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .why-card:hover {
          border-color: var(--border-2);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .why-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .why-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          background: var(--bg-0);
          border: 1px solid var(--border-1);
          border-radius: var(--r-sm);
          color: var(--text-1);
          flex-shrink: 0;
        }

        .why-card-badge {
          font-size: 0.68rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0.25rem 0.55rem;
          background: var(--bg-0);
          border: 1px solid var(--border-1);
          border-radius: var(--r-xs);
          color: var(--text-2);
        }

        .why-card-title {
          margin: 0 0 0.65rem;
          font-size: 1.15rem;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--text-1);
          line-height: 1.35;
        }

        .why-card-body {
          margin: 0 0 1.25rem;
          font-size: 0.9rem;
          color: var(--text-2);
          line-height: 1.6;
          flex-grow: 1;
        }

        .why-card-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-1);
          font-size: 0.74rem;
          color: var(--text-3);
          line-height: 1.4;
        }

        .why-footer-check {
          color: #10b981;
          font-weight: 700;
          font-size: 0.8rem;
          flex-shrink: 0;
        }

        .why-footer-strip {
          margin-top: 2rem;
          padding: 1rem 1.25rem;
          background: var(--bg-1);
          border: 1px solid var(--border-1);
          border-radius: var(--r-md);
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
        }

        @media (max-width: 900px) {
          .why-footer-strip {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .why-footer-strip {
            grid-template-columns: 1fr;
          }
        }

        .why-strip-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--text-2);
          font-weight: 500;
        }

        .strip-check {
          color: #10b981;
          font-size: 0.8rem;
          font-weight: 700;
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}

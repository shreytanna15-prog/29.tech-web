import React from 'react';

/**
 * Portfolio — Work segment showcasing core delivery capabilities:
 * Web Platforms, Mobile Apps, AI Agents, SaaS Platforms, and Enterprise Automation.
 *
 * Wireframe schematics serve as image placeholders until custom screenshots are provided.
 * Below the projects, an infinite moving ticker displays client logos and names.
 */

type Project = {
  id: string;
  category: string;
  name: string;
  problem: string;
  delivered: string;
  stack: string[];
  visual: 'web' | 'mobile' | 'saas' | 'ai' | 'automation';
  image?: string;
};

const projects: Project[] = [
  {
    id: 'work-web-platforms',
    category: 'Web Platforms',
    name: 'Enterprise Operations & Collaboration Platform',
    image: '/work/Enterprise.svg',
    problem:
      'Business needed a custom high-performance web platform to consolidate fragmented tools, automate manual approval workflows, and support real-time team collaboration.',
    delivered:
      'Responsive web platform featuring fine-grained role-based access control, sub-second query latency, automated audit logging, and streamlined operational flows.',
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    visual: 'web',
  },
  {
    id: 'work-mobile-apps',
    category: 'Mobile Applications',
    name: 'Cross-Platform Field Services & Client Mobile App',
    image: '/work/mobile-work-section.svg',
    problem:
      'Distributed field engineers and customer-facing teams needed an offline-first mobile client capable of synchronizing field reports and telemetry in low-connectivity areas.',
    delivered:
      'Production-ready iOS and Android client with encrypted local caching, biometric authentication, push notifications, and automated conflict-free sync pipelines.',
    stack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'SQLite', 'GraphQL'],
    visual: 'mobile',
  },
  {
    id: 'work-ai-agents',
    category: 'AI Agents & Automation',
    name: 'Autonomous Multi-Agent Workflow Engine',
    image: '/work/AI-agent-work.svg',
    problem:
      'Operations teams spent hours manually categorizing complex business records, extracting unstructured data, and resolving repetitive support escalations.',
    delivered:
      'Multi-agent orchestration system combining context retrieval (RAG), tool calling, deterministic validation guardrails, and human-in-the-loop review queues.',
    stack: ['Python', 'FastAPI', 'LangChain', 'pgvector', 'OpenAI', 'Claude APIs'],
    visual: 'ai',
  },
  {
    id: 'work-saas-platforms',
    category: 'SaaS Platforms',
    name: 'Multi-Tenant B2B Analytics & Workflow SaaS',
    image: '/work/saas-platform-flows.svg',
    problem:
      'Client required a scalable multi-tenant foundation engineered for enterprise readiness, automated billing, organization workspaces, and self-serve onboarding.',
    delivered:
      'Turnkey SaaS platform with isolated tenant schemas, usage-based metering, Stripe integration, SSO security controls, and responsive management dashboards.',
    stack: ['TypeScript', 'Next.js', 'Prisma', 'PostgreSQL', 'Stripe', 'Redis'],
    visual: 'saas',
  },
  {
    id: 'work-automation',
    category: 'Enterprise Automation',
    name: 'Event-Driven Systems Integration & Data Pipeline',
    problem:
      'Critical business events across billing, CRM, and inventory systems suffered from inconsistent syncing, silent drops, and manual reconciliation overhead.',
    image: '/work/event-pipeline.svg',
    delivered:
      'Resilient event-driven architecture with guaranteed message delivery, dead-letter recovery queues, real-time telemetry, and automated operational alerts.',
    stack: ['Node.js', 'Apache Kafka', 'Docker', 'Google Cloud', 'Terraform'],
    visual: 'automation',
  },
];

type Client = {
  name: string;
  tag: string;
  logoSrc: string;
};

const clients: Client[] = [
  {
    name: 'Vibe-O-Gram',
    tag: 'Social Media',
    logoSrc: '/logos/vibeogram-logo.png',
  },
  {
    name: 'DrishX',
    tag: 'ERP',
    logoSrc: '/logos/drishx-logo.png',
  },
  {
    name: 'Erudite AI',
    tag: 'AI SaaS',
    logoSrc: '/logos/Erudite.png',
  },
  {
    name: 'Joss Technologies',
    tag: 'AI SaaS',
    logoSrc: '/logos/Joss.png',
  },
  {
    name: 'Tribe AI',
    tag: 'AI Chatbot',
    logoSrc: '/logos/tribe-digital-ai-logo.png',
  },
  {
    name: 'Pinnacle Business Services',
    tag: 'Internal AI & Workflows',
    logoSrc: '/logos/pinnacle-logo.png',
  }, {
    name: 'Complynz Labs',
    tag: 'SaaS',
    logoSrc: '/logos/complynz-logo.png',
  }
];

// 4 repetitions for seamless 50% loop on any viewport width
const marqueeClients = [...clients, ...clients, ...clients, ...clients];

function CaseVisual({
  kind,
  image,
  alt,
}: {
  kind: Project['visual'];
  image?: string;
  alt?: string;
}) {
  const ink = 'currentColor';

  if (image) {
    return (
      <div className="case-visual" data-kind={kind}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={alt || 'Project screenshot'} className="case-img" />
      </div>
    );
  }

  return (
    <div className="case-visual" data-kind={kind} aria-hidden="true">
      <svg viewBox="0 0 640 400" className="case-svg" role="presentation">
        <rect width="640" height="400" fill="var(--case-bg)" />
        {/* Grid */}
        <g stroke="var(--case-line)" strokeWidth="1" opacity="0.55">
          {[80, 160, 240, 320].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="640" y2={y} />
          ))}
          {[80, 160, 240, 320, 400, 480, 560].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" />
          ))}
        </g>

        {kind === 'web' && (
          <g fill="none" stroke={ink} strokeWidth="1.5" opacity="0.85">
            <rect x="72" y="56" width="496" height="288" rx="4" />
            <rect x="72" y="56" width="496" height="36" fill="var(--case-panel)" stroke={ink} />
            <rect x="96" y="120" width="140" height="196" fill="var(--case-panel)" stroke={ink} />
            <rect x="256" y="120" width="288" height="88" fill="var(--case-panel)" stroke={ink} />
            <rect x="256" y="228" width="136" height="88" fill="var(--case-panel)" stroke={ink} />
            <rect x="408" y="228" width="136" height="88" fill="var(--case-panel)" stroke={ink} />
          </g>
        )}

        {kind === 'mobile' && (
          <g fill="none" stroke={ink} strokeWidth="1.5" opacity="0.85">
            <rect x="230" y="40" width="180" height="320" rx="18" fill="var(--case-panel)" />
            <rect x="250" y="76" width="140" height="220" rx="4" />
            <circle cx="320" cy="328" r="10" />
            <rect x="280" y="56" width="80" height="6" rx="3" fill={ink} stroke="none" opacity="0.35" />
          </g>
        )}

        {kind === 'saas' && (
          <g fill="none" stroke={ink} strokeWidth="1.5" opacity="0.85">
            <rect x="60" y="70" width="200" height="260" fill="var(--case-panel)" />
            <rect x="280" y="70" width="300" height="120" fill="var(--case-panel)" />
            <rect x="280" y="210" width="140" height="120" fill="var(--case-panel)" />
            <rect x="440" y="210" width="140" height="120" fill="var(--case-panel)" />
            <circle cx="160" cy="140" r="18" />
            <line x1="110" y1="200" x2="210" y2="200" />
            <line x1="110" y1="230" x2="190" y2="230" />
            <line x1="110" y1="260" x2="200" y2="260" />
          </g>
        )}

        {kind === 'ai' && (
          <g fill="none" stroke={ink} strokeWidth="1.5" opacity="0.85">
            <circle cx="160" cy="200" r="48" fill="var(--case-panel)" />
            <circle cx="320" cy="120" r="36" fill="var(--case-panel)" />
            <circle cx="320" cy="280" r="36" fill="var(--case-panel)" />
            <circle cx="480" cy="200" r="48" fill="var(--case-panel)" />
            <path d="M208 200H284M356 120H432M356 280H432M208 176L284 132M208 224L284 268" />
            <text x="148" y="206" fill={ink} stroke="none" fontSize="14" fontFamily="monospace">LLM</text>
            <text x="458" y="206" fill={ink} stroke="none" fontSize="14" fontFamily="monospace">API</text>
          </g>
        )}

        {kind === 'automation' && (
          <g fill="none" stroke={ink} strokeWidth="1.5" opacity="0.85">
            <rect x="56" y="160" width="120" height="80" fill="var(--case-panel)" />
            <rect x="260" y="80" width="120" height="80" fill="var(--case-panel)" />
            <rect x="260" y="240" width="120" height="80" fill="var(--case-panel)" />
            <rect x="464" y="160" width="120" height="80" fill="var(--case-panel)" />
            <path d="M176 200H260M380 120H464M380 280H464M320 160V240" />
            <polygon points="250,200 260,194 260,206" fill={ink} stroke="none" />
            <polygon points="454,120 464,114 464,126" fill={ink} stroke="none" />
            <polygon points="454,280 464,274 464,286" fill={ink} stroke="none" />
          </g>
        )}

        <text
          x="24"
          y="378"
          fill={ink}
          stroke="none"
          opacity="0.45"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
        >
          Project interface · Image ready slot (16:10)
        </text>
      </svg>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="work" className="section" style={{ background: 'var(--bg-1)' }}>
      <div className="wrap">
        <div
          className="work-header"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
            alignItems: 'end',
          }}
        >
          <h2 className="heading">
            Selected client
            <br />
            engagements.
          </h2>
          <p className="subheading" style={{ marginBottom: 0 }}>
            Representative systems and products engineered across our primary delivery domains.
            From custom web platforms and mobile apps to autonomous AI agents and cloud infrastructure.
          </p>
        </div>

        <div className="case-list">
          {projects.map((p, i) => (
            <article
              key={p.id}
              id={p.id}
              className={`case-study${i % 2 === 1 ? ' case-study-flip' : ''}`}
            >
              <CaseVisual kind={p.visual} image={p.image} alt={p.name} />
              <div className="case-copy">
                <p className="mono-meta" style={{ marginBottom: '0.75rem' }}>
                  {p.category}
                </p>
                <h3 className="case-name">{p.name}</h3>

                <div className="case-block">
                  <div className="mono-meta">Business problem</div>
                  <p>{p.problem}</p>
                </div>
                <div className="case-block">
                  <div className="mono-meta">What we delivered</div>
                  <p>{p.delivered}</p>
                </div>
                <div className="case-block">
                  <div className="mono-meta">Technologies</div>
                  <p className="case-stack">{p.stack.join(' · ')}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Clients Section */}
        <div className="clients-section">
          <div className="clients-header">
            <div className="mono-meta" style={{ marginBottom: '0.5rem' }}>
              Clients &amp; Collaborations
            </div>
            <h3 className="clients-title">
              Trusted by high-growth startups and modern enterprises.
            </h3>
          </div>

          <div className="marquee-wrapper" aria-label="Clients and partners list">
            <div className="marquee-track">
              {marqueeClients.map((client, idx) => (
                <div key={`${client.name}-${idx}`} className="client-pill">
                  <span className="client-icon" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={client.logoSrc}
                      alt={`${client.name} logo`}
                      className="client-logo-img"
                      loading="lazy"
                    />
                  </span>
                  <span className="client-name">{client.name}</span>
                  <span className="client-tag mono-meta">{client.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .work-header {
            grid-template-columns: 1fr !important;
            align-items: start !important;
          }
        }

        .clients-section {
          margin-top: clamp(4rem, 8vw, 6rem);
          padding-top: clamp(2.5rem, 5vw, 4rem);
          border-top: 1px solid var(--border-1);
        }

        .clients-header {
          margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
        }

        .clients-title {
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--text-1);
          margin: 0;
        }

        .marquee-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding: 0.5rem 0;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .marquee-track {
          display: flex;
          gap: 0.875rem;
          width: max-content;
          animation: marquee-scroll 42s linear infinite;
          will-change: transform;
        }

        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            overflow-x: auto;
          }
        }

        .client-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 1.15rem;
          background: var(--bg-0);
          border: 1px solid var(--border-1);
          border-radius: var(--r-md);
          white-space: nowrap;
          user-select: none;
          transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
        }

        .client-pill:hover {
          border-color: var(--border-2);
          background: var(--bg-1);
          box-shadow: var(--shadow-sm);
        }

        .client-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 24px;
          min-width: 24px;
          flex-shrink: 0;
        }

        .client-logo-img {
          height: 20px;
          width: auto;
          max-width: 72px;
          object-fit: contain;
          display: block;
        }

        .client-name {
          font-size: 0.925rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--text-1);
        }

        .client-tag {
          font-size: 0.68rem;
          color: var(--text-3);
          letter-spacing: 0.04em;
          padding-left: 0.65rem;
          border-left: 1px solid var(--border-1);
          text-transform: uppercase;
        }

        .case-visual {
          border: none;
          background: transparent !important;
          box-shadow: none !important;
          min-height: auto;
          overflow: visible;
        }

        .case-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
          aspect-ratio: 16 / 10;
        }
      `}</style>
    </section>
  );
}

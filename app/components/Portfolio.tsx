/**
 * Portfolio — no public project screenshots exist in this repository yet.
 * Each entry uses a category visual treatment and clearly labeled placeholders
 * for project name / screenshot. Do not invent clients or outcomes.
 */

type Project = {
  id: string;
  category: string;
  name: string;
  problem: string;
  delivered: string;
  stack: string[];
  visual: 'web' | 'mobile' | 'saas' | 'ai' | 'automation';
};

const projects: Project[] = [
  {
    id: 'work-web',
    category: 'Web Applications',
    name: '[Project name pending]',
    problem:
      'Business needed a custom web application to replace fragmented tools and manual workflows.',
    delivered:
      'Responsive web application with role-based access, core operational flows and production deployment.',
    stack: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    visual: 'web',
  },
  {
    id: 'work-mobile',
    category: 'Mobile Applications',
    name: '[Project name pending]',
    problem:
      'Field or customer-facing teams needed a reliable mobile experience connected to backend systems.',
    delivered:
      'Cross-platform mobile client with authenticated APIs, offline-aware UX patterns and release pipeline.',
    stack: ['Flutter', 'Swift', 'Kotlin', 'REST'],
    visual: 'mobile',
  },
  {
    id: 'work-saas',
    category: 'SaaS Platforms',
    name: '[Project name pending]',
    problem:
      'Client required a multi-tenant product foundation with billing-ready architecture and admin controls.',
    delivered:
      'SaaS platform structure: tenancy model, admin surfaces, observability hooks and scalable API layer.',
    stack: ['TypeScript', 'Next.js', 'AWS', 'Redis'],
    visual: 'saas',
  },
  {
    id: 'work-ai',
    category: 'AI Solutions',
    name: '[Project name pending]',
    problem:
      'Organisation needed AI capabilities embedded into existing operations — not a disconnected chatbot experiment.',
    delivered:
      'LLM-integrated workflows with retrieval where needed, guardrails and handoff into business systems.',
    stack: ['Python', 'OpenAI', 'RAG', 'APIs'],
    visual: 'ai',
  },
  {
    id: 'work-automation',
    category: 'Business Automation',
    name: '[Project name pending]',
    problem:
      'Repetitive cross-system processes were consuming staff time and introducing errors.',
    delivered:
      'Automated pipelines and integrations connecting CRMs, internal tools and notification channels.',
    stack: ['Node.js', 'GraphQL', 'Cloud Functions', 'Queues'],
    visual: 'automation',
  },
];

function CaseVisual({ kind }: { kind: Project['visual'] }) {
  const ink = 'currentColor';
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
          Screenshot pending — replace with approved project UI
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
            Representative engagement types we deliver for businesses.
            Project names and screenshots will be published once clients approve
            public display — placeholders below are labeled clearly.
          </p>
        </div>

        <div className="case-list">
          {projects.map((p, i) => (
            <article
              key={p.id}
              id={p.id}
              className={`case-study${i % 2 === 1 ? ' case-study-flip' : ''}`}
            >
              <CaseVisual kind={p.visual} />
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
      </div>

      <style>{`
        @media (max-width: 860px) {
          .work-header {
            grid-template-columns: 1fr !important;
            align-items: start !important;
          }
        }
      `}</style>
    </section>
  );
}

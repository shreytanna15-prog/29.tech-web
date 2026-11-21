import Link from 'next/link';

type FlowItem = {
  kind: 'Solution' | 'Industry' | 'Capability' | 'Platform';
  label: string;
  detail: string;
};

const flowItems: FlowItem[] = [
  { kind: 'Solution', label: 'AI customer chatbots', detail: 'Support & sales assistants on your channels' },
  { kind: 'Industry', label: 'Healthcare', detail: 'Clinical ops, patient portals & scheduling' },
  { kind: 'Capability', label: 'Custom web applications', detail: 'Internal tools and customer-facing platforms' },
  { kind: 'Solution', label: 'HRMS AI chatbots', detail: 'Leave, policy and employee self-service' },
  { kind: 'Industry', label: 'Fintech & banking', detail: 'Compliance-aware products and integrations' },
  { kind: 'Platform', label: 'Multi-tenant SaaS', detail: 'Billing-ready architecture for client products' },
  { kind: 'Solution', label: 'RAG knowledge systems', detail: 'Document search grounded in your data' },
  { kind: 'Industry', label: 'Logistics & supply chain', detail: 'Tracking, ops dashboards and partner APIs' },
  { kind: 'Capability', label: 'Mobile applications', detail: 'iOS, Android and cross-platform clients' },
  { kind: 'Solution', label: 'Workflow automation', detail: 'Cross-system processes without manual handoffs' },
  { kind: 'Industry', label: 'Retail & e-commerce', detail: 'Catalog, fulfilment and customer tooling' },
  { kind: 'Capability', label: 'Cloud & DevOps', detail: 'CI/CD, containers and production reliability' },
  { kind: 'Solution', label: 'AI agents for operations', detail: 'Task agents wired into business systems' },
  { kind: 'Industry', label: 'Education & edtech', detail: 'Learning platforms and admin systems' },
  { kind: 'Platform', label: 'Legacy modernization', detail: 'Migrate brittle systems without downtime risk' },
  { kind: 'Solution', label: 'CRM & ERP integrations', detail: 'Connect payments, CRMs and internal APIs' },
  { kind: 'Industry', label: 'Manufacturing', detail: 'Plant software, IoT bridges and reporting' },
  { kind: 'Capability', label: 'API & backend systems', detail: 'Secure services designed for scale' },
  { kind: 'Solution', label: 'Internal AI copilots', detail: 'Assist teams inside existing tools' },
  { kind: 'Industry', label: 'Professional services', detail: 'Delivery, billing and client portals' },
  { kind: 'Platform', label: 'MVP to production', detail: 'From first release through platform scale' },
  { kind: 'Solution', label: 'Business process automation', detail: 'RPA-style flows with real system hooks' },
];

function FlowRow({ item }: { item: FlowItem }) {
  return (
    <li className="hero-flow-item">
      <span className="hero-flow-kind mono-meta">{item.kind}</span>
      <span className="hero-flow-label">{item.label}</span>
      <span className="hero-flow-detail">{item.detail}</span>
    </li>
  );
}

export default function Hero() {
  const loop = [...flowItems, ...flowItems];

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'var(--bg-0)',
        paddingTop: 'calc(var(--nav-h) + clamp(2.5rem, 6vw, 4.5rem))',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
      }}
    >
      <div className="wrap">
        <div className="hero-consult-grid">
          <div>
            <p className="mono-meta" style={{ marginBottom: '1.5rem' }}>
              IT consulting &amp; software development
            </p>

            <h1
              className="display"
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4.25rem)',
                maxWidth: '14ch',
                marginBottom: '1.5rem',
              }}
            >
              Technology expertise. Delivered through engineering.
            </h1>

            <p className="subheading" style={{ marginBottom: '2rem', maxWidth: '40rem' }}>
              29.tech is an IT consulting and software development partner helping
              businesses design, build and scale custom digital solutions, AI systems
              and modern cloud infrastructure.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link href="/contact" id="hero-cta-start" className="btn btn-fill">
                Discuss Your Project
              </Link>
              <a href="#work" id="hero-cta-work" className="btn btn-outline">
                Explore Our Work
              </a>
            </div>
          </div>

          <aside className="hero-flow" aria-label="Solutions, industries and capabilities we deliver">
            <p className="mono-meta hero-flow-caption">What we build across industries</p>
            <div className="hero-flow-window">
              <ul className="hero-flow-track">
                {loop.map((item, i) => (
                  <FlowRow key={`${item.label}-${i}`} item={item} />
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

const capabilities = [
  {
    id: 'cap-software',
    title: 'Custom Software Development',
    summary:
      'Full-stack engineering for applications that need to perform under real business constraints.',
    items: [
      'Web applications',
      'Mobile applications',
      'Enterprise applications',
      'Backend systems',
    ],
  },
  {
    id: 'cap-ai',
    title: 'AI & Intelligent Automation',
    summary:
      'Practical AI systems that reduce manual work and integrate into existing operations.',
    items: [
      'AI agents',
      'RAG applications',
      'LLM integrations',
      'Workflow automation',
    ],
  },
  {
    id: 'cap-saas',
    title: 'SaaS & Product Engineering',
    summary:
      'Product engineering for client platforms — from first release through scale.',
    items: [
      'MVP development',
      'Multi-tenant architecture',
      'Product modernization',
      'Platform scaling',
    ],
  },
  {
    id: 'cap-cloud',
    title: 'Cloud & DevOps',
    summary:
      'Reliable infrastructure so software can ship safely and stay observable in production.',
    items: [
      'Cloud infrastructure',
      'CI/CD pipelines',
      'Containerization',
      'Monitoring & reliability',
    ],
  },
  {
    id: 'cap-integration',
    title: 'Integration & Modernization',
    summary:
      'Connect systems, retire brittle legacy paths, and keep data and workflows coherent.',
    items: [
      'API integrations',
      'Legacy system modernization',
      'Database architecture',
      'Third-party integrations',
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="section" style={{ background: 'var(--bg-1)' }}>
      <div className="wrap">
        <div
          className="cap-header"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
            alignItems: 'end',
          }}
        >
          <h2 className="heading">
            Consulting and engineering
            <br />
            capabilities.
          </h2>
          <p className="subheading" style={{ marginBottom: 0 }}>
            We provide the technical expertise and delivery capacity businesses need
            to design, build and operate custom software — not a packaged product of our own.
          </p>
        </div>

        <div className="cap-list">
          {capabilities.map((cap, i) => (
            <article key={cap.id} id={cap.id} className="cap-block">
              <div className="cap-index mono-meta">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="cap-main">
                <h3 className="cap-title">{cap.title}</h3>
                <p className="cap-summary">{cap.summary}</p>
              </div>
              <ul className="cap-items">
                {cap.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .cap-header {
            grid-template-columns: 1fr !important;
            align-items: start !important;
          }
        }
      `}</style>
    </section>
  );
}

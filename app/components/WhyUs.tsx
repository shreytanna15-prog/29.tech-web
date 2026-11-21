import Link from 'next/link';

const reasons = [
  {
    title: 'Direct communication with engineers',
    body: 'You speak with the people designing and writing the software — decisions stay fast and technical.',
  },
  {
    title: 'End-to-end project accountability',
    body: 'One team owns discovery through deployment, so scope, quality and timelines stay connected.',
  },
  {
    title: 'Transparent development process',
    body: 'Clear milestones, regular demos and visible progress. You always know where the work stands.',
  },
  {
    title: 'Scalable engineering solutions',
    body: 'Architecture and delivery choices made for growth — not just the first release.',
  },
  {
    title: 'Flexible engagement models',
    body: 'Projects, dedicated teams, consulting or ongoing maintenance — matched to how you need to work.',
  },
  {
    title: 'Long-term technical partnership',
    body: 'We stay available after launch for iteration, support and infrastructure reliability.',
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
            <h2 className="heading">
              Why businesses
              <br />
              choose 29.tech.
            </h2>
          </div>
          <div>
            <p className="subheading" style={{ marginBottom: '1.5rem' }}>
              We are built for companies that need a reliable technology partner —
              not a black-box vendor or a one-off freelance handoff.
            </p>
            <Link href="/contact" className="btn btn-ink">
              Discuss Your Project
            </Link>
          </div>
        </div>

        <div className="why-grid">
          {reasons.map((r) => (
            <article key={r.title} className="why-item">
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .why-header {
            grid-template-columns: 1fr !important;
            align-items: start !important;
          }
        }
      `}</style>
    </section>
  );
}

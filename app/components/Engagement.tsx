const models = [
  {
    n: '01',
    title: 'End-to-End Project Development',
    body: 'From requirements and architecture through development, testing and deployment — one accountable engineering partner.',
  },
  {
    n: '02',
    title: 'Dedicated Development Team',
    body: 'Extend your existing engineering capacity with experienced developers who work as part of your delivery rhythm.',
  },
  {
    n: '03',
    title: 'Technical Consulting',
    body: 'Architecture reviews, technology selection, engineering strategy and guidance before or alongside implementation.',
  },
  {
    n: '04',
    title: 'Ongoing Development & Maintenance',
    body: 'Continuous improvements, support, infrastructure management and reliability work after launch.',
  },
  {
    n: '05',
    title: 'AI Implementation',
    body: 'Integrate AI capabilities and automation into existing business operations with clear scope and measurable outcomes.',
  },
];

export default function Engagement() {
  return (
    <section
      id="engagement"
      className="section section-ink"
      style={{ paddingBlock: 'var(--section-y)' }}
    >
      <div className="wrap">
        <div
          className="engage-header"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
            alignItems: 'end',
          }}
        >
          <h2 className="heading">How businesses work with us.</h2>
          <p className="subheading" style={{ marginBottom: 0 }}>
            Engagement models for projects of different shapes — fixed delivery,
            embedded teams, advisory work, or long-term partnership.
          </p>
        </div>

        <div className="engage-list">
          {models.map((m) => (
            <article key={m.n} className="engage-row" id={`engage-${m.n}`}>
              <div className="engage-n mono-meta">{m.n}</div>
              <h3 className="engage-title">{m.title}</h3>
              <p className="engage-body">{m.body}</p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .engage-header {
            grid-template-columns: 1fr !important;
            align-items: start !important;
          }
        }
      `}</style>
    </section>
  );
}

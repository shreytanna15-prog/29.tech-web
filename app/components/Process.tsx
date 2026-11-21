const steps = [
  {
    n: '01',
    title: 'Discovery',
    body: 'We map business goals, users and constraints. Scope, timeline and risks are defined before engineering begins.',
    duration: '1–2 weeks',
    deliverables: ['Tech brief', 'Scope document', 'Timeline'],
  },
  {
    n: '02',
    title: 'Design & Architecture',
    body: 'Interfaces, system design and technical decisions that match the problem — not a template stack.',
    duration: '1–3 weeks',
    deliverables: ['Prototypes', 'Architecture', 'Approval'],
  },
  {
    n: '03',
    title: 'Development',
    body: 'Agile delivery with direct engineer access. Regular demos so stakeholders see progress in working software.',
    duration: '4–16 weeks',
    deliverables: ['Sprint demos', 'Test reports', 'Staging environment'],
  },
  {
    n: '04',
    title: 'Deploy & Support',
    body: 'Production launch with CI/CD, monitoring and ongoing support. We remain available to improve and scale.',
    duration: 'Ongoing',
    deliverables: ['Live deploy', 'Monitoring', 'Maintenance'],
  },
];

export default function Process() {
  return (
    <section id="process" className="section" style={{ background: 'var(--bg-0)' }}>
      <div className="wrap">
        <div
          className="process-header"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
            gap: 'clamp(2rem, 5vw, 4rem)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            alignItems: 'end',
          }}
        >
          <h2 className="heading">
            How we deliver
            <br />
            client projects.
          </h2>
          <p className="subheading" style={{ marginBottom: 0 }}>
            A transparent delivery process from first conversation through production
            support — designed for consulting engagements, not product onboarding funnels.
          </p>
        </div>

        <div className="process-list">
          {steps.map((s) => (
            <article key={s.n} className="process-step" id={`process-${s.n}`}>
              <div className="process-step-n">{s.n}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <div className="process-meta">
                  <span>{s.duration}</span>
                  {s.deliverables.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .process-header {
            grid-template-columns: 1fr !important;
            align-items: start !important;
          }
        }
      `}</style>
    </section>
  );
}

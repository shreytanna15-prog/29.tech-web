const groups = [
  {
    title: 'Languages & frameworks',
    items: ['TypeScript', 'Python', 'React', 'Next.js', 'Node.js', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    title: 'Data & APIs',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST'],
  },
  {
    title: 'Cloud & operations',
    items: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes'],
  },
  {
    title: 'AI & design',
    items: ['OpenAI', 'RAG systems', 'TensorFlow', 'Figma'],
  },
];

export default function TechExpertise() {
  return (
    <section id="technologies" className="section" style={{ background: 'var(--bg-0)' }}>
      <div className="wrap">
        <div
          className="tech-header"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            marginBottom: 'clamp(2rem, 4vw, 2.75rem)',
            alignItems: 'end',
          }}
        >
          <h2 className="heading">Technology we work with.</h2>
          <p className="subheading" style={{ marginBottom: 0 }}>
            Tools chosen for the engagement — not a trend list. We select platforms
            that fit the problem, team and long-term ownership model.
          </p>
        </div>

        <div className="tech-groups">
          {groups.map((g) => (
            <div key={g.title} className="tech-group">
              <div className="mono-meta" style={{ marginBottom: '0.85rem' }}>
                {g.title}
              </div>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .tech-header {
            grid-template-columns: 1fr !important;
            align-items: start !important;
          }
        }
      `}</style>
    </section>
  );
}

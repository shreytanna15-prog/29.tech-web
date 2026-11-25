import Link from 'next/link';

export default function About() {
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-1)' }}>
      <div className="wrap">
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
            gap: 'clamp(2.5rem, 6vw, 5rem)',
            alignItems: 'start',
          }}
        >
          <div>
            <p className="mono-meta" style={{ marginBottom: '1rem' }}>
              About 29.tech
            </p>
            <h2 className="heading" style={{ marginBottom: '1.25rem' }}>
              An engineering partner for businesses that need software built properly.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p className="subheading" style={{ maxWidth: 'none' }}>
              29.tech is an IT consulting and software development company. We work with
              startups, SMEs and established organisations to design, build and maintain
              custom digital systems — web and mobile applications, SaaS platforms for
              clients, AI implementations and cloud infrastructure.
            </p>
            <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-2)', lineHeight: 1.7 }}>
              Our approach is practical and accountable: understand the business problem,
              choose the right architecture, deliver working software in clear stages, and
              stay available for the work that comes after launch.
            </p>
            <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-2)', lineHeight: 1.7 }}>
              We specialise in engineering quality and direct communication. Clients get
              access to the people doing the work — not a chain of intermediaries.
            </p>
            <p
              className="mono-meta"
              style={{ marginTop: '0.5rem' }}
            >
              Based in Rajkot, Gujarat, India — working with clients internationally.
            </p>
            <div style={{ marginTop: '0.75rem' }}>
              <Link href="/contact" className="btn btn-fill">
                Discuss Your Project
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

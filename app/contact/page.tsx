import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactActions from '../components/ContactActions';

export const metadata: Metadata = {
  title: 'Discuss Your Project — 29.tech',
  description:
    'Tell us what you need to build or improve. Share requirements, budget and timeline — or book a call with an engineer from 29.tech.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Discuss Your Project — 29.tech',
    description:
      'Book a discovery call or send a project brief. An engineer replies within one business day.',
    url: 'https://www.29tech.io/contact',
    images: [
      {
        url: '/social_og.png',
        width: 1200,
        height: 675,
        type: 'image/png',
        alt: 'Discuss Your Project — 29.tech',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discuss Your Project — 29.tech',
    description:
      'Book a discovery call or send a project brief. An engineer replies within one business day.',
    images: ['/social_og.png'],
    creator: '@29dot_tech',
  },
};

const details = [
  {
    id: 'ct-email',
    label: 'Email',
    value: 'hello@29tech.io',
    href: 'mailto:hello@29tech.io',
  },
  {
    id: 'ct-phone',
    label: 'Call or WhatsApp',
    value: '+91 88490 89880',
    href: 'tel:+918849089880',
  },
  {
    id: 'ct-location',
    label: 'Studio',
    value: 'Rajkot, Gujarat, India',
    href: undefined as string | undefined,
  },
];

const steps = [
  {
    title: 'We read your brief',
    body: 'An engineer — not a sales rep — reviews what you sent, usually within one business day.',
  },
  {
    title: 'A 30-minute call',
    body: 'We dig into scope, constraints, and what success looks like. No obligation, no pitch deck.',
  },
  {
    title: 'Scope, timeline, quote',
    body: 'You get a written plan with milestones and a fixed quote before anyone writes code.',
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1" style={{ background: 'var(--bg-0)' }}>
        <section
          style={{
            paddingTop: 'calc(var(--nav-h) + clamp(2.5rem, 6vw, 4rem))',
            paddingBottom: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          <div className="wrap">
            <p className="mono-meta" style={{ marginBottom: '1.25rem' }}>
              Contact
            </p>
            <h1
              className="display"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                marginBottom: '1.15rem',
                maxWidth: '16ch',
              }}
            >
              Discuss your project with our engineers.
            </h1>
            <p className="subheading" style={{ maxWidth: '42rem' }}>
              Book a discovery call on our calendar, or send a written brief.
              We&apos;ll come back with a plan, a timeline and a clear answer on
              approach and cost.
            </p>
          </div>
        </section>

        <section
          style={{
            borderTop: '1px solid var(--border-1)',
            borderBottom: '1px solid var(--border-1)',
            background: 'var(--bg-1)',
          }}
        >
          <div className="wrap">
            <div className="contact-reach">
              {details.map((d) => (
                <div key={d.id} className="contact-reach-item">
                  <div className="mono-meta" style={{ marginBottom: 6 }}>
                    {d.label}
                  </div>
                  {d.href ? (
                    <a
                      id={d.id}
                      href={d.href}
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-1)',
                        textDecoration: 'none',
                      }}
                    >
                      {d.value}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-1)',
                      }}
                    >
                      {d.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactActions />

        <section
          className="section"
          style={{
            background: 'var(--bg-1)',
            borderTop: '1px solid var(--border-1)',
            paddingTop: 'clamp(3rem, 6vw, 4.5rem)',
          }}
        >
          <div className="wrap">
            <h2 className="heading" style={{ marginBottom: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
              What happens next
            </h2>
            <div className="contact-next">
              {steps.map((step, i) => (
                <article key={step.title} className="contact-next-item">
                  <div className="mono-meta" style={{ marginBottom: '0.75rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3
                    style={{
                      margin: '0 0 0.5rem',
                      fontSize: '1.05rem',
                      fontWeight: 500,
                      letterSpacing: '-0.02em',
                      color: 'var(--text-1)',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.925rem',
                      color: 'var(--text-2)',
                      lineHeight: 1.65,
                    }}
                  >
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

'use client';

import { useState } from 'react';
import ContactForm from './ContactForm';
import CalEmbed from './CalEmbed';
import { CAL_BOOKING_URL } from '../lib/cal';

type Mode = 'schedule' | 'brief';

const modes: { id: Mode; label: string; title: string; body: string }[] = [
  {
    id: 'brief',
    label: 'Send a brief',
    title: 'Send a project brief',
    body: 'The more context you share, the faster we can respond with a useful plan.',
  },
  {
    id: 'schedule',
    label: 'Schedule a meeting',
    title: 'Schedule a meeting',
    body: "Choose a slot that works for you. We'll confirm by email and use the call to understand scope, constraints and next steps.",
  },
];

export default function ContactActions() {
  const [mode, setMode] = useState<Mode>('brief');
  const active = modes.find((m) => m.id === mode)!;

  return (
    <section
      id="contact-actions"
      className="section"
      style={{
        background: 'var(--bg-0)',
        scrollMarginTop: 'calc(var(--nav-h) + 1rem)',
      }}
    >
      <div className="wrap">
        <div className="contact-mode-toggle" role="tablist" aria-label="Contact method">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              id={`contact-tab-${m.id}`}
              aria-selected={mode === m.id}
              aria-controls={`contact-panel-${m.id}`}
              className={`contact-mode-btn${mode === m.id ? ' is-active' : ''}`}
              onClick={() => setMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '1rem',
            alignItems: 'end',
            marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
          }}
        >
          <div style={{ maxWidth: '36rem' }}>
            <h2 className="heading" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              {active.title}
            </h2>
            <p className="subheading" style={{ marginTop: '0.75rem' }}>
              {active.body}
            </p>
          </div>
          {mode === 'schedule' && (
            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              id="cal-open-external"
            >
              Open in Cal.com
            </a>
          )}
        </div>

        <div
          id={`contact-panel-${mode}`}
          role="tabpanel"
          aria-labelledby={`contact-tab-${mode}`}
        >
          {mode === 'schedule' ? (
            <CalEmbed />
          ) : (
            <div className="contact-form-shell">
              <ContactForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

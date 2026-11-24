'use client';

import { useEffect, useId, useRef, useState } from 'react';

const SERVICES = [
  'Custom Software Development',
  'Web Application Development',
  'Mobile Application Development',
  'AI & Intelligent Automation',
  'SaaS & Product Engineering',
  'Cloud & DevOps',
  'Integration & Modernization',
  'Technical Consulting',
  'Ongoing Development & Maintenance',
  'UI/UX Design',
  'Something else',
];

const BUDGETS = ['Under $1K', '$1K – $5K', '$5K – $10K', 'Over $10K'];

const TIMELINES = ['ASAP', 'In 1–3 months', 'In 3–6 months', 'Just exploring'];

const SOURCES = ['Google search', 'LinkedIn', 'Referral', 'Clutch / Upwork', 'Social media', 'Other'];

type Enquiry = {
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  budget: string;
  timeline: string;
  source: string;
  message: string;
  nda: boolean;
};

const EMPTY: Enquiry = {
  name: '', email: '', phone: '', company: '',
  services: [], budget: '', timeline: '', source: '',
  message: '', nda: false,
};

type Errors = Partial<Record<keyof Enquiry, string>>;

function validate(form: Enquiry): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = 'Please tell us your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Please enter a valid email address.';
  if (form.phone.replace(/\D/g, '').length < 7) errors.phone = 'Please enter a reachable phone number.';
  if (form.services.length === 0) errors.services = 'Pick at least one service.';
  if (!form.budget) errors.budget = 'Pick a budget range.';
  if (form.message.trim().length < 20) errors.message = 'A couple of sentences helps us prepare a useful reply.';
  return errors;
}

function Field({
  id, label, optional, error, children,
}: {
  id: string; label: string; optional?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
        {optional && <span className="field-optional">optional</span>}
      </label>
      {children}
      {error && <span className="field-error" role="alert">{error}</span>}
    </div>
  );
}

function MultiSelectDropdown({
  id,
  options,
  value,
  placeholder,
  invalid,
  onChange,
}: {
  id: string;
  options: string[];
  value: string[];
  placeholder: string;
  invalid?: boolean;
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const toggle = (option: string) => {
    onChange(
      value.includes(option)
        ? value.filter(v => v !== option)
        : [...value, option],
    );
  };

  const summary = value.length === 0
    ? placeholder
    : value.length <= 2
      ? value.join(', ')
      : `${value.length} services selected`;

  return (
    <div className={`multi-select${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        id={id}
        type="button"
        className="field-input multi-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={invalid || undefined}
        onClick={() => setOpen(o => !o)}
      >
        <span className={value.length ? 'multi-select-value' : 'multi-select-placeholder'}>
          {summary}
        </span>
      </button>

      {open && (
        <div id={listId} className="multi-select-menu" role="listbox" aria-multiselectable="true">
          {options.map(option => {
            const selected = value.includes(option);
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={selected}
                className={`multi-select-option${selected ? ' is-selected' : ''}`}
                onClick={() => toggle(option)}
              >
                <span className="multi-select-check" aria-hidden="true">
                  {selected && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<Enquiry>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const set = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => (e[key] ? { ...e, [key]: undefined } : e));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`cf-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('sent');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="contact-form-body" style={{ paddingBlock: '1rem' }}>
        <p className="mono-meta" style={{ marginBottom: '0.75rem' }}>
          Enquiry received
        </p>
        <h2 className="heading" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '0.75rem' }}>
          Thanks — we&apos;ve got it.
        </h2>
        <p className="subheading" style={{ marginBottom: '2rem' }}>
          One of our engineers will read your brief and reply within one business day.
          Need to talk sooner? Call <a href="tel:+918849089880" style={{ color: 'var(--text-1)' }}>+91 88490 89880</a>.
        </p>
        <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form id="contact-form" className="contact-form-body" onSubmit={handleSubmit} noValidate>
      <div className="form-section">
        <div className="form-row">
          <Field id="cf-name" label="Your name" error={errors.name}>
            <input
              id="cf-name" name="name" className="field-input" type="text" autoComplete="name"
              placeholder="Jane Doe" value={form.name} aria-invalid={!!errors.name}
              onChange={e => set('name', e.target.value)}
            />
          </Field>
          <Field id="cf-company" label="Company name" optional>
            <input
              id="cf-company" name="company" className="field-input" type="text" autoComplete="organization"
              placeholder="Acme Inc." value={form.company}
              onChange={e => set('company', e.target.value)}
            />
          </Field>
        </div>

        <div className="form-row">
          <Field id="cf-email" label="Email" error={errors.email}>
            <input
              id="cf-email" name="email" className="field-input" type="email" autoComplete="email"
              placeholder="you@company.com" value={form.email} aria-invalid={!!errors.email}
              onChange={e => set('email', e.target.value)}
            />
          </Field>
          <Field id="cf-phone" label="Phone / WhatsApp" error={errors.phone}>
            <input
              id="cf-phone" name="phone" className="field-input" type="tel" autoComplete="tel"
              placeholder="+91 88490 89880" value={form.phone} aria-invalid={!!errors.phone}
              onChange={e => set('phone', e.target.value)}
            />
          </Field>
        </div>
      </div>

      <div className="form-section">
        <Field id="cf-services" label="Services required" error={errors.services}>
          <MultiSelectDropdown
            id="cf-services"
            options={SERVICES}
            value={form.services}
            placeholder="Select one or more services"
            invalid={!!errors.services}
            onChange={next => set('services', next)}
          />
        </Field>

        <div className="form-row">
          <Field id="cf-budget" label="Budget (USD)" error={errors.budget}>
            <select
              id="cf-budget" name="budget" className="field-input"
              value={form.budget} aria-invalid={!!errors.budget}
              onChange={e => set('budget', e.target.value)}
            >
              <option value="">Select budget range</option>
              {BUDGETS.map(budget => <option key={budget} value={budget}>{budget}</option>)}
            </select>
          </Field>

          <Field id="cf-timeline" label="Timeline" optional>
            <select
              id="cf-timeline" name="timeline" className="field-input"
              value={form.timeline}
              onChange={e => set('timeline', e.target.value)}
            >
              <option value="">Select timeline</option>
              {TIMELINES.map(timeline => <option key={timeline} value={timeline}>{timeline}</option>)}
            </select>
          </Field>
        </div>
      </div>

      <div className="form-section">
        <Field id="cf-message" label="Tell us about your idea or requirement" error={errors.message}>
          <textarea
            id="cf-message" name="message" className="field-input" rows={6}
            placeholder="What are you building, who is it for, and what does success look like? Share any links, existing systems, or deadlines we should know about."
            value={form.message} aria-invalid={!!errors.message}
            onChange={e => set('message', e.target.value)}
          />
        </Field>

        <Field id="cf-source" label="How did you hear about us?" optional>
          <select
            id="cf-source" name="source" className="field-input"
            value={form.source} onChange={e => set('source', e.target.value)}
          >
            <option value="">Select an option</option>
            {SOURCES.map(source => <option key={source} value={source}>{source}</option>)}
          </select>
        </Field>

        <label className="checkbox-row">
          <input
            type="checkbox" name="nda" checked={form.nda}
            onChange={e => set('nda', e.target.checked)}
          />
          <span>I&apos;d like to sign an NDA before sharing the details.</span>
        </label>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem 1.5rem',
            marginTop: '0.5rem',
          }}
        >
          <button
            type="submit"
            id="cf-submit"
            className="btn btn-fill"
            style={{ fontSize: '0.95rem' }}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          </button>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-3)', maxWidth: '36ch' }}>
            We reply within one business day. Your details stay with our team.
          </p>
        </div>

        {status === 'error' && (
          <p className="field-error" role="alert" style={{ margin: 0 }}>
            Something went wrong sending that. Please email{' '}
            <a href="mailto:hello@29tech.io" style={{ color: 'var(--text-1)' }}>hello@29tech.io</a> instead.
          </p>
        )}
      </div>
    </form>
  );
}

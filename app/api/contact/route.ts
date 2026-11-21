type Enquiry = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  services: string[];
  budget: string;
  timeline?: string;
  source?: string;
  message: string;
  nda?: boolean;
};

function isValid(body: unknown): body is Enquiry {
  if (typeof body !== 'object' || body === null) return false;
  const e = body as Record<string, unknown>;
  return (
    typeof e.name === 'string' && e.name.trim().length > 0 &&
    typeof e.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email) &&
    typeof e.phone === 'string' && e.phone.replace(/\D/g, '').length >= 7 &&
    Array.isArray(e.services) && e.services.length > 0 &&
    typeof e.budget === 'string' && e.budget.length > 0 &&
    typeof e.message === 'string' && e.message.trim().length >= 20
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!isValid(body)) {
    return Response.json({ ok: false, error: 'Missing or invalid fields.' }, { status: 422 });
  }

  const enquiry = {
    ...body,
    receivedAt: new Date().toISOString(),
  };

  // Delivery is handled by whatever is on the other end of CONTACT_WEBHOOK_URL
  // (Zapier, Make, n8n, a Slack incoming webhook, or a small mailer endpoint).
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    console.warn('[contact] CONTACT_WEBHOOK_URL is not set — enquiry logged only:', enquiry);
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (error) {
    console.error('[contact] Failed to deliver enquiry:', error, enquiry);
    return Response.json({ ok: false, error: 'Could not deliver enquiry.' }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true });
}

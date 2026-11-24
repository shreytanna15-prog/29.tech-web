import prisma from '@/app/lib/prisma';

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

  const receivedAt = new Date().toISOString();
  let savedId: string | undefined = undefined;

  // 1. Persist to database (Supabase via Prisma)
  try {
    const record = await prisma.enquiry.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        company: body.company?.trim() || null,
        services: body.services,
        budget: body.budget,
        timeline: body.timeline || null,
        source: body.source || null,
        message: body.message.trim(),
        nda: Boolean(body.nda),
        status: 'new',
      },
    });

    savedId = record.id;

    // Log the submission activity
    await prisma.activity.create({
      data: {
        type: 'form_submission',
        entityId: record.id,
        description: `New enquiry from ${record.name} (${record.company || record.email})`,
        metadata: {
          budget: record.budget,
          services: record.services,
          nda: record.nda,
        },
      },
    });
  } catch (dbError) {
    console.error('[contact] Database persistence failed:', dbError);
    // Continue so external webhook or fallback can still proceed
  }

  // 2. Webhook delivery (Zapier, Make, n8n, Slack, mailer, etc.)
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const payload = {
    ...body,
    id: savedId,
    receivedAt,
  };

  if (!webhook) {
    if (!savedId) {
      console.warn('[contact] Neither DB nor CONTACT_WEBHOOK_URL succeeded. Logged payload:', payload);
    }
    return Response.json({ ok: true, delivered: false, id: savedId });
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (error) {
    console.error('[contact] Failed to deliver webhook:', error, payload);
    // If it was already saved in DB, we don't treat it as a total failure to the user
    if (savedId) {
      return Response.json({ ok: true, delivered: false, id: savedId });
    }
    return Response.json({ ok: false, error: 'Could not deliver enquiry.' }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true, id: savedId });
}

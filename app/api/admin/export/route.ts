import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

function escapeCsvField(value: unknown): string {
  if (value === null || value === undefined) return '""';
  if (Array.isArray(value)) return `"${value.join(', ').replace(/"/g, '""')}"`;
  const str = String(value);
  return `"${str.replace(/"/g, '""')}"`;
}

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const headers = [
      'ID',
      'Created At',
      'Status',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Budget',
      'Timeline',
      'Services',
      'Source',
      'NDA Requested',
      'Message',
      'Internal Notes',
    ];

    const rows = enquiries.map((e) => [
      escapeCsvField(e.id),
      escapeCsvField(e.createdAt.toISOString()),
      escapeCsvField(e.status),
      escapeCsvField(e.name),
      escapeCsvField(e.email),
      escapeCsvField(e.phone),
      escapeCsvField(e.company),
      escapeCsvField(e.budget),
      escapeCsvField(e.timeline),
      escapeCsvField(e.services),
      escapeCsvField(e.source),
      escapeCsvField(e.nda ? 'Yes' : 'No'),
      escapeCsvField(e.message),
      escapeCsvField(e.internalNotes),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    // Log the export event
    try {
      await prisma.activity.create({
        data: {
          type: 'export_csv',
          description: `Exported ${enquiries.length} enquiries to CSV`,
          metadata: { count: enquiries.length },
        },
      });
    } catch {
      // ignore
    }

    const dateStr = new Date().toISOString().split('T')[0];
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="29tech-enquiries-${dateStr}.csv"`,
      },
    });
  } catch (error) {
    console.error('[admin/export] Export error:', error);
    return NextResponse.json(
      { ok: false, error: 'Could not export CSV' },
      { status: 500 }
    );
  }
}

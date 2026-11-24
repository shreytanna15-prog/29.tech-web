import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '40', 10)));
    const type = searchParams.get('type');

    const where: Record<string, unknown> = {};
    if (type) {
      where.type = type;
    }

    const activities = await prisma.activity.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        enquiry: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
          },
        },
      },
    });

    return NextResponse.json({ ok: true, activities });
  } catch (error) {
    console.error('[admin/activities] Fetch error:', error);
    return NextResponse.json(
      { ok: false, error: 'Could not fetch activities' },
      { status: 500 }
    );
  }
}

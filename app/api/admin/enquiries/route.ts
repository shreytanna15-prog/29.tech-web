import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.trim();
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '50', 10)));
    const skip = (page - 1) * limit;

    const where: Prisma.EnquiryWhereInput = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [enquiries, total, countsByStatus] = await Promise.all([
      prisma.enquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.enquiry.count({ where }),
      prisma.enquiry.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ]);

    const statusCounts: Record<string, number> = {
      all: 0,
      new: 0,
      contacted: 0,
      in_discussion: 0,
      converted: 0,
      archived: 0,
    };

    let totalAll = 0;
    for (const group of countsByStatus) {
      statusCounts[group.status] = group._count.status;
      totalAll += group._count.status;
    }
    statusCounts.all = totalAll;

    return NextResponse.json({
      ok: true,
      enquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      statusCounts,
    });
  } catch (error) {
    console.error('[admin/enquiries] Error fetching enquiries:', error);
    return NextResponse.json(
      { ok: false, error: 'Could not fetch enquiries' },
      { status: 500 }
    );
  }
}

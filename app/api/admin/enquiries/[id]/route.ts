import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const enquiry = await prisma.enquiry.findUnique({
      where: { id },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!enquiry) {
      return NextResponse.json({ ok: false, error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, enquiry });
  } catch (error) {
    console.error('[admin/enquiries/[id]] Fetch error:', error);
    return NextResponse.json({ ok: false, error: 'Error fetching enquiry' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, internalNotes } = body ?? {};

    const current = await prisma.enquiry.findUnique({
      where: { id },
    });

    if (!current) {
      return NextResponse.json({ ok: false, error: 'Enquiry not found' }, { status: 404 });
    }

    const dataToUpdate: Record<string, unknown> = {};
    if (typeof status === 'string' && status !== current.status) {
      dataToUpdate.status = status;
    }
    if (typeof internalNotes === 'string') {
      dataToUpdate.internalNotes = internalNotes;
    }

    const updated = await prisma.enquiry.update({
      where: { id },
      data: dataToUpdate,
    });

    // Log activity if status changed
    if (status && status !== current.status) {
      await prisma.activity.create({
        data: {
          type: 'status_change',
          entityId: id,
          description: `Status changed from "${current.status}" to "${status}"`,
          metadata: { oldStatus: current.status, newStatus: status },
        },
      });
    }

    // Log activity if note was updated
    if (typeof internalNotes === 'string' && internalNotes !== current.internalNotes) {
      await prisma.activity.create({
        data: {
          type: 'note_updated',
          entityId: id,
          description: `Internal notes updated for ${current.name}`,
        },
      });
    }

    return NextResponse.json({ ok: true, enquiry: updated });
  } catch (error) {
    console.error('[admin/enquiries/[id]] Update error:', error);
    return NextResponse.json({ ok: false, error: 'Error updating enquiry' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.enquiry.delete({
      where: { id },
    });

    await prisma.activity.create({
      data: {
        type: 'enquiry_deleted',
        description: `Enquiry ${id} was deleted`,
      },
    });

    return NextResponse.json({ ok: true, message: 'Enquiry deleted' });
  } catch (error) {
    console.error('[admin/enquiries/[id]] Delete error:', error);
    return NextResponse.json({ ok: false, error: 'Error deleting enquiry' }, { status: 500 });
  }
}

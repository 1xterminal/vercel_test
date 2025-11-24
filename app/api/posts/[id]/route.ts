import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = Number((await params).id);
    await prisma.post.delete({
        where: { id },
    });
    return NextResponse.json({ success: true });
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = Number((await params).id);
    const { title, content } = await request.json();
    const post = await prisma.post.update({
        where: { id },
        data: { title, content },
    });
    return NextResponse.json(post);
}

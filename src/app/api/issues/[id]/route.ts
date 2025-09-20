import { createIssueSchema } from "@/app/ValidationSchema";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json();
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({}, { status: 401 });
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format, { status: 40 })

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue)
        return NextResponse.json({ error: 'Invalid issue' }, { status: 400 })
    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description
        }
    })
    return NextResponse.json(updatedIssue)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({}, { status: 401 });
    if (!issue)
        return NextResponse.json({ error: 'Invalid issue' }, { status: 400 })
    await prisma.issue.delete({ where: { id: issue.id } })
    return NextResponse.json({})
}
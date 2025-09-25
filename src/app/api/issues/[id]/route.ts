import { patchIssueSchema } from "@/app/ValidationSchema";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/auth/authOptions";
import { error } from "console";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json();
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({}, { status: 401 });
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format, { status: 40 })

    
    if(body.AssignedToUserId){ 
      const user = await  prisma.user.findUnique({ where : {id: body.AssignedToUserId}})
    if(!user)
        return NextResponse.json({error:"Invalid user."},{status:400})
    
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue)
        return NextResponse.json({ error: 'Invalid issue' }, { status: 400 })
    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description,
            assignedToUserId: body.AssignedToUserId,
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
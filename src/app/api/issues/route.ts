import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client"
import { createIssueSchema } from "@/app/ValidationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session)
        return NextResponse.json({},{status:401});

    try {
        const body = await request.json();

        const validation = createIssueSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json(validation.error.format(), { status: 400 });

        const newIssue = await prisma.issue.create({
            data: { title: body.title, description: body.description }
        });

        return NextResponse.json(newIssue);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const issues = await prisma.issue.findMany({
            orderBy: { createdAt: 'desc' }
        });
        
        return NextResponse.json(issues);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
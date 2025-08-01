import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../../prisma/client"

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const validation = createIssueSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json(validation.error.errors, { status: 400 });

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
            orderBy: { createAt: 'desc' }
        });
        
        return NextResponse.json(issues);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
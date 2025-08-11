import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma/client"
import IssueStatusBadge from "@/app/component/IssueStatusBadge";
import { Card, Flex } from "@radix-ui/themes";

interface Props{
    params:{id:string}
    
}
export default async function page( {params}: Props){
    
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id)}
    });
    if (!issue)
        notFound();
    return(
        <>
        <div>
            <p className="text-3xl font-bold">{issue.title}</p>
            <Flex>

            <IssueStatusBadge status={issue.status}/>
            <p>{issue.createdAt.toDateString()}</p>
            </Flex>
            <Card className="mt-2">
            <p>{issue.description}</p>

            </Card>
        </div>
        </>
    )
}
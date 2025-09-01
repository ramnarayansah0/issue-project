import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma/client"
import IssueStatusBadge from "@/app/component/IssueStatusBadge";
import { Button, Card, Flex } from "@radix-ui/themes";
import ReactMarkdown from 'react-markdown'
import {Pencil2Icon, TrashIcon} from '@radix-ui/react-icons'
import Link from "next/link";
import DeleteIssueButton from "./DeleteIssueButton";

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
            <div className="flex justify-between">

            <p className="text-3xl font-bold">{issue.title}</p>
            <Flex gap="4">
            <Button><Pencil2Icon/>
             <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
             </Button>
            <DeleteIssueButton issueId={issue.id}/>
            </Flex>
            </div>
            
            
            <Flex>

            <IssueStatusBadge status={issue.status}/>
            <p>{issue.createdAt.toDateString()}</p>
            </Flex>
            <Card className="mt-2 prose">
                    
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            

            </Card>
        </div>
        </>
    )
}
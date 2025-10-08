

import { Button, Table } from "@radix-ui/themes"
import Link from ".//../component/Link"
import { prisma } from "../../../prisma/client";
import IssueStatusBadge from "../component/IssueStatusBadge";
import Filter from "./Filter";
import { Status } from "@/generated/prisma";

export default async function Page({searchParams}:{searchParams:{status?:string}}){
 // Debug: Log the search params and Status enum values
 console.log('Search params:', searchParams);
 console.log('Status enum values:', Object.values(Status));
 console.log('Status enum includes check:', searchParams.status ? Object.values(Status).includes(searchParams.status as Status) : 'no status');
 
 // Build the where clause for filtering
 const whereClause = searchParams.status && 
   searchParams.status !== "all" && 
   Object.values(Status).includes(searchParams.status as Status)
   ? { status: searchParams.status as Status }
   : {};

 console.log('Where clause:', whereClause);

 const issues = await prisma.issue.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
 });

 console.log('Found issues with statuses:', issues.map(i => ({ id: i.id, title: i.title, status: i.status })));



    return(
        <>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
                <Button size="2" className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/issues/new">New Issue</Link>
                </Button>
            </div>
            <div className="w-full sm:w-auto">
                <Filter searchParams={searchParams}/>
            </div>
        </div>
        <div>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.length === 0 ? (
                        <Table.Row>
                            <Table.Cell colSpan={3} className="text-center py-8 text-gray-500">
                                {searchParams.status && searchParams.status !== "all" 
                                    ? `No ${searchParams.status.toLowerCase().replace('_', ' ')} issues found.`
                                    : "No issues found. Create your first issue to get started!"
                                }
                            </Table.Cell>
                        </Table.Row>
                    ) : (
                        issues.map(issue=>(
                            <Table.Row key={issue.id} className="hover:bg-gray-50">
                                <Table.Cell>
                                    <Link href={`/issues/${issue.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                                        {issue.title} 
                                    </Link>
                                    <div className="block md:hidden mt-1">
                                        <IssueStatusBadge status={issue.status}/>
                                    </div>
                                </Table.Cell>
                                
                                <Table.Cell className="hidden md:table-cell">
                                    <IssueStatusBadge status={issue.status}/>
                                </Table.Cell>
                                <Table.Cell className="hidden md:table-cell text-gray-500">
                                    {issue.createdAt.toDateString()}
                                </Table.Cell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table.Root>
        </div>
        </>
    )
}
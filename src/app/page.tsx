
"use client"
import Pagination from "./component/Pagination";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "./component/IssueStatusBadge";
import { Status } from "@/generated/prisma/client";
import { prisma } from "../../prisma/client";
import { AvatarIcon } from "@radix-ui/react-icons";

export default async function Home () {
  const issues =  await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include:{
      assignedToUser:true
    }
  });
  return (
    <>
    <div>home page </div>
    <Pagination itemCount={100} pageSize={10} currentPage={1}/> 
    <Card>
      <Heading size={"2"}>Latest Issues</Heading>
    <Table.Root>
      <Table.Body>
          {issues.map(issue=>(
        <Table.Row>

          <Table.Cell key={issue.id}>
            <Flex justify={"between"}>
         <Flex direction="column" align={"start"}>
          <Link href={`/issues/${1}`}>{issue.title}</Link>
          <IssueStatusBadge status={issue.status}></IssueStatusBadge>
         </Flex>
         {issue.assignedToUser &&(
          <Avatar src={issue.assignedToUser.image!} fallback="?"></Avatar>
          )} 
         </Flex>
         </Table.Cell>
        </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
    </Card>
    </>

  );
}

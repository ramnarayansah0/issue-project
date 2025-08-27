import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";
import { prisma } from "../../../../../prisma/client";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const id = parseInt(params.id, 10);
  if (Number.isNaN(id)) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id }
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
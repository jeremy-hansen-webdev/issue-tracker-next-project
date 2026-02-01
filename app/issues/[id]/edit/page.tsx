import { prisma } from "@/lib/prisma/prisma";
import IssueForm from "../../components/IssueForm";

interface Params {
  params: Promise<{ id: string }>;
}

const EditIssue = async ({ params }: Params) => {
  const { id } = await params;
  console.log("id", id);
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
    select: { id: true, title: true, description: true },
  });
  return <>{issue && <IssueForm issue={issue} />}</>;
};

export default EditIssue;

import authOptions from "@/app/api/auth/authOptions";
import { prisma } from "@/lib/prisma/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import IssueDeleteButton from "../components/IssueDeleteButton";
import { IssuesEditButton } from "../components/IssueEditButton";
import { issueBadge } from "../issuesBadgeType";
import AssignUsersIssue from "../components/AssignUsersIssue";

interface Params {
  params: Promise<{ id: string }>;
}

const IssuesDetailPage = async ({ params }: Params) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-e w-150 space-y-2" key={issue?.id}>
        <div className="flex mr-4 mb-5">
          <h1 className="text-pr-2 self-end">{issue?.title}</h1>

          <h3
            className="self-end ml-auto"
            style={{ color: issueBadge[issue?.status || "Open"] }}
          >
            {issue?.status}
          </h3>
          <div className="ml-2">
            <AssignUsersIssue issueId={issue?.id} />
          </div>
        </div>
        <article className="prose border p-3">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {issue.description}
          </ReactMarkdown>
        </article>
        <div className="flex justify-between items-start">
          {session && (
            <div className="flex space-x-2">
              <IssueDeleteButton id={issue?.id} text={"DELETE"} />
              <IssuesEditButton id={issue?.id} text={"EDIT"} />
            </div>
          )}
          <p className="mr-5">
            {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
              new Date(issue.createdAt.toLocaleString()),
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IssuesDetailPage;

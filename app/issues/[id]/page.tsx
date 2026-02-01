// page.tsx

import { prisma } from "@/lib/prisma/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { issueBadge } from "../issuesBadgeType";
import { FiEdit2 } from "react-icons/fi";
import Link from "next/link";

interface Params {
  params: Promise<{ id: string }>;
}

const IssuesDetailPage = async ({ params }: Params) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <div className="flex flex-col max-w-150 space-y-2" key={issue?.id}>
      <div className="flex mr-4 mb-5">
        <h1 className="text-pr-2">{issue?.title}</h1>
        <h3
          className="self-end ml-auto"
          style={{ color: issueBadge[issue?.status || "Open"] }}
        >
          {issue?.status}
        </h3>
      </div>
      <article className="prose border p-3">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {issue.description}
        </ReactMarkdown>
      </article>
      <div className="flex justify-between items-start">
        <Link href={`${issue?.id}/edit`}>
          <button className="btn-pr-1 space-x-2">
            {" "}
            <span>Edit</span>
            <FiEdit2 />
          </button>
        </Link>
        <p className="mr-5">
          {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
            new Date(issue.createdAt.toLocaleString()),
          )}
        </p>
      </div>
    </div>
  );
};

export default IssuesDetailPage;

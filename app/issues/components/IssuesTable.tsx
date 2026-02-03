import { IssuesTableHeader } from "@/app/issues/components/IssuesTableHeader";
import { issueBadge } from "@/app/issues/issuesBadgeType";
import { prisma } from "@/lib/prisma/prisma";
import { MdEdit } from "react-icons/md";

import Link from "next/link";
import IssueDeleteButton from "./IssueDeleteButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";

const IssuesTable = async () => {
  const session = await getServerSession(authOptions);
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <div className="mt-8 flow-root overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <table className="w-full text-left">
            <IssuesTableHeader />
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td className="link">
                    <>
                      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                      <div className="absolute right-full bottom-0 h-px w-screen bg-gray-100" />
                      <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                    </>
                  </td>
                  <td
                    style={{ color: issueBadge[issue.status] }}
                    className="px-3 py-4 text-sm"
                  >
                    {issue.status}
                  </td>
                  <td
                    aria-label="hr-description"
                    className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell"
                  >
                    {issue.description}
                  </td>
                  <td
                    aria-label="hr-date-created"
                    className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell"
                  >
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                    }).format(new Date(issue.createdAt.toLocaleString()))}
                  </td>
                  {session && (
                    <td>
                      <div className="flex space-x-1">
                        <Link href={`issues/${issue.id}/edit`}>
                          <button className="btn-pr-3">
                            <MdEdit />
                          </button>
                        </Link>
                        <IssueDeleteButton id={issue?.id} text={""} />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IssuesTable;

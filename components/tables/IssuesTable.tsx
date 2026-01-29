import { prisma } from "@/lib/prisma/prisma";
import { Status } from "@prisma/client";

const IssuesTable = async () => {
  const issues = await prisma.issue.findMany();
  const titles = ["Title", "Status", "Description", "Created"];
  const issueBadge: Record<Status, string> = {
    OPEN: "red",
    IN_PROGRESS: "black",
    CLOSED: "green",
  };
  return (
    <div>
      <div className="mt-8 flow-root overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <table className="w-full text-left">
            <thead className="bg-white">
              <tr>
                {titles.map((title) => (
                  <th
                    key={title}
                    scope="col"
                    className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    {title}
                    <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                    <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td className="link">
                    <>
                      {issue.title}
                      <div className="absolute right-full bottom-0 h-px w-screen bg-gray-100" />
                      <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                    </>
                  </td>
                  <td
                    style={{ color: issueBadge[issue.status] }}
                    className="hidden px-3 py-4 text-sm sm:table-cell"
                  >
                    {issue.status}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                    {issue.description}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                    }).format(new Date(issue.createdAt.toLocaleString()))}
                  </td>
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

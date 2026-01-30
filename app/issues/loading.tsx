
import Skeleton from "@/lib";
import IssueActions from "./IssueActions";

const IssuesLoadingPage = () => {
  const titles = [1, 2, 3, 4];
  const issues = [1, 2, 3, 4, 5, 6];
  return (
    <div className="pt-4">
      <IssueActions />
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
                    <Skeleton />
                    <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                    <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue}>
                  <td className="link">
                    <>
                      <Skeleton />
                      <div className="absolute right-full bottom-0 h-px w-screen bg-gray-100" />
                      <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                    </>
                  </td>
                  <td className="hidden px-3 py-4 text-sm sm:table-cell">
                    <Skeleton />
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                    <Skeleton />
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    <Skeleton />
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

export default IssuesLoadingPage;

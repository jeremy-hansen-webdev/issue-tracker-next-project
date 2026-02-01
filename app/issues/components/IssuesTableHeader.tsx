export function IssuesTableHeader() {
  const titles = [
    { name: "Title", display: "" },
    { name: "Status", display: "" },
    { name: "Description", display: "hidden" },
    { name: "Created", display: "hidden" },
  ];
  const mainTitleDisplay =
    "relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 md:table-cell";
  return (
    <thead className="bg-white">
      <tr>
        {titles.map((title) => (
          <th
            key={title.name}
            scope="col"
            className={title.display + " " + mainTitleDisplay}
          >
            {title.name}
            <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
            <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
          </th>
        ))}
      </tr>
    </thead>
  );
}

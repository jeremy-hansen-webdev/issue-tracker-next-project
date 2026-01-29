import IssuesTable from "@/components/tables/IssuesTable";
import Link from "next/link";

const Issues = () => {
  return (
    <div className="pt-4">
      <Link className="btn-pr-1" href={"/issues/new"}>
        New Issue
      </Link>
      <IssuesTable />
    </div>
  );
};

export default Issues;

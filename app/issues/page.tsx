import IssuesTable from "@/app/issues/components/IssuesTable";
import IssueActions from "./IssueActions";

const Issues = () => {
  return (
    <div className="pt-4">
      <IssueActions />
      <IssuesTable />
    </div>
  );
};

export default Issues;

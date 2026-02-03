import IssuesTable from "@/app/issues/components/IssuesTable";
import IssueActions from "./IssueActions";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/authOptions";

const Issues = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="pt-4">
      {session && <IssueActions />}
      <IssuesTable />
    </div>
  );
};
export const dynamic = "force-dynamic";
export default Issues;

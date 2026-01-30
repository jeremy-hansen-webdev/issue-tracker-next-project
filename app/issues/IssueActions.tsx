import Link from "next/link";

const IssueActions = () => {
  return (
    <Link className="btn-pr-1" href={"/issues/new"}>
      New Issue
    </Link>
  );
};

export default IssueActions;

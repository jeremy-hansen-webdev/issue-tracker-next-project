import Skeleton from "@/lib"

const IssuesNewLoadingPage = () => {
  return (
    <div>
      <h1 className="text-pr-2 mb-4">Issues Page</h1>
      <form className="flex flex-col max-w-150 space-y-4">
        <label className="text-label" htmlFor="title">
          Title
        </label>
        <Skeleton height={40} />
        <label className="text-label" htmlFor="description">
          Description
        </label>

        <Skeleton height={200} />

        <div className="flex items-center space-x-2">
          <button type="submit" disabled={true} className="btn-pr-1">
            Create Issue
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssuesNewLoadingPage;

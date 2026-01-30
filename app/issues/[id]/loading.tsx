import Skeleton from "@/lib";

const IssuesDetailPageLoading = () => {
  return (
    <div className="flex flex-col max-w-150 space-y-2">
      <Skeleton />
      <article className="prose border p-3 min-h-30">
        <Skeleton count={5} />
      </article>
      <div className="w-20 ml-auto">
        <Skeleton />
      </div>
    </div>
  );
};

export default IssuesDetailPageLoading;

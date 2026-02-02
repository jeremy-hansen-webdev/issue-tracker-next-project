"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
interface Props {
  id: number;
  onCancel: () => void;
}

const IssueDelete = ({ id, onCancel }: Props) => {
  const router = useRouter();
  console.log("issue id", id);

  async function deleteIssue() {
    await axios.delete(`/api/issues/${id}`);
    router.push("/issues");
  }

  return (
    <div className="fixed mt-100 flex flex-col items-center justify-end mb-40 w-200 h-50 bg-white border rounded-2xl">
      <h1 className="mb-10 text-pr-2">
        Are you sure you want to Delete Issue?
      </h1>
      <div className="mb-10 space-x-30">
        <button
          onClick={onCancel}
          className="btn-pr-1 bg-gray-400 border hover:bg-red-500"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            await deleteIssue();
          }}
          className="btn-pr-1 bg-red-700 border hover:bg-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default IssueDelete;

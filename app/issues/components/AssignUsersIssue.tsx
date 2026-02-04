"use client";
import type { User } from "@/app/api/users/route";
import Skeleton from "@/lib";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssignUsersIssue = ({ issueId }: { issueId: number }) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => (await axios.get("/api/users")).data,
    staleTime: 1000 * 60,
    retry: 3,
  });

  if (error) return;

  if (isLoading) return <Skeleton width={90} height={60} />;

  const handleSubmit = async (userId: string | null) => {
    console.log("");
    await axios.patch(`/api/issues/${issueId}/assign`, {
      assignedToId: userId || null,
    });
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-label" htmlFor="AssignIssue">
        Assign Issue
      </label>

      <select
        onChange={async (e) => {
          const value = e.target.value;
          await handleSubmit(value === "" ? null : value);
        }}
        className="border"
      >
        <option value="">Select Option</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AssignUsersIssue;

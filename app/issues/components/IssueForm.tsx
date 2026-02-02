"use client";
import { createIssueInput, createIssueSchema } from "@/lib/validation/issues";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import MarkdownEditor from "./MarkdownEditor";

type IssueFromProps = {
  issue?: Pick<Issue, "id" | "title" | "description">;
};

const IssueForm = ({ issue }: IssueFromProps) => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<createIssueInput>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: issue?.title ?? "",
      description: issue?.description ?? "",
    },
  });
  const url = issue ? `/api/issues/${issue.id}` : "/api/issues";
  const method = issue ? "PATCH" : "POST";

  const onSubmit = async (data: createIssueInput) => {
    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return;
    }

    router.push("/issues");
    // router.refresh();
    
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-150 space-y-4"
    >
      <label className="text-label" htmlFor="title">
        Title
      </label>
      <input autoFocus id="title" {...register("title")} className="input" />
      {errors.title && (
        <p role="alert" className="text-red-700">
          {errors.title.message}
        </p>
      )}

      <label className="text-label" htmlFor="description">
        Description
      </label>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <MarkdownEditor value={field.value ?? ""} onChange={field.onChange} />
        )}
      />
      {errors.description && (
        <p role="alert" className="text-red-700">
          {errors.description.message}
        </p>
      )}
      <div className="flex items-center space-x-2">
        <button 
          type="submit" 
          aria-label="issue-submit"
          disabled={isSubmitting} className="btn-pr-1">
          {issue ? "Edit Issue" : "Create Issue"}
        </button>
        {isSubmitting && (
          <div
            role="status"
            aria-label="Loading"
            className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
          ></div>
        )}
      </div>
    </form>
  );
};

export default IssueForm;

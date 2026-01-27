"use client";
import { useRouter } from "next/navigation";
import { createIssueInput, createIssueSchema } from "@/lib/validation/issues";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import MarkdownEditor from "../editors/MarkdownEditor";

const IssueForm = () => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<createIssueInput>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = async (data: createIssueInput) => {
    const res = await fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res) {
      return;
    }

    router.push("/");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-150 space-y-4"
    >
      <label className="text-label" htmlFor="title">
        Title
      </label>
      <input {...register("title")} className="input" />
      {errors.title && <p>{errors.title.message}</p>}

      <label className="text-label" htmlFor="Description">
        Description
      </label>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <MarkdownEditor value={field.value ?? ""} onChange={field.onChange} />
        )}
      />
      {errors.description && <p>{errors.description.message}</p>}
      <div className="flex items-center space-x-2">
        <button type="button" disabled={isSubmitting} className="btn-pr-1">
          Create Issue
        </button>
        {isSubmitting && (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
        )}
      </div>
    </form>
  );
};

export default IssueForm;

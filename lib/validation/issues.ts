import z from "zod";

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(255, "Title must be less then 255 characters"),
  description: z
    .string()
    .min(3, "Description must be as least 3 characters long")
    .max(5000, "Description must not exceed 5000 characters"),
});

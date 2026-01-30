import { Status } from "@prisma/client";

export const issueBadge: Record<Status, string> = {
  OPEN: "red",
  IN_PROGRESS: "black",
  CLOSED: "green",
};

import { faker } from "@faker-js/faker";

export type IssueDTO = {
  id: number;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  description: string;
  createdAt: string; // API returns ISO string
};

export function makeIssue(overrides: Partial<IssueDTO> = {}): IssueDTO {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    title: faker.lorem.words({ min: 2, max: 6 }),
    status: faker.helpers.arrayElement(["OPEN", "IN_PROGRESS", "CLOSED"]),
    description: faker.lorem.sentence(),
    createdAt: faker.date.recent().toISOString(),
    ...overrides,
  };
}

// ✅ count + optional overrides applied to every item
export function makeIssues(
  count = 5,
  overrides: Partial<IssueDTO> = {},
): IssueDTO[] {
  return Array.from({ length: count }, () => makeIssue(overrides));
}

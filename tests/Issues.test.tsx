/* eslint-disable @typescript-eslint/no-explicit-any */
import { IssuesTableHeader } from "@/app/issues/components/IssuesTableHeader";
import IssuesTable from "@/app/issues/components/IssuesTable";
import { prisma } from "@/lib/prisma/prisma";
import { render, screen, within } from "@testing-library/react";
import { makeIssues } from "./factories/issueFactory";

// Mock next/link so RTL can render it without Next runtime
vi.mock("next/link", () => ({
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

// Mock prisma module used by your component
vi.mock("@/lib/prisma/prisma", () => ({
  prisma: {
    issue: {
      findMany: vi.fn(),
    },
  },
}));

describe("IssuesList", () => {
  it("renders all table headers", () => {
    const titles = [/title/i, /status/i, /description/i, /created/i];
    render(
      <table>
        <IssuesTableHeader />
      </table>,
    );
    for (const title of titles) {
      expect(
        screen.getByRole("columnheader", { name: title }),
      ).toBeInTheDocument();
    }
  });
  it("renders only title and status on screen smaller then md", () => {
    render(
      <table>
        <IssuesTableHeader />
      </table>,
    );
    expect(screen.getByText(/description/i)).toHaveClass("hidden");
    expect(screen.getByText(/created/i)).toHaveClass("hidden");
  });

  it("renders data in the table", async () => {
    const issues = makeIssues(1).map((i) => ({
      ...i,
      createdAt: new Date(i.createdAt ?? new Date()), // ensure Date type
    }));

    (prisma.issue.findMany as any).mockResolvedValue(issues);

    // IMPORTANT: IssuesTable is async → await it, then render the returned JSX
    const ui = await IssuesTable();
    render(ui);

    // assert titles appear
    expect(screen.getByText(issues[0].title)).toBeInTheDocument();
    expect(screen.getByText(issues[0].description)).toBeInTheDocument();
    const expectedDate1 = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(new Date(issues[0].createdAt));

    expect(screen.getAllByText(expectedDate1)).toHaveLength(1);

    // assert statuses appear
    expect(
      screen.getAllByText(/open|in_progress|closed/i).length,
    ).toBeGreaterThan(0);

    // assert links are correct
    expect(screen.getByRole("link", { name: issues[0].title })).toHaveAttribute(
      "href",
      `/issues/${issues[0].id}`,
    );
  });
  it("renders only title and status on screen smaller then md", async () => {
    const issues = makeIssues(1).map((i) => ({
      ...i,
      createdAt: new Date(2026, 0, 30),
    }));

    (prisma.issue.findMany as any).mockResolvedValue(issues);

    render(await IssuesTable());

    // Find the row for our issue
    const row = screen
      .getByRole("link", { name: issues[0].title })
      .closest("tr")!;
    const descriptionCell = within(row).getByLabelText("hr-description");
    const createdCell = within(row).getByLabelText("hr-date-created");
    expect(descriptionCell).toHaveClass("hidden");
    expect(descriptionCell).toHaveClass("md:table-cell");
    expect(createdCell).toHaveClass("hidden");
    expect(createdCell).toHaveClass("md:table-cell");
  });
});

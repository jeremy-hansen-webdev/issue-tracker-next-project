import Issues from "@/app/issues/page";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, http, HttpResponse } from "msw";
import { server } from "./mocks/server";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

// Optional but strongly recommended: mock MarkdownEditor
vi.mock("@/components/editors/MarkdownEditor", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ value, onChange }: any) => (
    <textarea
      aria-label="Description"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

function setup() {
  const user = userEvent.setup();
  render(<Issues />);

  const title = () => screen.getByLabelText(/title/i);
  const description = () => screen.getByLabelText(/description/i);

  const submit = () => screen.getByRole("button", { name: /create issue/i });

  return { user, title, description, submit };
}

function mockSubmit() {
  server.use(
    http.post("/api/issues", async () => {
      await delay(300);
      return HttpResponse.json({ id: 1 }, { status: 201 });
    }),
  );
}

async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  values: { title?: string; description?: string },
) {
  if (values.title !== undefined) {
    await user.clear(screen.getByLabelText(/title/i));
    await user.type(screen.getByLabelText(/title/i), values.title);
  }
  if (values.description !== undefined) {
    await user.clear(screen.getByLabelText(/description/i));
    await user.type(screen.getByLabelText(/description/i), values.description);
  }
}

describe("Issue Page", () => {
  it("should render form fields and button", () => {
    const labels = [/title/i, /description/i];
    render(<Issues />);
    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should show heading and labels", () => {
    render(<Issues />);
    [/issues/i, /title/i, /description/i].forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("should autoFocus on title", () => {
    render(<Issues />);
    expect(screen.getByLabelText(/title/i)).toHaveFocus();
  });

  it("should display two errors if nothing is provided in form", async () => {
    const { user, submit } = setup();
    await user.click(submit());
    expect(screen.getAllByRole("alert").length).toEqual(2);
  });

  it.each([
    {
      name: "title too short",
      values: { title: "aa", description: "aaa" },
      expectedError: /3/,
    },
    {
      name: "description too short",
      values: { title: "aaa", description: "aa" },
      expectedError: /3/,
    },
  ])("should show error when $name", async ({ values, expectedError }) => {
    const { user, submit } = setup();

    await fillForm(user, values);
    await user.click(submit());

    expect(await screen.findByText(expectedError)).toBeInTheDocument();
  });

  it("should not through error if text boxes are field out with appropriate characters", async () => {
    const { user, submit } = setup();
    await user.click(submit());
    await fillForm(user, { title: "aaa", description: "aaa" });
    await user.click(screen.getByRole("button"));
    expect(await screen.queryByText(/least 3/i)).not.toBeInTheDocument();
  });

  it('submit the form and redirects to home "/"', async () => {
    mockSubmit();

    const { user, submit } = setup();

    await fillForm(user, { title: "aaa", description: "aaa" });

    await user.click(submit());

    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("should show loading when submitted", async () => {
    mockSubmit();

    const { user, submit } = setup();

    await fillForm(user, { title: "aaa", description: "aaa" });

    await user.click(submit());

    expect(
      await screen.findByRole("status", { name: /loading/i }),
    ).toBeInTheDocument();

    expect(submit()).toBeDisabled();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("status", { name: /loading/i }),
    );
  });
  it("should re-enable the submit button upon submission", () => {
    mockSubmit();
  });
});

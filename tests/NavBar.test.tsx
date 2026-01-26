// import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import NavBar from "@/app/NavBar";
import { usePathname } from "next/navigation";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("NavBar", () => {
  it("should route to appropriate link when clicked", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    render(<NavBar />);

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/",
    );

    expect(screen.getByRole("link", { name: /dashboard/i })).toHaveAttribute(
      "href",
      "/",
    );

    expect(screen.getByRole("link", { name: /issues/i })).toHaveAttribute(
      "href",
      "/issues",
    );
  });
});

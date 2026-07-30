import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NavLink } from "./nav-link";

describe("NavLink (smoke)", () => {
  it("marks active page", () => {
    render(
      <NavLink href="/docs" active>
        Docs
      </NavLink>,
    );
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveAttribute("data-active", "true");
  });
});

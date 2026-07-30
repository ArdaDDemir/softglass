import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumb } from "./breadcrumb";

describe("Breadcrumb (smoke)", () => {
  it("renders links for ancestors and current page for last", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs" },
          { label: "Accordion" },
        ]}
      />,
    );

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/docs");

    const current = screen.getByText("Accordion");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.tagName.toLowerCase()).toBe("span");
  });
});

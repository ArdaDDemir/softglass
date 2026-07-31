import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageHeader } from "./page-header";

describe("PageHeader (smoke)", () => {
  it("renders title and actions", () => {
    render(
      <PageHeader
        title="Projects"
        description="Your workspace"
        actions={<button type="button">New</button>}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Projects" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Your workspace")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New" })).toBeInTheDocument();
  });

  it("renders breadcrumbs when provided", () => {
    render(
      <PageHeader
        title="Accordion"
        breadcrumbs={[
          { label: "Home", href: "#" },
          { label: "Docs", href: "#docs" },
          { label: "Accordion" },
        ]}
      />,
    );

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
  });
});

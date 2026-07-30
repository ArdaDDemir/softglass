import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CircularProgress } from "./circular-progress";

describe("CircularProgress (smoke)", () => {
  it("exposes determinate ARIA value", () => {
    render(<CircularProgress value={40} label="Upload" />);
    const el = screen.getByRole("progressbar", { name: "Upload" });
    expect(el).toHaveAttribute("aria-valuenow", "40");
    expect(el).toHaveAttribute("data-state", "determinate");
  });

  it("omits valuemin/now when indeterminate", () => {
    render(<CircularProgress label="Loading" />);
    const el = screen.getByRole("progressbar", { name: "Loading" });
    expect(el).toHaveAttribute("data-state", "indeterminate");
    expect(el).not.toHaveAttribute("aria-valuenow");
  });
});

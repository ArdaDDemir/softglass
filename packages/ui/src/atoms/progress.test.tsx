import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "./progress";

describe("Progress (smoke)", () => {
  it("exposes determinate value via progressbar ARIA", () => {
    render(<Progress value={40} max={100} label="Upload" />);

    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("data-state", "determinate");
  });

  it("clamps value above max", () => {
    render(<Progress value={150} max={100} label="Clamp high" />);

    expect(screen.getByRole("progressbar", { name: "Clamp high" })).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });

  it("clamps value below zero", () => {
    render(<Progress value={-10} max={100} label="Clamp low" />);

    expect(screen.getByRole("progressbar", { name: "Clamp low" })).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
  });

  it("omits valuemin/now/max when indeterminate", () => {
    render(<Progress label="Loading" />);

    const bar = screen.getByRole("progressbar", { name: "Loading" });
    expect(bar).toHaveAttribute("data-state", "indeterminate");
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(bar).not.toHaveAttribute("aria-valuemin");
    expect(bar).not.toHaveAttribute("aria-valuemax");
  });
});

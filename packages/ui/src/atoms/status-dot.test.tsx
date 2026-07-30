import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusDot } from "./status-dot";

describe("StatusDot (smoke)", () => {
  it("announces semantic status by default", () => {
    render(<StatusDot status="busy" />);

    const el = screen.getByRole("status", { name: "Busy" });
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("data-status", "busy");
  });

  it("accepts custom label and color", () => {
    render(<StatusDot status="offline" label="Agent idle" color="#6366f1" />);

    const el = screen.getByRole("status", { name: "Agent idle" });
    expect(el).toBeInTheDocument();
    expect(el.style.getPropertyValue("--sg-status-dot-color")).toBe("#6366f1");
  });
});

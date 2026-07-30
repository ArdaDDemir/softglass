import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Meter } from "./meter";

describe("Meter (smoke)", () => {
  it("exposes meter ARIA values", () => {
    render(<Meter value={40} max={100} label="Storage" />);
    const el = screen.getByRole("meter", { name: "Storage" });
    expect(el).toHaveAttribute("aria-valuenow", "40");
    expect(el).toHaveAttribute("aria-valuemax", "100");
  });
});

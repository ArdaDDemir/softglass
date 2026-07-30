import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stat } from "./stat";

describe("Stat (smoke)", () => {
  it("renders label and value text", () => {
    render(
      <Stat label="Revenue" value="$12.4k" hint="Last 30 days" trend="up" trendLabel="+8%" />,
    );

    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$12.4k")).toBeInTheDocument();
    expect(screen.getByText("Last 30 days")).toBeInTheDocument();
    expect(screen.getByText("+8%")).toBeInTheDocument();
  });
});

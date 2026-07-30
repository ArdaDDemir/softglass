import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "./stepper";

const STEPS = [
  { label: "Details" },
  { label: "Team" },
  { label: "Review" },
];

describe("Stepper (smoke)", () => {
  it("marks the active step with aria-current", () => {
    render(<Stepper steps={STEPS} activeStep={1} />);

    expect(screen.getByRole("button", { name: /Team/i })).toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(screen.getByRole("button", { name: /Details/i })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("jumps when interactive", async () => {
    const user = userEvent.setup();
    const onActiveStepChange = vi.fn();

    render(
      <Stepper
        steps={STEPS}
        activeStep={2}
        interactive
        onActiveStepChange={onActiveStepChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Details/i }));
    expect(onActiveStepChange).toHaveBeenCalledWith(0);
  });
});

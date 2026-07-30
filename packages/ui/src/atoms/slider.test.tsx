import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./slider";

describe("Slider (smoke)", () => {
  it("renders with label and exposes range role via input", () => {
    render(<Slider label="Volume" defaultValue={30} min={0} max={100} />);

    const slider = screen.getByLabelText("Volume");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("type", "range");
    expect(slider).toHaveValue("30");
  });

  it("calls onValueChange when value changes", () => {
    const onValueChange = vi.fn();

    render(
      <Slider
        label="Opacity"
        value={50}
        min={0}
        max={100}
        step={10}
        onValueChange={onValueChange}
      />,
    );

    const slider = screen.getByLabelText("Opacity");
    // jsdom does not fully implement range keyboard; fire change directly.
    fireEvent.change(slider, { target: { value: "60" } });

    expect(onValueChange).toHaveBeenCalledWith(60);
  });
});

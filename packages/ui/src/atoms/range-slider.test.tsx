import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RangeSlider } from "./range-slider";

describe("RangeSlider (smoke)", () => {
  it("updates high thumb", () => {
    const onValueChange = vi.fn();
    render(
      <RangeSlider
        label="Price"
        value={[20, 80]}
        onValueChange={onValueChange}
      />,
    );

    const max = screen.getByLabelText("Price maximum");
    fireEvent.change(max, { target: { value: "90" } });
    expect(onValueChange).toHaveBeenCalledWith([20, 90]);
  });
});

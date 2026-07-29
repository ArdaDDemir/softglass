import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Combobox } from "./combobox";

const OPTIONS = [
  { value: "ist", label: "Istanbul" },
  { value: "ank", label: "Ankara" },
  { value: "izm", label: "Izmir" },
];

describe("Combobox (smoke)", () => {
  it("filters options as the user types", async () => {
    const user = userEvent.setup();

    render(
      <Combobox
        label="City"
        options={OPTIONS}
        defaultValue=""
        placeholder="Search cities…"
      />,
    );

    const input = screen.getByRole("combobox");
    await user.click(input);
    await user.clear(input);
    await user.type(input, "ank");

    expect(screen.getByRole("option", { name: /Ankara/i })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Istanbul/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Izmir/i })).not.toBeInTheDocument();
  });
});

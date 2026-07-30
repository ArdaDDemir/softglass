import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Combobox } from "./combobox";

describe("Combobox async (smoke)", () => {
  it("calls onSearch when the query changes", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(
      <Combobox
        label="City"
        options={[]}
        onSearch={onSearch}
        searchDebounceMs={0}
        motion="none"
      />,
    );

    const input = screen.getByRole("combobox");
    await user.click(input);
    await user.type(input, "ab");

    expect(onSearch).toHaveBeenCalled();
    expect(onSearch.mock.calls.some((c) => String(c[0]).includes("a"))).toBe(
      true,
    );
  });

  it("renders loading empty state", async () => {
    const user = userEvent.setup();

    render(
      <Combobox
        label="City"
        options={[]}
        loading
        loadingMessage="Searching…"
        motion="none"
      />,
    );

    await user.click(screen.getByRole("combobox"));
    expect(await screen.findByText("Searching…")).toBeInTheDocument();
  });
});

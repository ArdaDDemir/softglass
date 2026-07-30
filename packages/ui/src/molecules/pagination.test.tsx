import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./pagination";

describe("Pagination (smoke)", () => {
  it("moves next/prev and disables ends", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    const { rerender } = render(
      <Pagination page={1} pageCount={5} onPageChange={onPageChange} />,
    );

    const prev = screen.getByRole("button", { name: "Previous" });
    const next = screen.getByRole("button", { name: "Next" });

    expect(prev).toBeDisabled();
    expect(next).not.toBeDisabled();

    await user.click(next);
    expect(onPageChange).toHaveBeenCalledWith(2);

    rerender(
      <Pagination page={5} pageCount={5} onPageChange={onPageChange} />,
    );
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous" })).not.toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Previous" }));
    expect(onPageChange).toHaveBeenLastCalledWith(4);
  });

  it("selects a page number", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination page={1} pageCount={4} onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: "Page 3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});

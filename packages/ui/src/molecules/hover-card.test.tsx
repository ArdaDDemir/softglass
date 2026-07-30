import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HoverCard } from "./hover-card";

describe("HoverCard (smoke)", () => {
  it("opens after openDelay on hover", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime.bind(vi),
    });

    render(
      <HoverCard
        trigger={<a href="#profile">Ada</a>}
        openDelay={100}
        closeDelay={50}
        motion="none"
      >
        Preview card
      </HoverCard>,
    );

    expect(screen.queryByText("Preview card")).not.toBeInTheDocument();

    await user.hover(screen.getByRole("link", { name: "Ada" }));
    await act(async () => {
      vi.advanceTimersByTime(120);
    });

    expect(await screen.findByText("Preview card")).toBeInTheDocument();

    vi.useRealTimers();
  });
});

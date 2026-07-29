import { act, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { usePresence } from "./presence";

function PresenceProbe({
  open,
  durationMs,
}: {
  open: boolean;
  durationMs?: number;
}) {
  const { mounted, exiting, state } = usePresence(open, { durationMs });
  if (!mounted) return null;
  return (
    <div
      data-testid="presence"
      data-exiting={exiting ? "true" : "false"}
      data-state={state}
    >
      panel
    </div>
  );
}

function TogglePresence({ durationMs = 50 }: { durationMs?: number }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button type="button" onClick={() => setOpen(false)}>
        close
      </button>
      <PresenceProbe open={open} durationMs={durationMs} />
    </div>
  );
}

describe("usePresence (smoke)", () => {
  it("unmounts immediately when durationMs is 0 (motion none)", async () => {
    render(<TogglePresence durationMs={0} />);

    expect(screen.getByTestId("presence")).toBeInTheDocument();

    await act(async () => {
      screen.getByRole("button", { name: "close" }).click();
    });

    expect(screen.queryByTestId("presence")).not.toBeInTheDocument();
  });

  it("stays mounted briefly while exiting, then unmounts", () => {
    vi.useFakeTimers();
    render(<TogglePresence durationMs={50} />);

    expect(screen.getByTestId("presence")).toHaveAttribute("data-state", "open");

    act(() => {
      screen.getByRole("button", { name: "close" }).click();
    });

    // Still mounted for exit animation
    const panel = screen.getByTestId("presence");
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute("data-state", "closed");
    expect(panel).toHaveAttribute("data-exiting", "true");

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(screen.queryByTestId("presence")).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { CopyButton } from "./copy-button";

describe("CopyButton (smoke)", () => {
  const originalClipboard = navigator.clipboard;
  const originalExec = document.execCommand;

  beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
    // jsdom may not ship execCommand — provide a no-op success
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document as any).execCommand = vi.fn(() => true);
  });

  afterEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: originalClipboard,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document as any).execCommand = originalExec;
  });

  it("shows copied feedback after click", async () => {
    const user = userEvent.setup();
    const onCopied = vi.fn();

    render(<CopyButton value="hello" onCopied={onCopied} />);

    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(onCopied).toHaveBeenCalled();
    expect(await screen.findByText("Copied")).toBeInTheDocument();
  });
});

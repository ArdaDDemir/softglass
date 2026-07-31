import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  AppShell,
  AppShellCollapseButton,
  AppShellMenuButton,
  ShellNav,
  ShellNavItem,
} from "./app-shell";

function mockMatchMedia(desktop: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: desktop && query.includes("min-width: 900px"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

describe("AppShell (smoke)", () => {
  beforeEach(() => {
    mockMatchMedia(true);
  });

  it("toggles data-collapsed via collapse button on desktop", async () => {
    const user = userEvent.setup();
    const onCollapsedChange = vi.fn();

    const { container } = render(
      <AppShell
        defaultCollapsed={false}
        onCollapsedChange={onCollapsedChange}
        header={
          <>
            <AppShellMenuButton />
            <span>Brand</span>
          </>
        }
        sidebar={
          <>
            <AppShellCollapseButton />
            <ShellNav>
              <ShellNavItem href="#home" active>
                Home
              </ShellNavItem>
            </ShellNav>
          </>
        }
      >
        Main
      </AppShell>,
    );

    const collapseBtn = await screen.findByRole("button", {
      name: "Collapse sidebar",
    });
    await user.click(collapseBtn);

    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    await waitFor(() => {
      expect(container.querySelector(".sg-shell")).toHaveAttribute(
        "data-collapsed",
        "true",
      );
    });
  });

  it("opens mobile Sheet from menu button", async () => {
    mockMatchMedia(false);
    const user = userEvent.setup();
    const onMobileNavOpenChange = vi.fn();

    render(
      <AppShell
        mobileNavTitle="Menu"
        onMobileNavOpenChange={onMobileNavOpenChange}
        header={
          <>
            <AppShellMenuButton />
            <span>Brand</span>
          </>
        }
        sidebar={
          <ShellNav>
            <ShellNavItem href="#a">Alpha</ShellNavItem>
          </ShellNav>
        }
      >
        Main
      </AppShell>,
    );

    const menuBtn = await screen.findByRole("button", {
      name: "Open navigation",
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(menuBtn);
    expect(onMobileNavOpenChange).toHaveBeenCalledWith(true);
  });
});

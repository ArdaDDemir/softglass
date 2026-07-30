import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EmptyState } from "./empty-state";

describe("EmptyState (smoke)", () => {
  it("renders title, description, and action click", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();

    render(
      <EmptyState
        title="Henüz proje yok"
        description="İlk projeni oluştur."
        actions={
          <button type="button" onClick={onCreate}>
            Create project
          </button>
        }
      />,
    );

    expect(screen.getByText("Henüz proje yok")).toBeInTheDocument();
    expect(screen.getByText("İlk projeni oluştur.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Create project" }));
    expect(onCreate).toHaveBeenCalledTimes(1);
  });
});

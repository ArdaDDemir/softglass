import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ClientOnly } from "./client-only";

describe("ClientOnly (smoke)", () => {
  it("shows children after mount", async () => {
    render(
      <ClientOnly fallback={<span>ssr</span>}>
        <span>client</span>
      </ClientOnly>,
    );

    await waitFor(() => {
      expect(screen.getByText("client")).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SettingsSection } from "./settings-section";

describe("SettingsSection (smoke)", () => {
  it("renders title, description, actions, and body", () => {
    render(
      <SettingsSection
        title="Profile"
        description="Public identity"
        actions={<button type="button">Save</button>}
      >
        <input aria-label="Display name" />
      </SettingsSection>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Profile" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Public identity")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByLabelText("Display name")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FileField } from "./file-field";

describe("FileField (smoke)", () => {
  it("lists selected file name after pick", async () => {
    const user = userEvent.setup();
    const onFilesChange = vi.fn();
    const file = new File(["hello"], "notes.txt", { type: "text/plain" });

    render(
      <FileField label="Attachment" onFilesChange={onFilesChange} />,
    );

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input).toBeTruthy();

    await user.upload(input, file);

    expect(onFilesChange).toHaveBeenCalled();
    const files = onFilesChange.mock.calls.at(-1)?.[0] as File[];
    expect(files[0]?.name).toBe("notes.txt");
    // Summary + list both show the name.
    expect(screen.getAllByText("notes.txt").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("button", { name: "Remove notes.txt" })).toBeInTheDocument();
  });

  it("removes a file from the list", async () => {
    const user = userEvent.setup();
    const file = new File(["x"], "a.pdf", { type: "application/pdf" });
    const onFilesChange = vi.fn();

    const { rerender } = render(
      <FileField
        label="Docs"
        files={[file]}
        onFilesChange={onFilesChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Remove a.pdf" }));
    expect(onFilesChange).toHaveBeenCalledWith([]);

    rerender(
      <FileField label="Docs" files={[]} onFilesChange={onFilesChange} />,
    );
    expect(screen.getByText("No file selected")).toBeInTheDocument();
  });
});

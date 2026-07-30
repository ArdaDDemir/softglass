import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ListItem } from "../atoms/list-item";
import { List } from "./list";

describe("List (smoke)", () => {
  it("hosts ListItems and selection click", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <List>
        <ListItem title="Alpha" selected onClick={() => onSelect("a")} />
        <ListItem title="Beta" onClick={() => onSelect("b")} />
        <ListItem title="Gamma" onClick={() => onSelect("c")} />
      </List>,
    );

    const alpha = screen.getByRole("button", { name: /Alpha/i });
    expect(alpha).toHaveAttribute("data-selected", "true");

    await user.click(screen.getByRole("button", { name: /Beta/i }));
    expect(onSelect).toHaveBeenCalledWith("b");
  });
});

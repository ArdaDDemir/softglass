import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTable, type DataTableColumn } from "./data-table";

type Row = { id: string; name: string; stock: number };

const ROWS: Row[] = [
  { id: "a", name: "Aurora", stock: 12 },
  { id: "b", name: "Mist", stock: 3 },
  { id: "c", name: "Pearl", stock: 40 },
];

const COLUMNS: DataTableColumn<Row>[] = [
  { id: "name", header: "Name", accessor: "name", sortable: true },
  { id: "stock", header: "Stock", accessor: "stock", sortable: true },
];

describe("DataTable (smoke)", () => {
  it("renders rows and empty state", () => {
    const { rerender } = render(
      <DataTable data={ROWS} columns={COLUMNS} aria-label="Products" />,
    );

    expect(screen.getByRole("table", { name: "Products" })).toBeInTheDocument();
    expect(screen.getByText("Aurora")).toBeInTheDocument();
    expect(screen.getByText("Mist")).toBeInTheDocument();

    rerender(
      <DataTable
        data={[]}
        columns={COLUMNS}
        emptyTitle="No products"
        emptyDescription="Add one to start."
      />,
    );

    expect(screen.getByText("No products")).toBeInTheDocument();
    expect(screen.getByText("Add one to start.")).toBeInTheDocument();
  });

  it("sorts by column when header is clicked", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();

    render(
      <DataTable
        data={ROWS}
        columns={COLUMNS}
        defaultSort={null}
        onSortChange={onSortChange}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /Sort Name/i }),
    );

    expect(onSortChange).toHaveBeenCalledWith({
      columnId: "name",
      direction: "asc",
    });

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);
    expect(within(rows[1]!).getByText("Aurora")).toBeInTheDocument();
  });

  it("cycles sort with keyboard on header button", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();

    render(
      <DataTable
        data={ROWS}
        columns={COLUMNS}
        defaultSort={null}
        onSortChange={onSortChange}
      />,
    );

    // Native <button> — Enter/Space activate click
    const btn = screen.getByRole("button", { name: /Sort Stock/i });
    btn.focus();
    await user.keyboard("{Enter}");
    expect(onSortChange).toHaveBeenLastCalledWith({
      columnId: "stock",
      direction: "asc",
    });

    await user.keyboard("{Enter}");
    expect(onSortChange).toHaveBeenLastCalledWith({
      columnId: "stock",
      direction: "desc",
    });
  });

  it("supports multi selection and select-all indeterminate", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <DataTable
        data={ROWS}
        columns={COLUMNS}
        selectionMode="multiple"
        getRowLabel={(row) => row.name}
        onSelectionChange={onSelectionChange}
      />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Select Aurora" }));
    expect(onSelectionChange).toHaveBeenCalledWith(["a"]);

    const selectAll = screen.getByRole("checkbox", {
      name: /Select all rows/,
    });
    // Partial selection → mixed
    expect(selectAll).toHaveAttribute("aria-checked", "mixed");

    await user.click(screen.getByRole("checkbox", { name: "Select Mist" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["a", "b"]);

    await user.click(
      screen.getByRole("checkbox", { name: /Select all rows/ }),
    );
    expect(onSelectionChange).toHaveBeenLastCalledWith(["a", "b", "c"]);
  });

  it("shows loading skeleton rows", () => {
    const { container } = render(
      <DataTable
        data={ROWS}
        columns={COLUMNS}
        loading
        loadingRowCount={3}
        aria-label="Loading table"
      />,
    );

    const table = screen.getByRole("table", { name: "Loading table" });
    expect(table).toHaveAttribute("aria-busy", "true");
    // Skeleton rows are aria-hidden (a11y) — query by class
    expect(container.querySelectorAll(".sg-table-row-skeleton")).toHaveLength(3);
    expect(screen.queryByText("Aurora")).not.toBeInTheDocument();
  });

  it("virtualizes long lists — only a window of rows in the DOM", () => {
    const many: Row[] = Array.from({ length: 1000 }, (_, i) => ({
      id: `r${i}`,
      name: `Row ${i}`,
      stock: i,
    }));

    const { container } = render(
      <DataTable
        data={many}
        columns={COLUMNS}
        virtualized
        estimateRowHeight={40}
        maxHeight={200}
        overscan={2}
        stickyHeader
        aria-label="Virtual products"
      />,
    );

    const root = container.querySelector(".sg-data-table");
    expect(root).toHaveAttribute("data-virtualized", "true");
    expect(root).toHaveAttribute("data-virtual-start", "0");
    // sticky default: attribute omitted when true
    expect(root).not.toHaveAttribute("data-sticky-header", "false");

    const bodyRows = container.querySelectorAll(
      ".sg-table-body .sg-table-row:not(.sg-table-row-spacer)",
    );
    // Viewport 200 / 40 = 5 + overscan*2 = 4 → ~9 data rows, far below 1000
    expect(bodyRows.length).toBeLessThan(40);
    expect(bodyRows.length).toBeGreaterThan(0);
    expect(screen.getByText("Row 0")).toBeInTheDocument();
    expect(screen.queryByText("Row 999")).not.toBeInTheDocument();

    // Bottom spacer holds the rest of the scroll height
    expect(
      container.querySelector('.sg-table-row-spacer[data-spacer="bottom"]'),
    ).toBeTruthy();
  });

  it("keeps selection + sort working under virtualization", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    const onSortChange = vi.fn();
    const many: Row[] = Array.from({ length: 200 }, (_, i) => ({
      id: `r${i}`,
      name: `Item ${String(i).padStart(3, "0")}`,
      stock: 200 - i,
    }));

    render(
      <DataTable
        data={many}
        columns={COLUMNS}
        virtualized
        estimateRowHeight={40}
        maxHeight={240}
        selectionMode="multiple"
        getRowLabel={(row) => row.name}
        onSelectionChange={onSelectionChange}
        onSortChange={onSortChange}
        stickyHeader
        aria-label="Select virtual"
      />,
    );

    await user.click(
      screen.getByRole("checkbox", { name: "Select Item 000" }),
    );
    expect(onSelectionChange).toHaveBeenCalledWith(["r0"]);

    // Select-all still targets full dataset ids, not just the window
    await user.click(
      screen.getByRole("checkbox", { name: /Select all rows/ }),
    );
    expect(onSelectionChange).toHaveBeenLastCalledWith(
      expect.arrayContaining(["r0", "r50", "r199"]),
    );
    expect(onSelectionChange.mock.calls.at(-1)?.[0]).toHaveLength(200);

    await user.click(screen.getByRole("button", { name: /Sort Name/i }));
    expect(onSortChange).toHaveBeenCalledWith({
      columnId: "name",
      direction: "asc",
    });
  });
});

"use client";

import type { ComponentPlayground } from "@/components/playground/library/manifest";
import {
  bool,
  boolControl,
  enumControl,
  showcase,
  str,
  strip,
} from "@/components/playground/library/helpers";
import {
  Badge,
  DataTable,
  type DataTableColumn,
  type DataTableDensity,
  type DataTableLook,
  type DataTableSelectionMode,
  type DataTableSortState,
} from "@softglass/ui";
import { useMemo, useState, type ReactNode } from "react";

type Product = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  status: "in_stock" | "low" | "out";
};

const PRODUCTS: Product[] = [
  { id: "p1", name: "Aurora Glass", sku: "SG-AUR-01", stock: 42, status: "in_stock" },
  { id: "p2", name: "Mist Panel", sku: "SG-MST-02", stock: 8, status: "low" },
  { id: "p3", name: "Pearl Frame", sku: "SG-PRL-03", stock: 0, status: "out" },
  { id: "p4", name: "Noir Edge", sku: "SG-NOR-04", stock: 19, status: "in_stock" },
  { id: "p5", name: "Ember Clip", sku: "SG-EMB-05", stock: 3, status: "low" },
  { id: "p6", name: "Obsidian Base", sku: "SG-OBS-06", stock: 27, status: "in_stock" },
];

function statusBadge(status: Product["status"]): ReactNode {
  if (status === "in_stock") {
    return (
      <Badge size="sm" variant="success" look="soft">
        In stock
      </Badge>
    );
  }
  if (status === "low") {
    return (
      <Badge size="sm" variant="warning" look="soft">
        Low
      </Badge>
    );
  }
  return (
    <Badge size="sm" variant="danger" look="soft">
      Out
    </Badge>
  );
}

const COLUMNS: DataTableColumn<Product>[] = [
  {
    id: "name",
    header: "Product",
    accessor: "name",
    sortable: true,
  },
  {
    id: "sku",
    header: "SKU",
    accessor: "sku",
    sortable: true,
  },
  {
    id: "stock",
    header: "Stock",
    accessor: "stock",
    sortable: true,
    align: "end",
    width: 88,
  },
  {
    id: "status",
    header: "Status",
    sortable: true,
    sortValue: (row) => row.status,
    cell: (row) => statusBadge(row.status),
  },
];

const LOOKS: DataTableLook[] = ["soft", "solid", "glass", "outline", "ghost"];
const DENSITIES: DataTableDensity[] = ["comfortable", "compact"];

function parseSelection(mode: string): DataTableSelectionMode {
  if (mode === "single" || mode === "multiple") return mode;
  return "none";
}

const LONG_LIST: Product[] = Array.from({ length: 1000 }, (_, i) => {
  const statuses: Product["status"][] = ["in_stock", "low", "out"];
  const status = statuses[i % 3]!;
  return {
    id: `long-${i}`,
    name: `Product ${String(i + 1).padStart(4, "0")}`,
    sku: `SG-${String(i + 1).padStart(5, "0")}`,
    stock: (i * 7) % 120,
    status,
  };
});

function LiveDataTable(props: Record<string, unknown>) {
  const look = str(props, "look", "soft") as DataTableLook;
  const density = str(props, "density", "comfortable") as DataTableDensity;
  const selectionMode = parseSelection(str(props, "selectionMode", "multiple"));
  const stickyHeader = bool(props, "stickyHeader");
  const loading = bool(props, "loading");
  const empty = bool(props, "empty");
  const clientSort = bool(props, "clientSort");
  const virtualized = bool(props, "virtualized");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sort, setSort] = useState<DataTableSortState>({
    columnId: "name",
    direction: "asc",
  });

  const data = useMemo(() => {
    if (empty) return [];
    if (virtualized) return LONG_LIST;
    return PRODUCTS;
  }, [empty, virtualized]);

  return (
    <div style={{ width: "100%", display: "grid", gap: "0.65rem" }}>
      <DataTable
        data={data}
        columns={COLUMNS}
        look={look}
        density={density}
        stickyHeader={stickyHeader}
        loading={loading}
        selectionMode={selectionMode}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        getRowLabel={(row) => row.name}
        sort={sort}
        onSortChange={setSort}
        clientSort={clientSort}
        virtualized={virtualized}
        maxHeight={320}
        emptyTitle="No products"
        emptyDescription="Create a product to fill this list."
        aria-label="Products"
      />
      <div
        style={{
          fontSize: "var(--sg-text-xs)",
          color: "color-mix(in srgb, var(--sg-fg) 62%, transparent)",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <span>
          Sort:{" "}
          {sort
            ? `${sort.columnId} · ${sort.direction}`
            : "none"}
        </span>
        <span>
          Selected:{" "}
          {selectedIds.length
            ? selectedIds.length > 8
              ? `${selectedIds.length} rows`
              : selectedIds.join(", ")
            : "—"}
        </span>
        {virtualized ? <span>Rows: {data.length} (virtualized)</span> : null}
      </div>
    </div>
  );
}

function MiniTable({
  look,
  density = "compact",
  selectionMode = "none",
  data = PRODUCTS.slice(0, 3),
  emptyTitle,
}: {
  look: DataTableLook;
  density?: DataTableDensity;
  selectionMode?: DataTableSelectionMode;
  data?: Product[];
  emptyTitle?: string;
}) {
  return (
    <DataTable
      data={data}
      columns={COLUMNS.slice(0, 3)}
      look={look}
      density={density}
      selectionMode={selectionMode}
      stickyHeader
      emptyTitle={emptyTitle}
      aria-label={`Demo ${look}`}
      style={{ width: 280, maxHeight: 180 }}
    />
  );
}

export const dataTablePlayground: ComponentPlayground = {
  id: "datatable",
  title: "DataTable",
  controls: [
    enumControl("look", LOOKS, "soft"),
    enumControl("density", DENSITIES, "comfortable"),
    enumControl(
      "selectionMode",
      ["none", "single", "multiple"],
      "multiple",
      "selection",
    ),
    boolControl("stickyHeader", true, "stickyHeader"),
    boolControl("clientSort", true, "clientSort"),
    boolControl("virtualized", false, "virtualized (1k)"),
    boolControl("loading", false),
    boolControl("empty", false, "empty data"),
  ],
  render: (props) => <LiveDataTable {...props} />,
  showcases: [
    showcase("Looks", () =>
      strip(
        LOOKS.map((look) => (
          <div key={look} style={{ display: "grid", gap: 6 }}>
            <span style={{ fontSize: 11, opacity: 0.7 }}>{look}</span>
            <MiniTable look={look} />
          </div>
        )),
      ),
    ),
    showcase("Density", () =>
      strip(
        DENSITIES.map((density) => (
          <div key={density} style={{ display: "grid", gap: 6 }}>
            <span style={{ fontSize: 11, opacity: 0.7 }}>{density}</span>
            <MiniTable look="solid" density={density} />
          </div>
        )),
      ),
    ),
    showcase("Selection", () =>
      strip([
        <div key="none" style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 11, opacity: 0.7 }}>none</span>
          <MiniTable look="soft" selectionMode="none" />
        </div>,
        <div key="single" style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 11, opacity: 0.7 }}>single</span>
          <MiniTable look="soft" selectionMode="single" />
        </div>,
        <div key="multi" style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 11, opacity: 0.7 }}>multiple</span>
          <MiniTable look="soft" selectionMode="multiple" />
        </div>,
      ]),
    ),
    showcase("Empty", () => (
      <DataTable
        data={[]}
        columns={COLUMNS}
        look="soft"
        emptyTitle="No products"
        emptyDescription="Add inventory to see rows here."
        aria-label="Empty products"
        style={{ width: "100%", maxWidth: 420 }}
      />
    )),
    showcase("Loading", () => (
      <DataTable
        data={PRODUCTS}
        columns={COLUMNS}
        look="soft"
        loading
        loadingRowCount={4}
        aria-label="Loading products"
        style={{ width: "100%", maxWidth: 420 }}
      />
    )),
    showcase("Sort (stock desc)", () => {
      const sort: DataTableSortState = {
        columnId: "stock",
        direction: "desc",
      };
      return (
        <DataTable
          data={PRODUCTS}
          columns={COLUMNS}
          look="outline"
          density="compact"
          defaultSort={sort}
          aria-label="Sorted by stock"
          style={{ width: "100%", maxWidth: 480, maxHeight: 220 }}
        />
      );
    }),
    showcase("Virtualized (1k rows)", () => (
      <div style={{ width: "100%", maxWidth: 560, display: "grid", gap: 8 }}>
        <span style={{ fontSize: 11, opacity: 0.7 }}>
          1000 rows · sticky header · compact · multi-select
        </span>
        <DataTable
          data={LONG_LIST}
          columns={COLUMNS}
          look="soft"
          density="compact"
          virtualized
          maxHeight={280}
          stickyHeader
          selectionMode="multiple"
          getRowLabel={(row) => row.name}
          defaultSort={{ columnId: "name", direction: "asc" }}
          aria-label="Virtualized product list"
        />
      </div>
    )),
  ],
};

"use client";

import {
  Button,
  ContextMenu,
  DropdownMenu,
  Input,
  Modal,
  Popover,
  useToast,
  type ToastVariant,
} from "@softglass/ui";
import { useState } from "react";

export function OverlayDemo() {
  const [open, setOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string>("—");
  const [contextAction, setContextAction] = useState<string>("—");
  const { toast } = useToast();

  function showToast(variant: ToastVariant) {
    const copy: Record<ToastVariant, { title: string; description: string }> = {
      default: {
        title: "Saved to draft",
        description: "Your changes are stored locally.",
      },
      success: {
        title: "Published",
        description: "The page is live on all languages.",
      },
      warning: {
        title: "Low contrast risk",
        description: "Glass over busy photos can fail WCAG.",
      },
      danger: {
        title: "Could not publish",
        description: "Check network and try again.",
      },
    };

    toast({
      variant,
      title: copy[variant].title,
      description: copy[variant].description,
    });
  }

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", alignItems: "center" }}>
        <Button type="button" onClick={() => setOpen(true)}>
          Open modal
        </Button>
        <Button type="button" variant="ghost" onClick={() => showToast("default")}>
          Toast default
        </Button>
        <Button type="button" variant="secondary" onClick={() => showToast("success")}>
          Toast success
        </Button>
        <Button type="button" variant="outline" onClick={() => showToast("warning")}>
          Toast warning
        </Button>
        <Button type="button" variant="danger" onClick={() => showToast("danger")}>
          Toast danger
        </Button>
      </div>

      <div
        style={{
          marginTop: "1.25rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          alignItems: "flex-start",
        }}
      >
        <DropdownMenu
          aria-label="Project actions"
          trigger={<Button type="button" variant="outline">Actions ▾</Button>}
          items={[
            {
              type: "label",
              label: "Project",
            },
            {
              id: "edit",
              label: "Edit",
              shortcut: "⌘E",
              onSelect: () => {
                setLastAction("Edit");
                showToast("default");
              },
            },
            {
              id: "duplicate",
              label: "Duplicate",
              onSelect: () => setLastAction("Duplicate"),
            },
            { type: "separator" },
            {
              id: "archive",
              label: "Archive",
              disabled: true,
            },
            {
              id: "delete",
              label: "Delete",
              destructive: true,
              onSelect: () => {
                setLastAction("Delete");
                showToast("danger");
              },
            },
          ]}
        />

        <Popover
          aria-label="Quick note"
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
          trigger={<Button type="button" variant="secondary">Popover</Button>}
        >
          <p
            style={{
              margin: "0 0 0.75rem",
              fontSize: "var(--sg-text-sm)",
              fontWeight: 600,
            }}
          >
            Quick note
          </p>
          <p
            style={{
              margin: "0 0 0.85rem",
              color: "var(--sg-fg-muted)",
              fontSize: "var(--sg-text-sm)",
              lineHeight: 1.45,
            }}
          >
            Popover = free content panel. DropdownMenu = action list. Select =
            pick a value.
          </p>
          <Button
            type="button"
            size="sm"
            onClick={() => {
              setPopoverOpen(false);
              showToast("success");
            }}
          >
            Got it
          </Button>
        </Popover>
      </div>

      <p
        style={{
          margin: "0.85rem 0 0",
          color: "var(--sg-fg-muted)",
          fontSize: "var(--sg-text-sm)",
        }}
      >
        Last menu action: <strong style={{ color: "var(--sg-fg)" }}>{lastAction}</strong>
      </p>

      <ContextMenu
        aria-label="File actions"
        items={[
          {
            type: "label",
            label: "File",
          },
          {
            id: "open",
            label: "Open",
            shortcut: "⌘O",
            onSelect: () => {
              setContextAction("Open");
              showToast("default");
            },
          },
          {
            id: "rename",
            label: "Rename",
            onSelect: () => setContextAction("Rename"),
          },
          { type: "separator" },
          {
            id: "share",
            label: "Share…",
            disabled: true,
          },
          {
            id: "delete-ctx",
            label: "Delete",
            destructive: true,
            onSelect: () => {
              setContextAction("Delete");
              showToast("danger");
            },
          },
        ]}
      >
        <div
          style={{
            marginTop: "1.25rem",
            padding: "1.25rem 1.35rem",
            borderRadius: "var(--sg-radius-lg)",
            border: "1px dashed var(--sg-border-frost)",
            background: "var(--sg-surface-frost)",
            color: "var(--sg-fg-muted)",
            fontSize: "var(--sg-text-sm)",
            lineHeight: 1.5,
            userSelect: "none",
            cursor: "context-menu",
          }}
        >
          <strong style={{ color: "var(--sg-fg)", display: "block", marginBottom: "0.35rem" }}>
            ContextMenu zone
          </strong>
          Right-click here (or long-press on touch). Same{" "}
          <code>items</code> language as DropdownMenu — pointer position, not a
          button.
          <span style={{ display: "block", marginTop: "0.5rem" }}>
            Last context action:{" "}
            <strong style={{ color: "var(--sg-fg)" }}>{contextAction}</strong>
          </span>
        </div>
      </ContextMenu>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Invite teammate"
        description="Portaled to body — viewport center, above sticky header. Escape or backdrop closes."
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                setOpen(false);
                showToast("success");
              }}
            >
              Send invite
            </Button>
          </>
        }
      >
        <div style={{ display: "grid", gap: "1rem" }}>
          <Input
            label="Email"
            type="email"
            placeholder="teammate@studio.dev"
            autoComplete="email"
          />
          <p style={{ margin: 0, color: "var(--sg-fg-muted)", fontSize: "var(--sg-text-sm)" }}>
            Modal uses <code>sg-surface-glass-elevated</code>. Long forms still
            put fields on solid when nested in dense flows — here a single field
            is fine.
          </p>
        </div>
      </Modal>
    </>
  );
}

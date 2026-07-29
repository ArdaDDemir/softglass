"use client";

import {
  Button,
  Input,
  Modal,
  useToast,
  type ToastVariant,
} from "@softglass/ui";
import { useState } from "react";

export function OverlayDemo() {
  const [open, setOpen] = useState(false);
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
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

"use client";

import { CheckCircle2, X, XCircle } from "lucide-react";
import type { ToastState } from "@/hooks/useToast";

interface ToastProps {
  toast: ToastState | null;
  onDismiss: () => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  if (!toast) return null;

  const isDanger = toast.tone === "danger";

  return (
    <div className="print:hidden pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:justify-end sm:px-6">
      <div
        role="status"
        aria-live="polite"
        className="animate-fade-in card pointer-events-auto flex w-full max-w-sm items-center gap-2 px-4 py-3"
      >
        {isDanger ? (
          <XCircle className="h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        )}
        <p className="flex-1 text-sm text-foreground">{toast.message}</p>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="shrink-0 rounded-full p-1 text-muted transition-colors hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

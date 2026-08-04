"use client";

import type { ReactNode } from "react";
import { Pencil } from "lucide-react";

interface SummarySectionProps {
  title: string;
  onEdit: () => void;
  children: ReactNode;
}

export function SummarySection({ title, onEdit, children }: SummarySectionProps) {
  return (
    <section className="card p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</h2>
        <button
          type="button"
          onClick={onEdit}
          className="print:hidden flex items-center gap-1 text-xs font-medium text-accent hover:underline"
        >
          <Pencil className="h-3 w-3" aria-hidden="true" />
          Edit
        </button>
      </div>
      <dl className="flex flex-col gap-2.5 text-sm">{children}</dl>
    </section>
  );
}

interface SummaryRowProps {
  label: string;
  value: ReactNode;
}

export function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <dt className="shrink-0 text-muted sm:w-40">{label}</dt>
      <dd className="min-w-0 break-words whitespace-pre-wrap text-foreground">
        {value || <span className="text-muted">Not specified</span>}
      </dd>
    </div>
  );
}

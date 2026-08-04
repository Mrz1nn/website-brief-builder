"use client";

import { Compass, FileText, RotateCcw, Sparkles, Trash2 } from "lucide-react";
import { STEP_META, STEP_ORDER } from "@/lib/options";
import type { BriefDraft } from "@/lib/types";

interface StartScreenProps {
  savedDraft: BriefDraft | null;
  onStartNew: () => void;
  onResume: () => void;
  onLoadSample: () => void;
  onClearDraft: () => void;
}

function formatUpdatedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function StartScreen({ savedDraft, onStartNew, onResume, onLoadSample, onClearDraft }: StartScreenProps) {
  return (
    <section className="card animate-fade-in mt-10 flex flex-col items-center gap-6 p-6 text-center sm:p-10">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
        <Compass className="h-7 w-7" aria-hidden="true" />
      </span>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Website Brief Builder</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted sm:text-base">
          Answer a short, visual questionnaire and get a clean, organized website brief you can copy or print in
          minutes.
        </p>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-2.5">
        <button type="button" onClick={onStartNew} className="btn-accent w-full rounded-lg px-4 py-2.5 text-sm font-medium">
          Start a new briefing
        </button>

        {savedDraft && (
          <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-surface-alt p-3 text-left">
            <p className="text-xs text-muted">
              Saved draft: step {savedDraft.stepIndex + 1} of {STEP_ORDER.length} (
              {STEP_META[STEP_ORDER[savedDraft.stepIndex]].shortTitle})
              {formatUpdatedAt(savedDraft.updatedAt) && `, last updated ${formatUpdatedAt(savedDraft.updatedAt)}`}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={onResume}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-alt"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Resume saved briefing
              </button>
              <button
                type="button"
                onClick={onClearDraft}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-danger-soft sm:w-auto"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Clear
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onLoadSample}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Try it with sample data
        </button>
      </div>

      <p className="flex items-center gap-1.5 text-xs text-muted">
        <FileText className="h-3.5 w-3.5" aria-hidden="true" />
        Everything stays on this device, saved to your browser only.
      </p>
    </section>
  );
}

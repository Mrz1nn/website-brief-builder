"use client";

import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Save } from "lucide-react";

interface StepShellProps {
  title: string;
  description: string;
  children: ReactNode;
  onBack?: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  isLastStep: boolean;
  savedJustNow: boolean;
}

export function StepShell({
  title,
  description,
  children,
  onBack,
  onNext,
  onSaveDraft,
  isLastStep,
  savedJustNow,
}: StepShellProps) {
  return (
    <section className="card animate-fade-in mt-6 p-5 sm:p-7">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h1>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>

      <div className="flex flex-col gap-6">{children}</div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={!onBack}
          className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-0"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSaveDraft}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-alt"
          >
            {savedJustNow ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
            {savedJustNow ? "Saved" : "Save draft"}
          </button>
          <button type="button" onClick={onNext} className="btn-accent flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium">
            {isLastStep ? "Review brief" : "Continue"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

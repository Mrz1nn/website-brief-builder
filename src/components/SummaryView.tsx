"use client";

import { useState } from "react";
import { Check, Copy, Printer, RotateCcw } from "lucide-react";
import { SummarySection, SummaryRow } from "@/components/SummarySection";
import {
  BUDGET_OPTIONS,
  FEATURE_OPTIONS,
  FEATURE_PRIORITY_OPTIONS,
  LOGO_STATUS_OPTIONS,
  PAGE_OPTIONS,
  PRIMARY_GOAL_OPTIONS,
  SECONDARY_GOAL_OPTIONS,
  STYLE_TAG_OPTIONS,
  URGENCY_OPTIONS,
} from "@/lib/options";
import { buildBriefSummaryText } from "@/lib/summary-text";
import type { BriefData, StepId } from "@/lib/types";

function labelFor<T extends string>(options: { value: T; label: string }[], value: T | null): string {
  if (!value) return "";
  return options.find((o) => o.value === value)?.label ?? value;
}

function labelsFor<T extends string>(options: { value: T; label: string }[], values: T[]): string {
  return values.map((v) => options.find((o) => o.value === v)?.label ?? v).join(", ");
}

interface SummaryViewProps {
  data: BriefData;
  onEditStep: (step: StepId) => void;
  onStartNew: () => void;
}

export function SummaryView({ data, onEditStep, onStartNew }: SummaryViewProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = buildBriefSummaryText(data);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be blocked by the browser; the text remains visible to copy manually.
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="animate-fade-in mt-6 flex flex-col gap-4 pb-10">
      <div className="print:hidden flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Brief summary</h1>
          <p className="text-sm text-muted">Review each section, then copy or print the final brief.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-alt"
          >
            {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? "Copied" : "Copy brief"}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-alt"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print / Save as PDF
          </button>
          <button
            type="button"
            onClick={onStartNew}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            New briefing
          </button>
        </div>
      </div>

      <div className="hidden text-center print:block">
        <h1 className="text-2xl font-semibold">Website Brief: {data.business.name || "Untitled project"}</h1>
      </div>

      <SummarySection title="Business" onEdit={() => onEditStep("business")}>
        <SummaryRow label="Name" value={data.business.name} />
        <SummaryRow label="Segment" value={data.business.segment} />
        <SummaryRow label="Description" value={data.business.description} />
      </SummarySection>

      <SummarySection title="Website goal" onEdit={() => onEditStep("goal")}>
        <SummaryRow label="Primary goal" value={labelFor(PRIMARY_GOAL_OPTIONS, data.goal.primary)} />
        <SummaryRow label="Secondary goals" value={labelsFor(SECONDARY_GOAL_OPTIONS, data.goal.secondary)} />
        <SummaryRow label="Success metric" value={data.goal.successMetric} />
      </SummarySection>

      <SummarySection title="Target audience" onEdit={() => onEditStep("audience")}>
        <SummaryRow label="Description" value={data.audience.description} />
        <SummaryRow label="Age range" value={data.audience.ageRange} />
        <SummaryRow label="Pain points" value={data.audience.painPoints} />
      </SummarySection>

      <SummarySection title="Pages" onEdit={() => onEditStep("pages")}>
        <SummaryRow label="Selected pages" value={labelsFor(PAGE_OPTIONS, data.pages.selected)} />
        <SummaryRow label="Other pages" value={data.pages.otherPages} />
      </SummarySection>

      <SummarySection title="Visual identity" onEdit={() => onEditStep("identity")}>
        <SummaryRow label="Logo status" value={labelFor(LOGO_STATUS_OPTIONS, data.identity.logoStatus)} />
        <SummaryRow label="Color preference" value={data.identity.colorPreference} />
        <SummaryRow label="Style" value={labelsFor(STYLE_TAG_OPTIONS, data.identity.styleTags)} />
        <SummaryRow label="Inspiration notes" value={data.identity.inspirationNotes} />
      </SummarySection>

      <SummarySection title="Features" onEdit={() => onEditStep("features")}>
        <SummaryRow
          label="Selected features"
          value={
            data.features.selected.length > 0 ? (
              <ul className="flex flex-col gap-1">
                {data.features.selected.map((feature) => {
                  const featureLabel = FEATURE_OPTIONS.find((o) => o.value === feature)?.label ?? feature;
                  const priority = data.features.priorities[feature];
                  const priorityLabel = priority
                    ? FEATURE_PRIORITY_OPTIONS.find((o) => o.value === priority)?.label
                    : "Not ranked";
                  return (
                    <li key={feature}>
                      {featureLabel} <span className="text-muted">({priorityLabel})</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              ""
            )
          }
        />
        <SummaryRow label="Demo budget range" value={labelFor(BUDGET_OPTIONS, data.features.budget)} />
      </SummarySection>

      <SummarySection title="References" onEdit={() => onEditStep("references")}>
        <SummaryRow label="Liked" value={data.references.liked} />
        <SummaryRow label="Disliked" value={data.references.disliked} />
      </SummarySection>

      <SummarySection title="Timeline" onEdit={() => onEditStep("timeline")}>
        <SummaryRow label="Target launch" value={data.timeline.launchTarget} />
        <SummaryRow label="Urgency" value={labelFor(URGENCY_OPTIONS, data.timeline.urgency)} />
        <SummaryRow label="Notes" value={data.timeline.notes} />
      </SummarySection>

      <p className="print:hidden text-center text-xs text-muted">
        All data above is stored only in this browser&apos;s localStorage.
      </p>
    </div>
  );
}

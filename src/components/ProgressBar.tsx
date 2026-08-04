"use client";

import { Check } from "lucide-react";
import { STEP_META, STEP_ORDER } from "@/lib/options";

interface ProgressBarProps {
  currentIndex: number;
  furthestIndex: number;
  onStepClick: (index: number) => void;
}

export function ProgressBar({ currentIndex, furthestIndex, onStepClick }: ProgressBarProps) {
  const total = STEP_ORDER.length;
  const percent = Math.round(((currentIndex + 1) / total) * 100);

  return (
    <div className="print:hidden">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          Step {currentIndex + 1} of {total}
        </span>
        <span>{percent}% complete</span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-alt">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ol className="scroll-x mt-4 flex gap-1 sm:overflow-visible" aria-label="Briefing steps">
        {STEP_ORDER.map((step, index) => {
          const isCurrent = index === currentIndex;
          const isDone = index < currentIndex;
          const isReachable = index <= furthestIndex;

          return (
            <li key={step} className="shrink-0 sm:flex-1">
              <button
                type="button"
                disabled={!isReachable}
                onClick={() => onStepClick(index)}
                aria-current={isCurrent ? "step" : undefined}
                className={`step-pill w-full whitespace-nowrap ${isCurrent ? "step-pill-current" : ""} ${
                  isDone ? "step-pill-done" : ""
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
                  {isDone ? (
                    <Check className="h-3 w-3 shrink-0" aria-hidden="true" />
                  ) : (
                    <span className="text-[10px] font-semibold">{index + 1}</span>
                  )}
                  <span className="sm:truncate">{STEP_META[step].shortTitle}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

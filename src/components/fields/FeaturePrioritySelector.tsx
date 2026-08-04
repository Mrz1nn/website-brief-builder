"use client";

import { Check } from "lucide-react";
import { FEATURE_PRIORITY_OPTIONS } from "@/lib/options";
import type { Option } from "@/lib/options";
import type { FeatureOption, FeaturePriority } from "@/lib/types";

interface FeaturePrioritySelectorProps {
  options: Option<FeatureOption>[];
  selected: FeatureOption[];
  priorities: Partial<Record<FeatureOption, FeaturePriority>>;
  onToggleFeature: (feature: FeatureOption) => void;
  onSetPriority: (feature: FeatureOption, priority: FeaturePriority) => void;
  error?: string;
}

export function FeaturePrioritySelector({
  options,
  selected,
  priorities,
  onToggleFeature,
  onSetPriority,
  error,
}: FeaturePrioritySelectorProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-foreground">
        Features needed
        <span className="ml-0.5 text-danger" aria-hidden="true">
          *
        </span>
      </legend>
      <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-surface">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <div key={option.value} className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => onToggleFeature(option.value)}
                aria-pressed={isSelected}
                className="flex items-center gap-2 text-left text-sm font-medium"
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    isSelected ? "border-accent bg-accent text-accent-foreground" : "border-border"
                  }`}
                >
                  {isSelected && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                </span>
                {option.label}
              </button>

              {isSelected && (
                <div className="flex flex-wrap gap-1.5 sm:ml-4">
                  {FEATURE_PRIORITY_OPTIONS.map((priority) => {
                    const active = priorities[option.value] === priority.value;
                    return (
                      <button
                        key={priority.value}
                        type="button"
                        onClick={() => onSetPriority(option.value, priority.value)}
                        aria-pressed={active}
                        className={`priority-pill ${active ? "priority-pill-selected" : ""}`}
                      >
                        {priority.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {error && (
        <p className="text-xs font-medium text-danger" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

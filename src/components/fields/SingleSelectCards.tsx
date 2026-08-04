"use client";

import { Check } from "lucide-react";
import type { Option } from "@/lib/options";

interface SingleSelectCardsProps<T extends string> {
  legend: string;
  options: Option<T>[];
  value: T | null;
  onChange: (value: T) => void;
  error?: string;
  columns?: 2 | 3;
  required?: boolean;
}

export function SingleSelectCards<T extends string>({
  legend,
  options,
  value,
  onChange,
  error,
  columns = 2,
  required,
}: SingleSelectCardsProps<T>) {
  const gridClass = columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-foreground">
        {legend}
        {required && (
          <span className="ml-0.5 text-danger" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div className={`grid grid-cols-1 gap-2 ${gridClass}`}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={selected}
              className={`option-card ${selected ? "option-card-selected" : ""}`}
            >
              <span className="flex items-start justify-between gap-2">
                <span className="text-sm font-medium">{option.label}</span>
                {selected && <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />}
              </span>
              {option.description && <span className="mt-1 block text-xs text-muted">{option.description}</span>}
            </button>
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

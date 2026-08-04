"use client";

import type { Option } from "@/lib/options";

interface MultiSelectChipsProps<T extends string> {
  legend: string;
  options: Option<T>[];
  values: T[];
  onChange: (values: T[]) => void;
  error?: string;
  required?: boolean;
}

export function MultiSelectChips<T extends string>({
  legend,
  options,
  values,
  onChange,
  error,
  required,
}: MultiSelectChipsProps<T>) {
  function toggle(value: T) {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  }

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
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = values.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              aria-pressed={selected}
              className={`chip ${selected ? "chip-selected" : ""}`}
            >
              {option.label}
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

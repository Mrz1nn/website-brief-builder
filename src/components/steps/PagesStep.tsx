"use client";

import { MultiSelectChips } from "@/components/fields/MultiSelectChips";
import { TextField } from "@/components/fields/TextField";
import { PAGE_OPTIONS } from "@/lib/options";
import type { StepErrors } from "@/lib/validation";
import type { PagesSection } from "@/lib/types";

interface PagesStepProps {
  value: PagesSection;
  onChange: (value: PagesSection) => void;
  errors: StepErrors;
}

export function PagesStep({ value, onChange, errors }: PagesStepProps) {
  return (
    <>
      <MultiSelectChips
        legend="Pages the site should include"
        options={PAGE_OPTIONS}
        values={value.selected}
        onChange={(selected) => onChange({ ...value, selected })}
        error={errors.selected}
        required
      />
      <TextField
        id="pages-other"
        label="Other pages not listed above (optional)"
        value={value.otherPages}
        onChange={(otherPages) => onChange({ ...value, otherPages })}
        placeholder="e.g. Wholesale inquiries page"
      />
    </>
  );
}

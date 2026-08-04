"use client";

import { TextField } from "@/components/fields/TextField";
import type { StepErrors } from "@/lib/validation";
import type { ReferencesSection } from "@/lib/types";

interface ReferencesStepProps {
  value: ReferencesSection;
  onChange: (value: ReferencesSection) => void;
  errors: StepErrors;
}

export function ReferencesStep({ value, onChange, errors }: ReferencesStepProps) {
  return (
    <>
      <TextField
        id="references-liked"
        label="Sites or styles you like"
        value={value.liked}
        onChange={(liked) => onChange({ ...value, liked })}
        placeholder="e.g. Clean product photography, big typography, subtle scroll animations"
        multiline
        rows={3}
        error={errors.liked}
        hint="Describe the style rather than naming specific brands, this stays a fictional demo brief."
        required
      />
      <TextField
        id="references-disliked"
        label="Things to avoid (optional)"
        value={value.disliked}
        onChange={(disliked) => onChange({ ...value, disliked })}
        placeholder="e.g. Auto-playing video backgrounds and pop-ups on page load"
        multiline
        rows={3}
      />
    </>
  );
}

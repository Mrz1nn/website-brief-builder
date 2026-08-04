"use client";

import { SingleSelectCards } from "@/components/fields/SingleSelectCards";
import { MultiSelectChips } from "@/components/fields/MultiSelectChips";
import { TextField } from "@/components/fields/TextField";
import { LOGO_STATUS_OPTIONS, STYLE_TAG_OPTIONS } from "@/lib/options";
import type { StepErrors } from "@/lib/validation";
import type { IdentitySection } from "@/lib/types";

interface IdentityStepProps {
  value: IdentitySection;
  onChange: (value: IdentitySection) => void;
  errors: StepErrors;
}

export function IdentityStep({ value, onChange, errors }: IdentityStepProps) {
  return (
    <>
      <SingleSelectCards
        legend="Logo status"
        options={LOGO_STATUS_OPTIONS}
        value={value.logoStatus}
        onChange={(logoStatus) => onChange({ ...value, logoStatus })}
        error={errors.logoStatus}
        columns={3}
        required
      />
      <TextField
        id="identity-colors"
        label="Color preference (optional)"
        value={value.colorPreference}
        onChange={(colorPreference) => onChange({ ...value, colorPreference })}
        placeholder="e.g. Warm neutrals with a deep forest green accent"
      />
      <MultiSelectChips
        legend="Style that fits the brand"
        options={STYLE_TAG_OPTIONS}
        values={value.styleTags}
        onChange={(styleTags) => onChange({ ...value, styleTags })}
        error={errors.styleTags}
        required
      />
      <TextField
        id="identity-notes"
        label="Inspiration notes (optional)"
        value={value.inspirationNotes}
        onChange={(inspirationNotes) => onChange({ ...value, inspirationNotes })}
        placeholder="Textures, imagery, or details worth keeping in mind"
        multiline
        rows={3}
      />
    </>
  );
}

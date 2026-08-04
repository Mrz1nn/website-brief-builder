"use client";

import { TextField } from "@/components/fields/TextField";
import type { StepErrors } from "@/lib/validation";
import type { BusinessSection } from "@/lib/types";

interface BusinessStepProps {
  value: BusinessSection;
  onChange: (value: BusinessSection) => void;
  errors: StepErrors;
}

export function BusinessStep({ value, onChange, errors }: BusinessStepProps) {
  return (
    <>
      <TextField
        id="business-name"
        label="Business or project name"
        value={value.name}
        onChange={(name) => onChange({ ...value, name })}
        placeholder="e.g. Northbound Coffee Roasters"
        error={errors.name}
        required
      />
      <TextField
        id="business-segment"
        label="Segment or industry"
        value={value.segment}
        onChange={(segment) => onChange({ ...value, segment })}
        placeholder="e.g. Specialty coffee roaster and café"
        error={errors.segment}
        required
      />
      <TextField
        id="business-description"
        label="Brief description"
        value={value.description}
        onChange={(description) => onChange({ ...value, description })}
        placeholder="What does the business do, and who does it serve today?"
        multiline
        rows={4}
        error={errors.description}
        hint="A couple of sentences is enough, this sets context for every other step."
        required
      />
    </>
  );
}

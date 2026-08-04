"use client";

import { TextField } from "@/components/fields/TextField";
import type { StepErrors } from "@/lib/validation";
import type { AudienceSection } from "@/lib/types";

interface AudienceStepProps {
  value: AudienceSection;
  onChange: (value: AudienceSection) => void;
  errors: StepErrors;
}

export function AudienceStep({ value, onChange, errors }: AudienceStepProps) {
  return (
    <>
      <TextField
        id="audience-description"
        label="Who is the target audience?"
        value={value.description}
        onChange={(description) => onChange({ ...value, description })}
        placeholder="e.g. Coffee enthusiasts who care about sourcing and roast quality"
        multiline
        rows={3}
        error={errors.description}
        required
      />
      <TextField
        id="audience-age-range"
        label="Age range (optional)"
        value={value.ageRange}
        onChange={(ageRange) => onChange({ ...value, ageRange })}
        placeholder="e.g. 25-45"
      />
      <TextField
        id="audience-pain-points"
        label="Pain points they have today (optional)"
        value={value.painPoints}
        onChange={(painPoints) => onChange({ ...value, painPoints })}
        placeholder="What frustrates them about current options?"
        multiline
        rows={3}
      />
    </>
  );
}

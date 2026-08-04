"use client";

import { SingleSelectCards } from "@/components/fields/SingleSelectCards";
import { TextField } from "@/components/fields/TextField";
import { URGENCY_OPTIONS } from "@/lib/options";
import type { StepErrors } from "@/lib/validation";
import type { TimelineSection } from "@/lib/types";

interface TimelineStepProps {
  value: TimelineSection;
  onChange: (value: TimelineSection) => void;
  errors: StepErrors;
}

export function TimelineStep({ value, onChange, errors }: TimelineStepProps) {
  return (
    <>
      <TextField
        id="timeline-launch"
        label="Target launch date or range"
        value={value.launchTarget}
        onChange={(launchTarget) => onChange({ ...value, launchTarget })}
        placeholder="e.g. In 3 months, or a specific date"
        error={errors.launchTarget}
        required
      />
      <SingleSelectCards
        legend="Urgency"
        options={URGENCY_OPTIONS}
        value={value.urgency}
        onChange={(urgency) => onChange({ ...value, urgency })}
        error={errors.urgency}
        columns={3}
        required
      />
      <TextField
        id="timeline-notes"
        label="Anything else about the schedule? (optional)"
        value={value.notes}
        onChange={(notes) => onChange({ ...value, notes })}
        multiline
        rows={3}
      />
    </>
  );
}

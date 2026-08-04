"use client";

import { SingleSelectCards } from "@/components/fields/SingleSelectCards";
import { MultiSelectChips } from "@/components/fields/MultiSelectChips";
import { TextField } from "@/components/fields/TextField";
import { PRIMARY_GOAL_OPTIONS, SECONDARY_GOAL_OPTIONS } from "@/lib/options";
import type { StepErrors } from "@/lib/validation";
import type { GoalSection } from "@/lib/types";

interface GoalStepProps {
  value: GoalSection;
  onChange: (value: GoalSection) => void;
  errors: StepErrors;
}

export function GoalStep({ value, onChange, errors }: GoalStepProps) {
  return (
    <>
      <SingleSelectCards
        legend="Main goal"
        options={PRIMARY_GOAL_OPTIONS}
        value={value.primary}
        onChange={(primary) => onChange({ ...value, primary })}
        error={errors.primary}
        required
      />
      <MultiSelectChips
        legend="Secondary goals (optional)"
        options={SECONDARY_GOAL_OPTIONS}
        values={value.secondary}
        onChange={(secondary) => onChange({ ...value, secondary })}
      />
      <TextField
        id="goal-success-metric"
        label="What does success look like? (optional)"
        value={value.successMetric}
        onChange={(successMetric) => onChange({ ...value, successMetric })}
        placeholder="e.g. Double online inquiries within 6 months"
      />
    </>
  );
}

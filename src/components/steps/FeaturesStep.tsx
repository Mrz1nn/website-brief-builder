"use client";

import { FeaturePrioritySelector } from "@/components/fields/FeaturePrioritySelector";
import { SingleSelectCards } from "@/components/fields/SingleSelectCards";
import { BUDGET_OPTIONS, FEATURE_OPTIONS } from "@/lib/options";
import type { StepErrors } from "@/lib/validation";
import type { FeatureOption, FeaturePriority, FeaturesSection } from "@/lib/types";

interface FeaturesStepProps {
  value: FeaturesSection;
  onChange: (value: FeaturesSection) => void;
  errors: StepErrors;
}

export function FeaturesStep({ value, onChange, errors }: FeaturesStepProps) {
  function toggleFeature(feature: FeatureOption) {
    if (value.selected.includes(feature)) {
      const rest = { ...value.priorities };
      delete rest[feature];
      onChange({ ...value, selected: value.selected.filter((f) => f !== feature), priorities: rest });
    } else {
      onChange({
        ...value,
        selected: [...value.selected, feature],
        priorities: { ...value.priorities, [feature]: "important" },
      });
    }
  }

  function setPriority(feature: FeatureOption, priority: FeaturePriority) {
    onChange({ ...value, priorities: { ...value.priorities, [feature]: priority } });
  }

  return (
    <>
      <FeaturePrioritySelector
        options={FEATURE_OPTIONS}
        selected={value.selected}
        priorities={value.priorities}
        onToggleFeature={toggleFeature}
        onSetPriority={setPriority}
        error={errors.selected}
      />
      <SingleSelectCards
        legend="Demonstrative budget range"
        options={BUDGET_OPTIONS}
        value={value.budget}
        onChange={(budget) => onChange({ ...value, budget })}
        error={errors.budget}
        columns={2}
        required
      />
    </>
  );
}

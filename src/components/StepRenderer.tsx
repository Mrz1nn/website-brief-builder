"use client";

import { AudienceStep } from "@/components/steps/AudienceStep";
import { BusinessStep } from "@/components/steps/BusinessStep";
import { FeaturesStep } from "@/components/steps/FeaturesStep";
import { GoalStep } from "@/components/steps/GoalStep";
import { IdentityStep } from "@/components/steps/IdentityStep";
import { PagesStep } from "@/components/steps/PagesStep";
import { ReferencesStep } from "@/components/steps/ReferencesStep";
import { TimelineStep } from "@/components/steps/TimelineStep";
import type { StepErrors } from "@/lib/validation";
import type { BriefData, StepId } from "@/lib/types";

interface StepRendererProps {
  step: StepId;
  data: BriefData;
  onChange: (data: BriefData) => void;
  errors: StepErrors;
}

export function StepRenderer({ step, data, onChange, errors }: StepRendererProps) {
  switch (step) {
    case "business":
      return <BusinessStep value={data.business} onChange={(business) => onChange({ ...data, business })} errors={errors} />;
    case "goal":
      return <GoalStep value={data.goal} onChange={(goal) => onChange({ ...data, goal })} errors={errors} />;
    case "audience":
      return <AudienceStep value={data.audience} onChange={(audience) => onChange({ ...data, audience })} errors={errors} />;
    case "pages":
      return <PagesStep value={data.pages} onChange={(pages) => onChange({ ...data, pages })} errors={errors} />;
    case "identity":
      return <IdentityStep value={data.identity} onChange={(identity) => onChange({ ...data, identity })} errors={errors} />;
    case "features":
      return <FeaturesStep value={data.features} onChange={(features) => onChange({ ...data, features })} errors={errors} />;
    case "references":
      return <ReferencesStep value={data.references} onChange={(references) => onChange({ ...data, references })} errors={errors} />;
    case "timeline":
      return <TimelineStep value={data.timeline} onChange={(timeline) => onChange({ ...data, timeline })} errors={errors} />;
    default:
      return null;
  }
}

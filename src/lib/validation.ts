import type { BriefData, StepId } from "./types";

export type StepErrors = Record<string, string>;

export function validateStep(step: StepId, data: BriefData): StepErrors {
  const errors: StepErrors = {};

  switch (step) {
    case "business": {
      const { business } = data;
      if (!business.name.trim()) errors.name = "Enter a business or project name.";
      if (!business.segment.trim()) errors.segment = "Enter the business segment or industry.";
      if (business.description.trim().length < 10) {
        errors.description = "Describe the business in at least 10 characters.";
      }
      break;
    }
    case "goal": {
      const { goal } = data;
      if (!goal.primary) errors.primary = "Choose the main goal for this site.";
      break;
    }
    case "audience": {
      const { audience } = data;
      if (!audience.description.trim()) errors.description = "Describe the target audience.";
      break;
    }
    case "pages": {
      const { pages } = data;
      if (pages.selected.length === 0) errors.selected = "Select at least one page.";
      break;
    }
    case "identity": {
      const { identity } = data;
      if (!identity.logoStatus) errors.logoStatus = "Choose the current logo status.";
      if (identity.styleTags.length === 0) errors.styleTags = "Pick at least one style that fits.";
      break;
    }
    case "features": {
      const { features } = data;
      if (features.selected.length === 0) errors.selected = "Select at least one feature.";
      if (!features.budget) errors.budget = "Choose a demonstrative budget range.";
      break;
    }
    case "references": {
      const { references } = data;
      if (!references.liked.trim()) errors.liked = "Share at least one reference or style you like.";
      break;
    }
    case "timeline": {
      const { timeline } = data;
      if (!timeline.launchTarget.trim()) errors.launchTarget = "Enter a target launch date or range.";
      if (!timeline.urgency) errors.urgency = "Choose how urgent this project is.";
      break;
    }
  }

  return errors;
}

export function isStepValid(step: StepId, data: BriefData): boolean {
  return Object.keys(validateStep(step, data)).length === 0;
}

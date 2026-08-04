import type { BriefData } from "./types";

export function createEmptyBriefData(): BriefData {
  return {
    business: { name: "", segment: "", description: "" },
    goal: { primary: null, secondary: [], successMetric: "" },
    audience: { description: "", ageRange: "", painPoints: "" },
    pages: { selected: [], otherPages: "" },
    identity: { logoStatus: null, colorPreference: "", styleTags: [], inspirationNotes: "" },
    features: { selected: [], priorities: {}, budget: null },
    references: { liked: "", disliked: "" },
    timeline: { launchTarget: "", urgency: null, notes: "" },
  };
}

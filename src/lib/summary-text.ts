import {
  BUDGET_OPTIONS,
  FEATURE_OPTIONS,
  FEATURE_PRIORITY_OPTIONS,
  LOGO_STATUS_OPTIONS,
  PAGE_OPTIONS,
  PRIMARY_GOAL_OPTIONS,
  SECONDARY_GOAL_OPTIONS,
  STYLE_TAG_OPTIONS,
  URGENCY_OPTIONS,
} from "./options";
import type { BriefData } from "./types";

function labelFor<T extends string>(options: { value: T; label: string }[], value: T | null): string {
  if (!value) return "Not specified";
  return options.find((o) => o.value === value)?.label ?? value;
}

function labelsFor<T extends string>(options: { value: T; label: string }[], values: T[]): string {
  if (values.length === 0) return "None";
  return values.map((v) => options.find((o) => o.value === v)?.label ?? v).join(", ");
}

export function buildBriefSummaryText(data: BriefData): string {
  const lines: string[] = [];
  const heading = data.business.name.trim() || "Untitled project";

  lines.push(`WEBSITE BRIEF: ${heading}`);
  lines.push("");

  lines.push("BUSINESS");
  lines.push(`Name: ${data.business.name || "-"}`);
  lines.push(`Segment: ${data.business.segment || "-"}`);
  lines.push(`Description: ${data.business.description || "-"}`);
  lines.push("");

  lines.push("WEBSITE GOAL");
  lines.push(`Primary goal: ${labelFor(PRIMARY_GOAL_OPTIONS, data.goal.primary)}`);
  lines.push(`Secondary goals: ${labelsFor(SECONDARY_GOAL_OPTIONS, data.goal.secondary)}`);
  lines.push(`Success metric: ${data.goal.successMetric || "-"}`);
  lines.push("");

  lines.push("TARGET AUDIENCE");
  lines.push(`Description: ${data.audience.description || "-"}`);
  lines.push(`Age range: ${data.audience.ageRange || "-"}`);
  lines.push(`Pain points: ${data.audience.painPoints || "-"}`);
  lines.push("");

  lines.push("PAGES");
  lines.push(`Selected pages: ${labelsFor(PAGE_OPTIONS, data.pages.selected)}`);
  lines.push(`Other pages: ${data.pages.otherPages || "-"}`);
  lines.push("");

  lines.push("VISUAL IDENTITY");
  lines.push(`Logo status: ${labelFor(LOGO_STATUS_OPTIONS, data.identity.logoStatus)}`);
  lines.push(`Color preference: ${data.identity.colorPreference || "-"}`);
  lines.push(`Style: ${labelsFor(STYLE_TAG_OPTIONS, data.identity.styleTags)}`);
  lines.push(`Inspiration notes: ${data.identity.inspirationNotes || "-"}`);
  lines.push("");

  lines.push("FEATURES");
  if (data.features.selected.length === 0) {
    lines.push("Selected features: None");
  } else {
    lines.push("Selected features:");
    for (const feature of data.features.selected) {
      const featureLabel = FEATURE_OPTIONS.find((o) => o.value === feature)?.label ?? feature;
      const priority = data.features.priorities[feature];
      const priorityLabel = priority
        ? FEATURE_PRIORITY_OPTIONS.find((o) => o.value === priority)?.label
        : "Not ranked";
      lines.push(`  - ${featureLabel} (${priorityLabel})`);
    }
  }
  lines.push(`Demo budget range: ${labelFor(BUDGET_OPTIONS, data.features.budget)}`);
  lines.push("");

  lines.push("REFERENCES");
  lines.push(`Liked: ${data.references.liked || "-"}`);
  lines.push(`Disliked: ${data.references.disliked || "-"}`);
  lines.push("");

  lines.push("TIMELINE");
  lines.push(`Target launch: ${data.timeline.launchTarget || "-"}`);
  lines.push(`Urgency: ${labelFor(URGENCY_OPTIONS, data.timeline.urgency)}`);
  lines.push(`Notes: ${data.timeline.notes || "-"}`);

  return lines.join("\n");
}

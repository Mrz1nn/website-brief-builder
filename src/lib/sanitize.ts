import { createEmptyBriefData } from "./empty-data";
import type { BriefData, BriefDraft } from "./types";

/** Narrows an unknown value to a plain object, otherwise returns an empty object. */
function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function str(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function strArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function nullableStr(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

/**
 * Rebuilds a BriefData object field by field from an untrusted source (localStorage
 * can be edited by hand, hold data from a previous shape, or fail to parse). Any
 * missing or mistyped field silently falls back to its default instead of throwing
 * mid-render.
 */
export function sanitizeBriefData(raw: unknown): BriefData {
  const empty = createEmptyBriefData();
  const source = asRecord(raw);

  const business = asRecord(source.business);
  const goal = asRecord(source.goal);
  const audience = asRecord(source.audience);
  const pages = asRecord(source.pages);
  const identity = asRecord(source.identity);
  const features = asRecord(source.features);
  const references = asRecord(source.references);
  const timeline = asRecord(source.timeline);
  const priorities = asRecord(features.priorities);

  return {
    business: {
      name: str(business.name, empty.business.name),
      segment: str(business.segment, empty.business.segment),
      description: str(business.description, empty.business.description),
    },
    goal: {
      primary: nullableStr(goal.primary) as BriefData["goal"]["primary"],
      secondary: strArray(goal.secondary) as BriefData["goal"]["secondary"],
      successMetric: str(goal.successMetric, empty.goal.successMetric),
    },
    audience: {
      description: str(audience.description, empty.audience.description),
      ageRange: str(audience.ageRange, empty.audience.ageRange),
      painPoints: str(audience.painPoints, empty.audience.painPoints),
    },
    pages: {
      selected: strArray(pages.selected) as BriefData["pages"]["selected"],
      otherPages: str(pages.otherPages, empty.pages.otherPages),
    },
    identity: {
      logoStatus: nullableStr(identity.logoStatus) as BriefData["identity"]["logoStatus"],
      colorPreference: str(identity.colorPreference, empty.identity.colorPreference),
      styleTags: strArray(identity.styleTags) as BriefData["identity"]["styleTags"],
      inspirationNotes: str(identity.inspirationNotes, empty.identity.inspirationNotes),
    },
    features: {
      selected: strArray(features.selected) as BriefData["features"]["selected"],
      priorities: Object.fromEntries(
        Object.entries(priorities).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
      ) as BriefData["features"]["priorities"],
      budget: nullableStr(features.budget) as BriefData["features"]["budget"],
    },
    references: {
      liked: str(references.liked, empty.references.liked),
      disliked: str(references.disliked, empty.references.disliked),
    },
    timeline: {
      launchTarget: str(timeline.launchTarget, empty.timeline.launchTarget),
      urgency: nullableStr(timeline.urgency) as BriefData["timeline"]["urgency"],
      notes: str(timeline.notes, empty.timeline.notes),
    },
  };
}

export function sanitizeBriefDraft(raw: unknown): BriefDraft | null {
  const source = asRecord(raw);
  if (!("data" in source)) return null;

  const stepIndex = typeof source.stepIndex === "number" && Number.isFinite(source.stepIndex) ? source.stepIndex : 0;

  return {
    data: sanitizeBriefData(source.data),
    stepIndex: Math.max(0, Math.floor(stepIndex)),
    updatedAt: str(source.updatedAt, new Date().toISOString()),
  };
}

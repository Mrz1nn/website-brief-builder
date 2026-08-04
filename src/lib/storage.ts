import { sanitizeBriefDraft } from "./sanitize";
import type { BriefDraft, Theme } from "./types";

const DRAFT_KEY = "website-brief-builder:draft";
const THEME_KEY = "website-brief-builder:theme";

export function loadDraft(): BriefDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return sanitizeBriefDraft(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveDraft(draft: BriefDraft): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Storage can be unavailable (private browsing, disabled cookies); nothing to clean up in that case.
  }
}

export function loadTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(THEME_KEY);
    return raw === "light" || raw === "dark" ? raw : null;
  } catch {
    return null;
  }
}

export function saveTheme(theme: Theme): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Non-fatal: theme just won't persist across sessions.
  }
}

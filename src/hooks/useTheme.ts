"use client";

import { useCallback, useEffect, useState } from "react";
import { loadTheme, saveTheme } from "@/lib/storage";
import type { Theme } from "@/lib/types";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = loadTheme();
    const initial = stored ?? (document.documentElement.classList.contains("dark") ? "dark" : "light");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of persisted theme on mount
    setTheme(initial);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    saveTheme(theme);
  }, [theme, isReady]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme, isReady };
}

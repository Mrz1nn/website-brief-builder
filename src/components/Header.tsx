"use client";

import { Compass } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Theme } from "@/lib/types";

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="print:hidden border-b border-border bg-surface">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Compass className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
            Website Brief Builder
          </span>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}

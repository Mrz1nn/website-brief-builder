"use client";

import { useCallback, useRef, useState } from "react";

export interface ToastState {
  id: number;
  message: string;
  tone: "default" | "danger";
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const counter = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string, tone: ToastState["tone"] = "default") => {
    counter.current += 1;
    setToast({ id: counter.current, message, tone });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const dismissToast = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast(null);
  }, []);

  return { toast, showToast, dismissToast };
}

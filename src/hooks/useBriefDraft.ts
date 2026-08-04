"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { STEP_ORDER } from "@/lib/options";
import { createEmptyBriefData } from "@/lib/empty-data";
import { clearDraft, loadDraft, saveDraft } from "@/lib/storage";
import type { BriefData, BriefDraft } from "@/lib/types";

function clampStepIndex(index: number): number {
  return Math.min(Math.max(index, 0), STEP_ORDER.length - 1);
}

export function useBriefDraft(onSaveError?: () => void) {
  const [data, setData] = useState<BriefData>(createEmptyBriefData);
  const [stepIndex, setStepIndex] = useState(0);
  const [savedDraft, setSavedDraft] = useState<BriefDraft | null>(null);
  const [isReady, setIsReady] = useState(false);
  const skipNextSave = useRef(true);
  const onSaveErrorRef = useRef(onSaveError);

  useEffect(() => {
    onSaveErrorRef.current = onSaveError;
  }, [onSaveError]);

  useEffect(() => {
    const draft = loadDraft();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of localStorage on mount, no external system to subscribe to
    setSavedDraft(draft);
    setIsReady(true);
  }, []);

  const persist = useCallback((nextData: BriefData, nextStepIndex: number) => {
    const draft: BriefDraft = {
      data: nextData,
      stepIndex: clampStepIndex(nextStepIndex),
      updatedAt: new Date().toISOString(),
    };
    const ok = saveDraft(draft);
    if (ok) {
      setSavedDraft(draft);
    } else {
      onSaveErrorRef.current?.();
    }
    return ok;
  }, []);

  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    persist(data, stepIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- persist identity is stable, only data/stepIndex should retrigger
  }, [data, stepIndex]);

  const saveNow = useCallback(() => persist(data, stepIndex), [persist, data, stepIndex]);

  const resumeDraft = useCallback(() => {
    const draft = loadDraft();
    if (!draft) return;
    skipNextSave.current = true;
    setData(draft.data);
    setStepIndex(clampStepIndex(draft.stepIndex));
  }, []);

  const startFresh = useCallback((initialData?: BriefData) => {
    clearDraft();
    skipNextSave.current = true;
    setData(initialData ?? createEmptyBriefData());
    setStepIndex(0);
    setSavedDraft(null);
  }, []);

  const discardDraft = useCallback(() => {
    clearDraft();
    setSavedDraft(null);
  }, []);

  return {
    data,
    setData,
    stepIndex,
    setStepIndex,
    savedDraft,
    isReady,
    resumeDraft,
    startFresh,
    discardDraft,
    saveNow,
  };
}

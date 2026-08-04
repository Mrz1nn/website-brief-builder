"use client";

import { useCallback, useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { StartScreen } from "@/components/StartScreen";
import { StepRenderer } from "@/components/StepRenderer";
import { StepShell } from "@/components/StepShell";
import { SummaryView } from "@/components/SummaryView";
import { Toast } from "@/components/Toast";
import { useBriefDraft } from "@/hooks/useBriefDraft";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/useToast";
import { STEP_META, STEP_ORDER } from "@/lib/options";
import { createSampleBriefData } from "@/lib/sample-data";
import type { StepErrors } from "@/lib/validation";
import { validateStep } from "@/lib/validation";
import type { StepId } from "@/lib/types";

type Mode = "start" | "wizard" | "summary";

export default function Home() {
  const { toast, showToast, dismissToast } = useToast();
  const handleSaveError = useCallback(() => {
    showToast("Could not save your progress. Your browser storage may be full or blocked.", "danger");
  }, [showToast]);
  const { data, setData, stepIndex, setStepIndex, savedDraft, isReady, resumeDraft, startFresh, discardDraft } =
    useBriefDraft(handleSaveError);
  const { theme, toggleTheme, isReady: themeReady } = useTheme();

  const [mode, setMode] = useState<Mode>("start");
  const [furthestIndex, setFurthestIndex] = useState(0);
  const [errors, setErrors] = useState<StepErrors>({});
  const [savedJustNow, setSavedJustNow] = useState(false);
  const [pendingNewBrief, setPendingNewBrief] = useState(false);
  const [pendingClearDraft, setPendingClearDraft] = useState(false);

  if (!isReady || !themeReady) {
    return null;
  }

  const hasSavedProgress = Boolean(savedDraft);
  const currentStep: StepId = STEP_ORDER[stepIndex];

  function goToWizardStep(index: number) {
    setErrors({});
    setStepIndex(index);
    setFurthestIndex((prev) => Math.max(prev, index));
    setMode("wizard");
  }

  function handleStartNew() {
    if (hasSavedProgress) {
      setPendingNewBrief(true);
      return;
    }
    startFresh();
    goToWizardStep(0);
  }

  function confirmStartNew() {
    startFresh();
    setPendingNewBrief(false);
    goToWizardStep(0);
  }

  function handleResume() {
    resumeDraft();
    const draftStepIndex = savedDraft?.stepIndex ?? 0;
    setErrors({});
    setStepIndex(draftStepIndex);
    setFurthestIndex(draftStepIndex);
    setMode("wizard");
  }

  function handleLoadSample() {
    startFresh(createSampleBriefData());
    setFurthestIndex(STEP_ORDER.length - 1);
    setMode("wizard");
  }

  function handleContinue() {
    const stepErrors = validateStep(currentStep, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    if (stepIndex === STEP_ORDER.length - 1) {
      setMode("summary");
      return;
    }
    const nextIndex = stepIndex + 1;
    setStepIndex(nextIndex);
    setFurthestIndex((prev) => Math.max(prev, nextIndex));
  }

  function handleBack() {
    setErrors({});
    setStepIndex(Math.max(0, stepIndex - 1));
  }

  function handleSaveDraft() {
    setSavedJustNow(true);
    showToast("Draft saved to this browser.");
    setTimeout(() => setSavedJustNow(false), 1600);
  }

  function handleClearDraft() {
    setPendingClearDraft(true);
  }

  function confirmClearDraft() {
    discardDraft();
    setPendingClearDraft(false);
    showToast("Saved draft cleared.");
  }

  function handleEditStep(step: StepId) {
    goToWizardStep(STEP_ORDER.indexOf(step));
  }

  function handleNewFromSummary() {
    setPendingNewBrief(true);
  }

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 sm:px-6">
        {mode === "start" && (
          <StartScreen
            savedDraft={savedDraft}
            onStartNew={handleStartNew}
            onResume={handleResume}
            onLoadSample={handleLoadSample}
            onClearDraft={handleClearDraft}
          />
        )}

        {mode === "wizard" && (
          <>
            <div className="print:hidden mt-6">
              <ProgressBar currentIndex={stepIndex} furthestIndex={furthestIndex} onStepClick={goToWizardStep} />
            </div>
            <StepShell
              title={STEP_META[currentStep].title}
              description={STEP_META[currentStep].description}
              onBack={stepIndex > 0 ? handleBack : undefined}
              onNext={handleContinue}
              onSaveDraft={handleSaveDraft}
              isLastStep={stepIndex === STEP_ORDER.length - 1}
              savedJustNow={savedJustNow}
            >
              <StepRenderer step={currentStep} data={data} onChange={setData} errors={errors} />
            </StepShell>
          </>
        )}

        {mode === "summary" && (
          <SummaryView data={data} onEditStep={handleEditStep} onStartNew={handleNewFromSummary} />
        )}
      </main>

      {pendingNewBrief && (
        <ConfirmDialog
          title="Start a new briefing?"
          description="This discards the current briefing saved in this browser. This cannot be undone."
          confirmLabel="Start new"
          onConfirm={confirmStartNew}
          onCancel={() => setPendingNewBrief(false)}
        />
      )}

      {pendingClearDraft && (
        <ConfirmDialog
          title="Clear saved draft?"
          description="This removes the briefing saved in this browser's storage. This cannot be undone."
          confirmLabel="Clear draft"
          onConfirm={confirmClearDraft}
          onCancel={() => setPendingClearDraft(false)}
        />
      )}

      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  );
}

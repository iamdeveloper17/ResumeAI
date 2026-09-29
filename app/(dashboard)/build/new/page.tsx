"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  useResumeStore,
  validateStep,
  emptyResume,
  cleanDataForSave,
} from "@/lib/resumeStore";
import { toast } from "sonner";
import StepIndicator from "@/components/builder/StepIndicator";
import PersonalStep from "@/components/builder/steps/PersonalStep";
import ExperienceStep from "@/components/builder/steps/ExperienceStep";
import EducationStep from "@/components/builder/steps/EducationStep";
import SkillsStep from "@/components/builder/steps/SkillsStep";
import ProjectsStep from "@/components/builder/steps/ProjectsStep";
import TemplateRenderer from "@/components/builder/templates/TemplateRenderer";
import PreviewControls from "@/components/builder/PreviewControls";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  AlertCircle,
  Printer,
  Loader2,
} from "lucide-react";

const STEPS = ["Personal Info", "Experience", "Education", "Skills", "Projects"];
const STEPS_COMPONENTS = [
  PersonalStep,
  ExperienceStep,
  EducationStep,
  SkillsStep,
  ProjectsStep,
];

export default function NewResumeBuilderPage() {
  const router = useRouter();

  const {
    resumeId,
    setResumeId,
    data,
    currentStep,
    setStep,
    setData,
    lastSaved,
    setLastSaved,
  } = useResumeStore();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSavingLocal, setIsSavingLocal] = useState(false);
  const [zoom, setZoom] = useState(100);
  const previewRef = useRef<HTMLDivElement>(null);

  const CurrentStepComponent = STEPS_COMPONENTS[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === STEPS.length - 1;

  // Reset store for new resume on mount
  useEffect(() => {
    setResumeId(null);
    setData(emptyResume);
    setStep(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual Save
  const handleManualSave = async () => {
    setIsSavingLocal(true);
    try {
      const cleaned = cleanDataForSave(data);

      const createRes = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title || "Untitled Resume",
          template: data.template,
        }),
      });

      if (!createRes.ok) throw new Error("Failed to create");
      const { resume: newResume } = await createRes.json();

      const saveRes = await fetch(`/api/resumes/${newResume._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleaned),
      });

      if (!saveRes.ok) throw new Error("Failed to save data");

      setResumeId(newResume._id);
      setLastSaved(new Date());
      toast.success("Resume saved!");

      // Redirect to /build/[id]
      router.push(`/build/${newResume._id}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to save resume");
    } finally {
      setIsSavingLocal(false);
    }
  };

  // Print
  const handlePrint = () => {
    if (!previewRef.current) return;
    toast.info(
      "💡 In print dialog, choose 'Save as PDF' as destination to download",
      { duration: 5000 }
    );
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Please allow popups to download PDF");
      return;
    }
    const html = previewRef.current.innerHTML;
    const accent = data.accentColor || "#2563eb";
    const title = data.personal.fullName || "Resume";
    const isClassic = data.template === "classic";

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: ${isClassic ? "Georgia, 'Times New Roman', serif" : "'Inter', sans-serif"};
              font-size: 11px; line-height: 1.5; color: #1e293b; background: #fff; padding: 40px;
            }
            @page { size: A4; margin: 0.6in; }
            @media print { body { padding: 0; } }
            h1 { font-size: ${isClassic ? "24px" : "26px"}; font-weight: 700; color: ${accent}; margin-bottom: 4px; letter-spacing: ${isClassic ? "0.05em" : "-0.02em"}; }
            h2 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: ${isClassic ? "0.15em" : "0.08em"}; color: ${accent}; margin-top: 18px; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid ${isClassic ? accent : "#e2e8f0"}; }
            h3 { font-size: 12px; font-weight: 600; color: #0f172a; margin-bottom: 2px; }
            p { margin-bottom: 4px; color: #334155; }
            ul { list-style: disc; padding-left: 18px; margin-top: 4px; }
            li { margin-bottom: 3px; color: #334155; }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  const handleBack = () => {
    if (isFirstStep) router.push("/resumes");
    else setStep(currentStep - 1);
  };

  const handleNext = () => {
    const validationErrors = validateStep(currentStep, data);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((e) => (errorMap[e.field] = e.message));
      setErrors(errorMap);
      toast.error("Please fill all required fields");
      return;
    }
    setErrors({});
    if (!isLastStep) setStep(currentStep + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/resumes")}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <input
              className="text-xl font-bold text-slate-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded px-1 -ml-1"
              value={data.title}
              onChange={(e) => setData({ title: e.target.value })}
            />
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              {isSavingLocal ? (
                <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</>
              ) : lastSaved ? (
                <><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Saved {lastSaved.toLocaleTimeString()}</>
              ) : "Not saved yet"}
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30"
        >
          <Printer className="w-4 h-4" />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6">
            <StepIndicator currentStep={currentStep} onStepClick={setStep} />
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-900 mb-1">{STEPS[currentStep]}</h2>
              <p className="text-xs text-slate-500">Step {currentStep + 1} of {STEPS.length}</p>
            </div>
            {Object.keys(errors).length > 0 && (
              <div className="flex items-start gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-700">Please fill all required fields before proceeding</p>
              </div>
            )}
            <div className="min-h-[400px]">
              <CurrentStepComponent errors={errors} />
            </div>
            <div className="flex items-center justify-between gap-3 mt-6 pt-6 border-t border-slate-200">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
                {isFirstStep ? "Cancel" : "Back"}
              </button>
              {!isLastStep && (
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {isLastStep && (
                <button
                  onClick={handleManualSave}
                  disabled={isSavingLocal}
                  style={{
                    backgroundColor: isSavingLocal ? "#94a3b8" : "#059669",
                    color: "#ffffff",
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all shadow-lg disabled:cursor-not-allowed"
                >
                  {isSavingLocal ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                  ) : (
                    <><Save className="w-4 h-4" /> Save Resume</>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 lg:sticky lg:top-20">
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <h2 className="text-lg font-bold text-slate-900">Live Preview</h2>
              <PreviewControls
                template={data.template}
                accentColor={data.accentColor}
                zoom={zoom}
                onTemplateChange={(template) => setData({ template })}
                onColorChange={(accentColor) => setData({ accentColor })}
                onZoomChange={setZoom}
              />
            </div>
            <div className="overflow-hidden">
              <div
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "top left",
                  transition: "transform 0.2s ease-out",
                }}
              >
                <TemplateRenderer ref={previewRef} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
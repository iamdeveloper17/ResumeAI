"use client";

import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Personal", icon: User },
  { label: "Experience", icon: Briefcase },
  { label: "Education", icon: GraduationCap },
  { label: "Skills", icon: Wrench },
  { label: "Projects", icon: FolderGit2 },
];

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function StepIndicator({
  currentStep,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between gap-1 mb-6">
      {STEPS.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={step.label} className="flex items-center flex-1">
            <button
              onClick={() => onStepClick(index)}
              className="flex flex-col items-center gap-2 flex-1 group"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-110"
                    : isCompleted
                    ? "bg-blue-100 text-blue-600"
                    : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] sm:text-xs font-medium hidden sm:block",
                  isActive
                    ? "text-blue-600"
                    : isCompleted
                    ? "text-blue-500"
                    : "text-slate-400"
                )}
              >
                {step.label}
              </span>
            </button>

            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 rounded-full transition-colors mx-1",
                  isCompleted ? "bg-blue-600" : "bg-slate-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
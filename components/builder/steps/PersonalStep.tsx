"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useResumeStore } from "@/lib/resumeStore";
import {
  JOB_TITLES,
  CITIES,
} from "@/lib/data/suggestions-db";
import AutocompleteInput from "@/components/ui/autocomplete-input";
// import AIButton from "@/components/builder/AIButton";

interface PersonalStepProps {
  errors?: Record<string, string>;
}

export default function PersonalStep({ errors = {} }: PersonalStepProps) {
  const { data, setPersonal } = useResumeStore();
  const [generating, setGenerating] = useState(false);

  const p = data.personal;

  const inputClass = (field: string) =>
    `w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-4 transition-all ${
      errors[field]
        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
        : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
    }`;

  // ─── AI Summary Generator ───
  const handleGenerateSummary = async () => {
    if (!p.jobTitle || p.jobTitle.trim().length < 2) {
      toast.error("Please fill your Job Title first");
      return;
    }

    setGenerating(true);
    const toastId = toast.loading("✨ Generating summary with AI...");

    try {
      // Build experience summary from existing data
      const experienceText =
        data.experience.length > 0
          ? data.experience
              .map((e) => `${e.position} at ${e.company}`)
              .join("; ")
          : "";

      // Collect all skills
      const allSkills = data.skills
        .flatMap((s) => s.items)
        .filter(Boolean)
        .slice(0, 8);

      const res = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: p.fullName,
          jobTitle: p.jobTitle,
          experience: experienceText,
          skills: allSkills,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to generate");
      }

      setPersonal({ summary: result.summary });
      toast.success("✨ Summary generated!", { id: toastId });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to generate summary", {
        id: toastId,
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            className={inputClass("fullName")}
            placeholder="Enter your full name"
            value={p.fullName}
            onChange={(e) => setPersonal({ fullName: e.target.value })}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Job Title <span className="text-red-500">*</span>
          </label>
          <AutocompleteInput
            value={p.jobTitle}
            onChange={(value) => setPersonal({ jobTitle: value })}
            suggestions={JOB_TITLES}
            placeholder="Start typing your job title..."
            error={errors.jobTitle}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className={inputClass("email")}
            placeholder="Enter your email address"
            value={p.email}
            onChange={(e) => setPersonal({ email: e.target.value })}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            className={inputClass("phone")}
            placeholder="10-digit mobile number"
            value={p.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 10);
              setPersonal({ phone: value });
            }}
          />
          {p.phone && p.phone.length > 0 && p.phone.length < 10 && (
            <p className="text-xs text-amber-600 mt-1">
              {10 - p.phone.length} more digit
              {10 - p.phone.length !== 1 ? "s" : ""} required
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Location
          </label>
          <AutocompleteInput
            value={p.location}
            onChange={(value) => setPersonal({ location: value })}
            suggestions={CITIES}
            placeholder="Start typing city..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Website
          </label>
          <input
            className={inputClass("website")}
            placeholder="yourportfolio.com"
            value={p.website}
            onChange={(e) => setPersonal({ website: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            LinkedIn
          </label>
          <input
            className={inputClass("linkedin")}
            placeholder="linkedin.com/in/yourusername"
            value={p.linkedin}
            onChange={(e) => setPersonal({ linkedin: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            GitHub
          </label>
          <input
            className={inputClass("github")}
            placeholder="github.com/yourusername"
            value={p.github}
            onChange={(e) => setPersonal({ github: e.target.value })}
          />
        </div>
      </div>

      {/* Professional Summary with AI */}
      <div>
        <div className="mb-1.5">
  <label className="block text-sm font-medium text-slate-700">
    Professional Summary
  </label>
</div>
        <textarea
          rows={4}
          className={`${inputClass("summary")} resize-none`}
          placeholder="Write a brief 2-3 sentence summary about your experience, skills, and what makes you unique... Or click 'Generate Summary' to let AI write it for you."
          value={p.summary}
          onChange={(e) => setPersonal({ summary: e.target.value })}
        />
        <p className="text-xs text-slate-400 mt-1.5">
          💡 Tip: Fill Job Title first, then let AI generate a professional
          summary in seconds.
        </p>
      </div>
    </div>
  );
}
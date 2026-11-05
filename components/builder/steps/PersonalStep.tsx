"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useResumeStore } from "@/lib/resumeStore";
import { JOB_TITLES, CITIES } from "@/lib/data/suggestions-db";
import AutocompleteInput from "@/components/ui/autocomplete-input";
import { Sparkles, Loader2, Lightbulb, Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PersonalStepProps {
  errors?: Record<string, string>;
}

export default function PersonalStep({ errors = {} }: PersonalStepProps) {
  const { data, setPersonal } = useResumeStore();
  const p = data.personal;
  const [isGenerating, setIsGenerating] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

  const inputClass = (field: string) =>
    `w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-4 transition-all ${
      errors[field]
        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
        : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
    }`;

  // 🚀 AI Summary Generator Logic
  const handleAISummary = async () => {
    if (!p.jobTitle) {
      return toast.error("Please enter a Job Title first so AI can understand your role.");
    }

    setIsGenerating(true);
    try {
      // Skills collect karna AI ko context dene ke liye
      const allSkills = data.skills.flatMap((s) => s.items).filter(Boolean);

      const res = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: p.fullName,
          jobTitle: p.jobTitle,
          experience: p.summary, // Existing draft as context
          skills: allSkills,
        }),
      });

      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.error || "Failed to generate summary");
      }

      setPersonal({ summary: result.summary });
      toast.success("AI Summary generated successfully! ✨");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };


    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPersonal({ photoUrl: reader.result as string });
      setIsUploading(false);
      toast.success("Photo uploaded!");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
            {/* 🚀 Profile Photo Upload 🚀 */}
      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 mb-4">
        <div className="relative w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm shrink-0">
          {p.photoUrl ? (
            <img src={p.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <Camera className="w-8 h-8 text-slate-400" />
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">Profile Photo (Optional)</label>
          <p className="text-xs text-slate-500 mb-2">Upload a professional headshot (Max 2MB).</p>
          
          <div className="flex gap-2">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors">
              <Camera className="w-3.5 h-3.5" />
              {isUploading ? "Uploading..." : "Upload Photo"}
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
            
            {p.photoUrl && (
              <button
                type="button"
                onClick={() => setPersonal({ photoUrl: "" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Remove
              </button>
            )}
          </div>
        </div>
      </div>
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

      {/* 🚀 Professional Summary Section 🚀 */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Professional Summary
          </label>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAISummary}
            disabled={isGenerating}
            className="h-7 px-2.5 text-xs text-purple-700 bg-purple-50 border-purple-200 hover:bg-purple-100 hover:text-purple-800 transition-all gap-1.5 shadow-sm"
          >
            {isGenerating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            {isGenerating ? "Generating..." : "Write with AI"}
          </Button>
        </div>

        <textarea
          rows={4}
          style={{
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            whiteSpace: "pre-wrap",
          }}
          className={`${inputClass("summary")} resize-none`}
          placeholder="Write a brief 2-3 sentence summary about your experience, skills, and what makes you unique..."
          value={p.summary}
          onChange={(e) => setPersonal({ summary: e.target.value })}
        />
        <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
          💡 Tip: Write a rough draft or fill Job Title, then click{" "}
          <strong className="text-purple-600 font-medium">Write with AI</strong>.
        </p>
      </div>
    </div>
  );
}
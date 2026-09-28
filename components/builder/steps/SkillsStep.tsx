"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useResumeStore, type Skill } from "@/lib/resumeStore";
import { Plus, Trash2, Sparkles } from "lucide-react";
import SkillsInput from "@/components/ui/skills-input";
// import AIButton from "@/components/builder/AIButton";

interface SkillsStepProps {
  errors?: Record<string, string>;
}

export default function SkillsStep({ errors = {} }: SkillsStepProps) {
  const { data, addSkill, updateSkill, removeSkill, setSkills } =
    useResumeStore();
  const [suggesting, setSuggesting] = useState(false);

  // ─── AI Skill Suggester ───
  const handleSuggestSkills = async () => {
    const jobTitle = data.personal.jobTitle;

    if (!jobTitle || jobTitle.trim().length < 2) {
      toast.error("Please fill Job Title in Personal Info step first");
      return;
    }

    setSuggesting(true);
    const toastId = toast.loading(`✨ Suggesting skills for "${jobTitle}"...`);

    try {
      const res = await fetch("/api/ai/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to suggest skills");
      }

      const suggestedSkills: string[] = result.skills || [];

      if (suggestedSkills.length === 0) {
        throw new Error("No skills found");
      }

      // Create new category with AI suggested skills
      const newCategory: Skill = {
        _id: Math.random().toString(36).slice(2),
        category: `AI Suggested for ${jobTitle}`,
        items: suggestedSkills,
      };

      setSkills([...data.skills, newCategory]);

      toast.success(
        `✨ Added ${suggestedSkills.length} skills for "${jobTitle}"!`,
        { id: toastId }
      );
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to suggest skills", {
        id: toastId,
      });
    } finally {
      setSuggesting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* AI Suggest Banner */}

      {data.skills.length === 0 && (
        <div className="text-center py-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-500 mb-4">
            No skill categories yet
          </p>
          <button
            onClick={addSkill}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Skill Category Manually
          </button>
        </div>
      )}

      {data.skills.map((skill, index) => (
        <div
          key={skill._id}
          className="bg-slate-50 rounded-2xl p-4 border border-slate-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <input
              className={`flex-1 px-3 py-2 bg-white border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 transition-all ${
                errors[`skill-${index}-category`]
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
              }`}
              placeholder="Category (e.g., Frontend, Backend, Tools)"
              value={skill.category}
              onChange={(e) =>
                updateSkill(skill._id, { category: e.target.value })
              }
            />
            <button
              onClick={() => removeSkill(skill._id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <SkillsInput
            skills={skill.items.filter(Boolean)}
            onChange={(items) => updateSkill(skill._id, { items })}
            placeholder="e.g., React, Node.js, MongoDB..."
          />
        </div>
      ))}

      {data.skills.length > 0 && (
        <button
          onClick={addSkill}
          className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add another category
        </button>
      )}
    </div>
  );
}
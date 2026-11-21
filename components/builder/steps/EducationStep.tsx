"use client";

import { useResumeStore } from "@/lib/resumeStore";
import { Plus, Trash2 } from "lucide-react";
import AutocompleteInput from "@/components/ui/autocomplete-input";
import {
  DEGREE_SUGGESTIONS,
  FIELD_SUGGESTIONS,
  INSTITUTION_SUGGESTIONS,
} from "@/lib/data/suggestions-db";

interface EducationStepProps {
  errors?: Record<string, string>;
}

export default function EducationStep({ errors = {} }: EducationStepProps) {
  const { data, addEducation, updateEducation, removeEducation } =
    useResumeStore();

  // 🎯 Common Input Class
  const inputClass = "w-full px-3 py-2 bg-background text-foreground border border-input rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground [color-scheme:light] dark:[color-scheme:dark]";

  return (
    <div className="space-y-4">
      {data.education.length === 0 && (
        <div className="text-center py-8 bg-muted/50 border-2 border-dashed border-border rounded-2xl transition-colors">
          <p className="text-sm text-muted-foreground mb-4">No education added yet</p>
          <button
            onClick={addEducation}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </button>
        </div>
      )}

      {data.education.map((edu, index) => (
        <div
          key={edu._id}
          // 🎯 Card background fixed
          className="bg-card text-card-foreground rounded-2xl p-4 border border-border transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Education {index + 1}
            </span>
            <button
              onClick={() => removeEducation(edu._id!)}
              className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Institution *
              </label>
              <AutocompleteInput
                value={edu.institution}
                onChange={(value) =>
                  updateEducation(edu._id!, { institution: value })
                }
                suggestions={INSTITUTION_SUGGESTIONS}
                placeholder="Delhi University"
                error={errors[`edu-${index}-institution`]}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Degree *
              </label>
              <AutocompleteInput
                value={edu.degree}
                onChange={(value) =>
                  updateEducation(edu._id!, { degree: value })
                }
                suggestions={DEGREE_SUGGESTIONS}
                placeholder="B.Tech"
                error={errors[`edu-${index}-degree`]}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Field of Study
              </label>
              <AutocompleteInput
                value={edu.field}
                onChange={(value) =>
                  updateEducation(edu._id!, { field: value })
                }
                suggestions={FIELD_SUGGESTIONS}
                placeholder="Computer Science"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Grade / CGPA
              </label>
              <input
                className={inputClass}
                placeholder="8.5 CGPA"
                value={edu.grade}
                onChange={(e) =>
                  updateEducation(edu._id!, { grade: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Start Date
              </label>
              <input
                type="month"
                className={inputClass}
                value={edu.startDate}
                onChange={(e) =>
                  updateEducation(edu._id!, { startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                End Date
              </label>
              <input
                type="month"
                className={inputClass}
                value={edu.endDate}
                onChange={(e) =>
                  updateEducation(edu._id!, { endDate: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      ))}

      {data.education.length > 0 && (
        <button
          onClick={addEducation}
          className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add another education
        </button>
      )}
    </div>
  );
}
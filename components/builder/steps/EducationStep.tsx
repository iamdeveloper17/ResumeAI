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

  return (
    <div className="space-y-4">
      {data.education.length === 0 && (
        <div className="text-center py-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-500 mb-4">No education added yet</p>
          <button
            onClick={addEducation}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </button>
        </div>
      )}

      {data.education.map((edu, index) => (
        <div
          key={edu._id}
          className="bg-slate-50 rounded-2xl p-4 border border-slate-200"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Education {index + 1}
            </span>
            <button
              onClick={() => removeEducation(edu._id!)}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
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
              <label className="block text-xs font-medium text-slate-600 mb-1">
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
              <label className="block text-xs font-medium text-slate-600 mb-1">
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
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Grade / CGPA
              </label>
              <input
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
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
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Start Date
              </label>
              <input
                type="month"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                value={edu.startDate}
                onChange={(e) =>
                  updateEducation(edu._id!, { startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                End Date
              </label>
              <input
                type="month"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
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
          className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add another education
        </button>
      )}
    </div>
  );
}
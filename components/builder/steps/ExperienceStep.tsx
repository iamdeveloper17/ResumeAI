"use client";

import { useResumeStore } from "@/lib/resumeStore";
import { Plus, Trash2, X } from "lucide-react";
import AutocompleteInput from "@/components/ui/autocomplete-input";
import {
  CITIES,
  JOB_TITLES,
  COMPANIES,
} from "@/lib/data/suggestions-db";

interface ExperienceStepProps {
  errors?: Record<string, string>;
}

export default function ExperienceStep({ errors = {} }: ExperienceStepProps) {
  const {
    data,
    addExperience,
    updateExperience,
    removeExperience,
    addBullet,
    updateBullet,
    removeBullet,
  } = useResumeStore();

  const inputClass = (field: string) =>
    `w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
        : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
    }`;

  return (
    <div className="space-y-4">
      {data.experience.length === 0 && (
        <div className="text-center py-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-500 mb-4">
            No work experience added yet
          </p>
          <button
            onClick={addExperience}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Work Experience
          </button>
        </div>
      )}

      {data.experience.map((exp, index) => (
        <div
          key={exp._id}
          className="bg-slate-50 rounded-2xl p-4 border border-slate-200"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Experience {index + 1}
            </span>
            <button
              onClick={() => removeExperience(exp._id!)}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Company *
              </label>
              <AutocompleteInput
                value={exp.company}
                onChange={(value) =>
                  updateExperience(exp._id!, { company: value })
                }
                suggestions={COMPANIES}
                placeholder="Start typing company..."
                error={errors[`exp-${index}-company`]}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Position *
              </label>
              <AutocompleteInput
                value={exp.position}
                onChange={(value) =>
                  updateExperience(exp._id!, { position: value })
                }
                suggestions={JOB_TITLES}
                placeholder="Start typing position..."
                error={errors[`exp-${index}-position`]}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Location
              </label>
              <AutocompleteInput
                value={exp.location}
                onChange={(value) =>
                  updateExperience(exp._id!, { location: value })
                }
                suggestions={CITIES}
                placeholder="Start typing city..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Start Date
              </label>
              <input
                type="month"
                className={inputClass("")}
                value={exp.startDate}
                onChange={(e) =>
                  updateExperience(exp._id!, { startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                End Date
              </label>
              <input
                type="month"
                className={`${inputClass("")} disabled:opacity-50`}
                value={exp.endDate}
                disabled={exp.current}
                onChange={(e) =>
                  updateExperience(exp._id!, { endDate: e.target.value })
                }
              />
            </div>
          </div>

          <label className="flex items-center gap-2 mb-3 text-sm text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) =>
                updateExperience(exp._id!, {
                  current: e.target.checked,
                  endDate: e.target.checked ? "" : exp.endDate,
                })
              }
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            I currently work here
          </label>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2">
              Key Achievements
            </label>
            <div className="space-y-2">
              {exp.bullets.map((bullet, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className={`${inputClass("")} flex-1`}
                    placeholder="Built a feature that increased engagement by 30%"
                    value={bullet}
                    onChange={(e) =>
                      updateBullet(exp._id!, i, e.target.value)
                    }
                  />
                  {exp.bullets.length > 1 && (
                    <button
                      onClick={() => removeBullet(exp._id!, i)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => addBullet(exp._id!)}
              className="mt-2 text-xs text-blue-600 font-medium hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add another bullet
            </button>
          </div>
        </div>
      ))}

      {data.experience.length > 0 && (
        <button
          onClick={addExperience}
          className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add another experience
        </button>
      )}
    </div>
  );
}
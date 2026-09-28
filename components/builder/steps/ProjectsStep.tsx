"use client";

import { useResumeStore } from "@/lib/resumeStore";
import { Plus, Trash2 } from "lucide-react";
import SkillsInput from "@/components/ui/skills-input";

interface ProjectsStepProps {
  errors?: Record<string, string>;
}

export default function ProjectsStep({ errors = {} }: ProjectsStepProps) {
  const { data, addProject, updateProject, removeProject } = useResumeStore();

  return (
    <div className="space-y-4">
      {data.projects.length === 0 && (
        <div className="text-center py-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-500 mb-1">No projects added yet</p>
          <p className="text-xs text-slate-400 mb-4">
            Projects are optional but highly recommended for freshers
          </p>
          <button
            onClick={addProject}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>
      )}

      {data.projects.map((project, index) => (
        <div
          key={project._id}
          className="bg-slate-50 rounded-2xl p-4 border border-slate-200"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Project {index + 1}
            </span>
            <button
              onClick={() => removeProject(project._id)}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Project Name
              </label>
              <input
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                placeholder="E-commerce App"
                value={project.name}
                onChange={(e) =>
                  updateProject(project._id, { name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                placeholder="A full-stack e-commerce platform with payment integration..."
                value={project.description}
                onChange={(e) =>
                  updateProject(project._id, { description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Tech Stack
              </label>
              <SkillsInput
                skills={project.techStack.filter(Boolean)}
                onChange={(techStack) =>
                  updateProject(project._id, { techStack })
                }
                placeholder="e.g., React, Node.js, MongoDB..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Link (optional)
              </label>
              <input
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                placeholder="github.com/username/project"
                value={project.link}
                onChange={(e) =>
                  updateProject(project._id, { link: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      ))}

      {data.projects.length > 0 && (
        <button
          onClick={addProject}
          className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add another project
        </button>
      )}
    </div>
  );
}
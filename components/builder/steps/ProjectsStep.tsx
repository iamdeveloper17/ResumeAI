"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/resumeStore";
import { Plus, Trash2, Sparkles, Loader2 } from "lucide-react";
import SkillsInput from "@/components/ui/skills-input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProjectsStepProps {
  errors?: Record<string, string>;
}

export default function ProjectsStep({ errors = {} }: ProjectsStepProps) {
  const { data, addProject, updateProject, removeProject } = useResumeStore();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAIDescription = async (project: any) => {
    if (!project.name) {
      return toast.error("Please enter a Project Name first");
    }

    setLoadingId(project._id!);
    try {
      const res = await fetch("/api/ai/project-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: project.name,
          techStack: project.techStack,
          draft: project.description,
          jobTitle: data.personal.jobTitle,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      updateProject(project._id!, { description: result.description });
      toast.success("Description enhanced by AI! ✨");
    } catch (err: any) {
      toast.error(err.message || "Failed to generate description");
    } finally {
      setLoadingId(null);
    }
  };

  // 🎯 Theme-aware input classes
  const inputClass = "w-full px-3 py-2 bg-background text-foreground border border-input rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground";

  return (
    <div className="space-y-4">
      {data.projects.length === 0 && (
        <div className="text-center py-8 bg-muted/50 border-2 border-dashed border-border rounded-2xl transition-colors">
          <p className="text-sm text-muted-foreground mb-1">No projects added yet</p>
          <p className="text-xs text-muted-foreground/70 mb-4">
            Projects are optional but highly recommended for freshers
          </p>
          <button
            onClick={addProject}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>
      )}

      {data.projects.map((project, index) => (
        <div
          key={project._id}
          // 🎯 Card background fixed
          className="bg-card text-card-foreground rounded-2xl p-4 border border-border transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Project {index + 1}
            </span>
            <button
              onClick={() => removeProject(project._id!)}
              className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Project Name
              </label>
              <input
                className={inputClass}
                placeholder="E-commerce App"
                value={project.name}
                onChange={(e) =>
                  updateProject(project._id!, { name: e.target.value })
                }
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-foreground">
                  Description
                </label>
                {/* 🚀 AI Button - dark mode fixed */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAIDescription(project)}
                  disabled={loadingId === project._id}
                  className="h-6 px-2 text-[10px] text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 gap-1 transition-colors"
                >
                  {loadingId === project._id ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  {loadingId === project._id ? "Writing..." : "Write with AI"}
                </Button>
              </div>
              <textarea
                rows={3}
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  whiteSpace: "pre-wrap",
                }}
                className={`${inputClass} resize-none`}
                placeholder="A full-stack e-commerce platform with payment integration..."
                value={project.description}
                onChange={(e) =>
                  updateProject(project._id!, { description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Tech Stack
              </label>
              <SkillsInput
                skills={project.techStack.filter(Boolean)}
                onChange={(techStack) =>
                  updateProject(project._id!, { techStack })
                }
                placeholder="e.g., React, Node.js, MongoDB..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Link (optional)
              </label>
              <input
                className={inputClass}
                placeholder="github.com/username/project"
                value={project.link}
                onChange={(e) =>
                  updateProject(project._id!, { link: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      ))}

      {data.projects.length > 0 && (
        <button
          onClick={addProject}
          // 🎯 Dashed button fixed
          className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add another project
        </button>
      )}
    </div>
  );
}
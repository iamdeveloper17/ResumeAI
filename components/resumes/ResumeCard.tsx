"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  FileText,
  Trash2,
  Copy,
  MoreVertical,
  ExternalLink,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Resume {
  _id: string;
  title: string;
  template: "modern" | "classic";
  accentColor: string;
  personal?: {
    fullName?: string;
    jobTitle?: string;
  };
  updatedAt: string;
  createdAt: string;
}

interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
}

export default function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [duplicating, setDuplicating] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${resume.title}"? This cannot be undone.`)) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/resumes/${resume._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("Resume deleted");
      onDelete(resume._id);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete");
    } finally {
      setDeleting(false);
      setMenuOpen(false);
    }
  };

  const handleDuplicate = async () => {
    setDuplicating(true);
    try {
      // Create new resume
      const createRes = await fetch("/api/resumes", {
        method: "POST",
      });

      if (!createRes.ok) throw new Error("Failed to duplicate");

      const { resume: newResume } = await createRes.json();

      // Copy data from old to new
      const updateRes = await fetch(`/api/resumes/${newResume._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${resume.title} (Copy)`,
          template: resume.template,
          accentColor: resume.accentColor,
          personal: resume.personal,
        }),
      });

      if (!updateRes.ok) throw new Error("Failed to duplicate");

      toast.success("Resume duplicated!");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to duplicate");
    } finally {
      setDuplicating(false);
      setMenuOpen(false);
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const displayName = resume.personal?.fullName || "Untitled";
  const displayRole = resume.personal?.jobTitle || "No title";

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all overflow-hidden">
      {/* Preview top bar (colored) */}
      <div
        className="h-2 transition-all"
        style={{ backgroundColor: resume.accentColor }}
      />

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>

          {/* Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(!menuOpen);
              }}
              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100"
            >
              <MoreVertical className="w-4 h-4 text-slate-600" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-8 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  <button
                    onClick={handleDuplicate}
                    disabled={duplicating}
                    className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {duplicating ? "Duplicating..." : "Duplicate"}
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <Link href={`/build/${resume._id}`}>
          <h3 className="font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors mb-1">
            {resume.title}
          </h3>
          <p className="text-xs text-slate-500 truncate mb-1">
            {displayName} · {displayRole}
          </p>
        </Link>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(resume.updatedAt)}
            </span>
            <span className="capitalize">{resume.template}</span>
          </div>

          <Link
            href={`/build/${resume._id}`}
            className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
          >
            Edit
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
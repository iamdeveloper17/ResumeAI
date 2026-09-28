"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Plus, FileText, Search } from "lucide-react";
import ResumeCard from "@/components/resumes/ResumeCard";

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

export default function ResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadResumes = async () => {
    try {
      const res = await fetch("/api/resumes");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setResumes(data.resumes || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load resumes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((r) => r._id !== id));
  };

  const filtered = resumes.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.personal?.fullName?.toLowerCase().includes(q) ||
      r.personal?.jobTitle?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Resumes</h1>
          <p className="text-sm text-slate-500 mt-1">
            {resumes.length} resume{resumes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/resumes/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Resume</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>

      {/* Search */}
      {resumes.length > 0 && (
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            placeholder="Search resumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* Loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
            >
              <div className="h-2 bg-slate-100 animate-pulse" />
              <div className="p-5 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-slate-100 mb-3" />
                <div className="h-4 w-3/4 bg-slate-100 rounded mb-2" />
                <div className="h-3 w-1/2 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        // Empty state
        <div className="bg-white rounded-2xl border border-slate-200 py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">
            {search ? "No resumes found" : "No resumes yet"}
          </h3>
          <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto px-4">
            {search
              ? "Try a different search term"
              : "Create your first AI-powered resume and start applying for jobs today."}
          </p>
          {!search && (
            <Link
              href="/resumes/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30"
            >
              <Plus className="w-4 h-4" />
              Create your first resume
            </Link>
          )}
        </div>
      ) : (
        // Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((resume) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
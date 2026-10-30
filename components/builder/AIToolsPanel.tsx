// components/builder/AIToolsPanel.tsx
"use client";
import { useState } from "react";
import { useResumeStore } from "@/lib/resumeStore";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, Target, Loader2, Copy, Check, X, Briefcase } from "lucide-react";
import { toast } from "sonner";

export function AIToolsPanel() {
  const { data, setData } = useResumeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [jd, setJd] = useState(data.jobDescription || "");
  const [loadingJd, setLoadingJd] = useState(false);
  const [loadingCl, setLoadingCl] = useState(false);
  const [coverLetter, setCoverLetter] = useState(data.coverLetter || "");
  const [copied, setCopied] = useState(false);

  const handleJDMatch = async () => {
    if (!jd) return toast.error("Please paste Job Description first");
    setLoadingJd(true);
    try {
      const res = await fetch("/api/ai/jd-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: data, jobDescription: jd }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      
      setData({ 
        jobDescription: jd,
        personal: { ...data.personal, summary: result.result.improvedSummary } 
      });
      toast.success("Resume optimized for JD! 🎯");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingJd(false);
    }
  };

  const handleCoverLetter = async () => {
    if (!jd) return toast.error("Please paste Job Description first");
    setLoadingCl(true);
    try {
      const res = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: data, jobDescription: jd }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      
      setCoverLetter(result.coverLetter);
      setData({ coverLetter: result.coverLetter });
      toast.success("Cover Letter Generated! 📄");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingCl(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* 🚀 HEADER BUTTON 🚀 */}
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/30 h-10 px-4 rounded-xl text-sm font-semibold"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        Optimize with AI
      </Button>

      {/* 🚀 POPUP MODAL 🚀 */}
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-slate-900">AI Job Matcher</h2>
                  <p className="text-xs text-slate-500">Paste JD to optimize resume & generate cover letter</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Job Description (JD)</label>
                <textarea
                  placeholder="Paste the full job description here..."
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm h-32 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none resize-none bg-slate-50"
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleJDMatch} 
                  disabled={loadingJd || loadingCl} 
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white h-11"
                >
                  {loadingJd ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Target className="w-4 h-4 mr-2" />}
                  Optimize Resume
                </Button>
                
                <Button 
                  onClick={handleCoverLetter} 
                  disabled={loadingJd || loadingCl} 
                  variant="outline" 
                  className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 h-11"
                >
                  {loadingCl ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
                  Generate Cover Letter
                </Button>
              </div>

              {coverLetter && (
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <div className="flex items-center justify-between p-3 bg-slate-50 border-b border-slate-200">
                    <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Generated Cover Letter
                    </span>
                    <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 text-xs hover:bg-white">
                      {copied ? <Check className="w-3 h-3 mr-1 text-green-500" /> : <Copy className="w-3 h-3 mr-1" />}
                      {copied ? "Copied" : "Copy Text"}
                    </Button>
                  </div>
                  <div className="p-4 max-h-60 overflow-y-auto">
                    <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {coverLetter}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
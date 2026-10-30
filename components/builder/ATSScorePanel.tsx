// components/builder/ATSScorePanel.tsx
"use client";

import { useState } from "react";
import { ScoreGauge } from "@/components/ui/score-gauge";
import type { ATSResult } from "@/lib/ats/types";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Sparkles,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

interface ATSScorePanelProps {
  resumeData: any;
}

export function ATSScorePanel({ resumeData }: ATSScorePanelProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);

  async function checkScore() {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: resumeData }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to check score");
      }

      const data: ATSResult = await res.json();
      setResult(data);
      toast.success(`ATS Score: ${data.overallScore}/100`);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  const getSeverityIcon = (severity: string) => {
    if (severity === "critical")
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (severity === "warning")
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    return <Info className="w-4 h-4 text-blue-500" />;
  };

  const getGradeColor = (grade: string) => {
    if (grade === "A") return "text-green-600 bg-green-50";
    if (grade === "B") return "text-blue-600 bg-blue-50";
    if (grade === "C") return "text-yellow-600 bg-yellow-50";
    if (grade === "D") return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="space-y-4 w-full">
      {/* 🚀 Button: Agar result nahi hai toh check button dikhao 🚀 */}
      {!result && (
        <Button
          onClick={checkScore}
          disabled={loading}
          className="w-full gap-2 h-12 text-base bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Check ATS Score
            </>
          )}
        </Button>
      )}

      {/* 🚀 Results: Agar result aa gaya toh ye 2-column layout dikhao 🚀 */}
      {result && (
        <div className="w-full space-y-6 pt-2">
          
          {/* TOP: Score Card */}
          <div className="w-full bg-linear-to-br from-white to-slate-50 rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left: Gauge */}
            <div className="flex flex-col items-center gap-3">
              <ScoreGauge score={result.overallScore} />
              <div
                className={`px-4 py-1 rounded-full text-sm font-bold ${getGradeColor(
                  result.grade
                )}`}
              >
                Grade: {result.grade}
              </div>
            </div>

            {/* Right: Insights & Categories */}
            <div className="flex-1 w-full space-y-4">
              {result.aiInsights && (
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-purple-900 leading-relaxed">
                    {result.aiInsights}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {result.categories.map((cat) => {
                  const pct = Math.round((cat.score / cat.maxScore) * 100);
                  return (
                    <div key={cat.name} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-semibold text-slate-700">{cat.name}</span>
                        <span className="text-slate-500 font-medium">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            pct >= 80 ? "bg-green-500" : pct >= 60 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* BOTTOM: Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Strengths */}
            {result.topStrengths.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> Strengths
                </h3>
                <ul className="space-y-2">
                  {result.topStrengths.map((s, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2 bg-green-50/50 p-2 rounded-lg">
                      <span className="text-green-600 mt-0.5">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvements */}
            {result.topSuggestions.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-slate-900">
                  <TrendingUp className="w-4 h-4 text-orange-600" /> Improvements
                </h3>
                <ul className="space-y-2">
                  {result.topSuggestions.map((s, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2 bg-orange-50/50 p-2 rounded-lg">
                      <span className="text-orange-600 mt-0.5">→</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* FULL WIDTH: Issues & Errors */}
          {(result.allIssues.length > 0 || (result.missingKeywords && result.missingKeywords.length > 0)) && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm w-full">
              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Detailed Report</h3>
              
              {/* Missing Keywords */}
              {result.missingKeywords && result.missingKeywords.length > 0 && (
                <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-100">
                  <h4 className="text-xs font-bold mb-2 flex items-center gap-2 text-red-700 uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" /> Missing Keywords (JD Match)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-red-200 text-red-600 rounded-full text-xs font-medium shadow-sm">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Formatting Errors */}
              {result.formattingErrors && result.formattingErrors.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-bold mb-2 flex items-center gap-2 text-orange-600 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" /> Formatting Errors
                  </h4>
                  <ul className="space-y-1">
                    {result.formattingErrors.map((err, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span> {err}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* All Issues */}
              {result.allIssues.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {result.allIssues.map((issue) => (
                    <div key={issue.id} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                      <div className="mt-0.5">{getSeverityIcon(issue.severity)}</div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{issue.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{issue.suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
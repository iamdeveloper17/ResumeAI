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
    <div className="space-y-4">
      <Button
        onClick={checkScore}
        disabled={loading}
        className="w-full gap-2"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Check ATS Score
          </>
        )}
      </Button>

      {result && (
        <div className="space-y-6 p-6 bg-white rounded-lg border shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <ScoreGauge score={result.overallScore} />
            <div
              className={`px-4 py-1 rounded-full text-sm font-semibold ${getGradeColor(
                result.grade
              )}`}
            >
              Grade: {result.grade}
            </div>
          </div>

          {result.aiInsights && (
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-purple-900 mb-1">
                    AI Insight
                  </p>
                  <p className="text-sm text-purple-800">{result.aiInsights}</p>
                </div>
              </div>
            </div>
          )}

          {result.topStrengths.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Strengths
              </h3>
              <ul className="space-y-1">
                {result.topStrengths.map((s, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-700 flex items-start gap-2"
                  >
                    <span className="text-green-600 mt-1">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold mb-3">Category Breakdown</h3>
            <div className="space-y-3">
              {result.categories.map((cat) => {
                const pct = Math.round((cat.score / cat.maxScore) * 100);
                return (
                  <div key={cat.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">{cat.name}</span>
                      <span className="text-gray-500">
                        {cat.score}/{cat.maxScore} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          pct >= 80
                            ? "bg-green-500"
                            : pct >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {result.topSuggestions.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                Top Improvements
              </h3>
              <ul className="space-y-2">
                {result.topSuggestions.map((s, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-700 flex items-start gap-2"
                  >
                    <span className="text-orange-600 mt-1">→</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.allIssues.length > 0 && (
            <details className="text-sm">
              <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
                View all {result.allIssues.length} issues
              </summary>
              <ul className="mt-3 space-y-2">
                {result.allIssues.map((issue) => (
                  <li
                    key={issue.id}
                    className="flex items-start gap-2 p-2 bg-gray-50 rounded"
                  >
                    {getSeverityIcon(issue.severity)}
                    <div>
                      <p className="font-medium text-gray-800">
                        {issue.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {issue.suggestion}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
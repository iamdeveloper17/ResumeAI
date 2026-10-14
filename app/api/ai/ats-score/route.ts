// app/api/ai/ats-score/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/lib/auth";
import { calculateATSScore } from "@/lib/ats/scorer";
import type { ResumeData } from "@/lib/ats/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resume } = (await req.json()) as { resume: ResumeData };
    if (!resume) {
      return NextResponse.json(
        { error: "Resume data required" },
        { status: 400 }
      );
    }

    // Rule-based scoring
    const ruleResult = calculateATSScore(resume);

    // AI insights (optional — fail-safe)
    let aiInsights: string | undefined;
    try {
      aiInsights = await getAIInsights(resume, ruleResult);
    } catch (error) {
      console.error("AI insights failed (non-fatal):", error);
    }

    return NextResponse.json({
      ...ruleResult,
      aiInsights,
    });
  } catch (error) {
    console.error("ATS score error:", error);
    return NextResponse.json(
      { error: "Failed to calculate ATS score" },
      { status: 500 }
    );
  }
}

async function getAIInsights(
  resume: ResumeData,
  ruleResult: ReturnType<typeof calculateATSScore>
): Promise<string> {
  const prompt = `You are an ATS (Applicant Tracking System) expert and career coach.

Resume data:
${JSON.stringify(resume, null, 2)}

Rule-based ATS score: ${ruleResult.overallScore}/100
Issues found: ${ruleResult.allIssues.map((i) => i.message).join(", ")}

Provide a SHORT, actionable 2-3 sentence insight (max 60 words) that:
1. Acknowledges the biggest strength
2. Points out the single most impactful improvement
3. Gives one industry-specific tip

Do NOT repeat the score. Be direct, specific, encouraging. Return only the insight text, no JSON.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text?.trim() || "";
}
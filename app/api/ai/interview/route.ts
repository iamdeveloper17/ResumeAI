import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const MODEL_NAME = "gemini-flash-latest";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action, jobTitle, resumeData, question, answer } = await req.json();

    if (action === "generate_questions") {
      const prompt = `You are an expert technical interviewer. Generate 3 interview questions for a "${jobTitle}" role based on this resume data: ${JSON.stringify(resumeData)}.
Output format: ONLY a JSON array of strings, like this: ["Question 1?", "Question 2?", "Question 3?"]. No markdown, no extra text.`;

      const interaction = await ai.interactions.create({
        model: MODEL_NAME,
        input: prompt,
      });
      let text = interaction.output_text || "[]";
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const questions = JSON.parse(text);
      return NextResponse.json({ questions });
    }

    if (action === "evaluate_answer") {
      const prompt = `You are an expert interviewer. Evaluate the candidate's answer.
Question: "${question}"
Answer: "${answer}"
Give a short, constructive feedback (max 3 sentences) on what was good and how to improve. Be professional. Do not say "As an AI...".

Output format: ONLY plain text feedback.`;

      const interaction = await ai.interactions.create({
        model: MODEL_NAME,
        input: prompt,
      });
      return NextResponse.json({ feedback: interaction.output_text?.trim() });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("AI Interview error:", error);
    return NextResponse.json({ error: error.message || "Failed" }, { status: 500 });
  }
}
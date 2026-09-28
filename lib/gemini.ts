import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

const MODEL_NAME = "gemini-flash-latest";   // ← Ye auto-detect karega

// ─── AI Summary Generator ───
export async function generateSummary(
  fullName: string,
  jobTitle: string,
  experience: string,
  skills: string[]
): Promise<string> {
  const prompt = `You are a professional resume writer. Write a compelling professional summary for a resume.

Candidate details:
- Name: ${fullName || "Professional"}
- Target Role: ${jobTitle || "Software Developer"}
- Experience: ${experience || "Fresher / No experience yet"}
- Key Skills: ${skills.length > 0 ? skills.join(", ") : "General technical skills"}

Requirements:
- Write in FIRST PERSON without using "I" (e.g., "Full Stack Developer with 3+ years...")
- 2-3 sentences only (40-60 words total)
- Include: years of experience, key skills, biggest strength, what makes them unique
- Use strong action words and quantify if possible
- Professional tone, no fluff
- DO NOT add prefix like "Summary:" or "Professional Summary:"

Output ONLY the summary text, nothing else.`;

  try {
    const interaction = await ai.interactions.create({
      model: MODEL_NAME,
      input: prompt,
    });

    const text = interaction.output_text;
    if (!text) throw new Error("Empty response from Gemini");
    return text.trim();
  } catch (error: any) {
    console.error("Gemini generateSummary error:", error.message || error);
    throw new Error(error.message || "Failed to generate summary");
  }
}

// ─── AI Bullet Enhancer ───
export async function enhanceBullet(
  bullet: string,
  jobTitle: string
): Promise<string> {
  if (!bullet || bullet.trim().length < 3) {
    throw new Error("Bullet text too short to enhance");
  }

  const prompt = `You are a professional resume writer. Enhance this work experience bullet point to make it impactful.

Job Role: ${jobTitle || "Software Developer"}
Original Bullet: "${bullet}"

Requirements:
- Start with a strong action verb (Developed, Implemented, Led, Optimized, etc.)
- Add quantifiable metric if reasonable (percentage, time saved, users, revenue, etc.)
- 1 sentence, max 20-25 words
- Focus on IMPACT and RESULT, not just activity
- Use past tense
- Do NOT include bullet symbol (•, -, *)

Output ONLY the enhanced bullet point, nothing else.`;

  try {
    const interaction = await ai.interactions.create({
      model: MODEL_NAME,
      input: prompt,
    });

    const text = interaction.output_text;
    if (!text) throw new Error("Empty response from Gemini");
    return text.trim().replace(/^[•\-\*]\s*/, "");
  } catch (error: any) {
    console.error("Gemini enhanceBullet error:", error.message || error);
    throw new Error(error.message || "Failed to enhance bullet");
  }
}

// ─── AI Skill Suggester ───
export async function suggestSkills(jobTitle: string): Promise<string[]> {
  if (!jobTitle || jobTitle.trim().length < 2) {
    throw new Error("Job title required");
  }

  const prompt = `List the 10 most important technical and soft skills for a "${jobTitle}" role in 2026.

Requirements:
- Mix of technical and soft skills
- Industry-current and in-demand
- Most critical skills first

Output format: ONLY comma-separated list. Example: React, Node.js, MongoDB, TypeScript, Communication, Problem Solving

No numbering, no explanations, no bullet points.`;

  try {
    const interaction = await ai.interactions.create({
      model: MODEL_NAME,
      input: prompt,
    });

    const text = interaction.output_text;
    if (!text) throw new Error("Empty response from Gemini");

    return text
      .trim()
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 10);
  } catch (error: any) {
    console.error("Gemini suggestSkills error:", error.message || error);
    throw new Error(error.message || "Failed to suggest skills");
  }
}
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
  const prompt = `You are an expert resume writer. Write a professional summary for a resume based on these details:

- Target Role: ${jobTitle || "Software Developer"}
- Draft/Experience: ${experience || "Fresher / No experience yet"}
- Key Skills: ${skills.length > 0 ? skills.join(", ") : "General technical skills"}

CRITICAL RULES:
1. Write in FIRST PERSON but DO NOT use the word "I" (e.g., "Full Stack Developer with 2 years of experience building...", NOT "I am a...").
2. DO NOT use typical AI buzzwords like "Results-driven", "Passionate", "Dynamic", "Synergy". Make it sound human and natural.
3. Keep it short: Exactly 2 to 3 sentences (max 50 words).
4. Use the draft provided by the user as the base context (if draft is empty, write based on the Job Title and Skills).
5. Start with the Job Title.
6. Output ONLY the summary text, no extra quotes or prefixes.

Example of a GOOD output:
"Software Engineer with 2 years of experience developing scalable web applications using React and Node.js. Skilled in optimizing database queries and building responsive user interfaces, with a strong focus on clean code and seamless user experience."`;

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

// ─── AI JD Matcher (Resume Tailoring) ───
export async function matchJobDescription(
  resumeData: any,
  jobDescription: string
): Promise<string> {
  const prompt = `You are an expert ATS optimizer. Analyze this resume data and job description.
Identify missing keywords and suggest improvements for the summary and experience bullets to match the JD.

Resume Data: ${JSON.stringify(resumeData)}
Job Description: ${jobDescription}

Output format: Return a JSON string with the following structure:
{
  "missingKeywords": ["keyword1", "keyword2"],
  "improvedSummary": "New summary tailored to JD",
  "suggestions": ["Suggestion 1", "Suggestion 2"]
}
ONLY return valid JSON, no markdown formatting.`;

  try {
    const interaction = await ai.interactions.create({
      model: MODEL_NAME,
      input: prompt,
    });
    return interaction.output_text || "{}";
  } catch (error: any) {
    throw new Error("Failed to match JD");
  }
}

// ─── AI Cover Letter Generator ───
export async function generateCoverLetter(
  resumeData: any,
  jobDescription: string
): Promise<string> {
  const prompt = `Write a professional cover letter based on the following:
Resume: ${JSON.stringify(resumeData)}
Job Description: ${jobDescription}

Requirements:
- Keep it under 250 words.
- Address to "Hiring Manager".
- Highlight key achievements from the resume that match the JD.
- Output ONLY the cover letter text.`;

  try {
    const interaction = await ai.interactions.create({
      model: MODEL_NAME,
      input: prompt,
    });
    return interaction.output_text?.trim() || "";
  } catch (error: any) {
    throw new Error("Failed to generate cover letter");
  }
}
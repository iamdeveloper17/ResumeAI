import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",     // ← Latest model
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 800,
  },
});

export async function generateSummary(
  jobTitle: string,
  experience: string,
  skills: string[]
): Promise<string> {
  const prompt = `You are a professional resume writer. Generate a compelling 3-4 sentence professional summary for a ${jobTitle}.

Experience: ${experience}
Key skills: ${skills.join(", ")}

Requirements:
- Write in first person or third person (no "I")
- Focus on impact and achievements
- Use strong action words
- Keep it 50-80 words
- No bullet points, just one paragraph
- Don't include "Summary:" prefix

Output only the summary text, nothing else.`;

  const result = await geminiModel.generateContent(prompt);
  return result.response.text().trim();
}

export async function enhanceBullet(bullet: string, jobTitle: string): Promise<string> {
  const prompt = `You are a professional resume writer. Enhance this work experience bullet point for a ${jobTitle}:

Original: "${bullet}"

Requirements:
- Start with a strong action verb
- Add quantifiable metrics if possible (use realistic numbers like %, $, time saved)
- Keep it to one line (max 20 words)
- Focus on impact and results
- No bullet symbol prefix

Output only the enhanced bullet, nothing else.`;

  const result = await geminiModel.generateContent(prompt);
  return result.response.text().trim();
}

export async function suggestSkills(jobTitle: string): Promise<string[]> {
  const prompt = `List 10 essential technical and soft skills for a ${jobTitle} role in 2026.

Requirements:
- Mix of technical and soft skills
- Industry-relevant and current
- Most important first

Output format: comma-separated list only, no numbering, no explanations.
Example: React, Node.js, TypeScript, Communication`;

  const result = await geminiModel.generateContent(prompt);
  const text = result.response.text().trim();
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 10);
}

export async function generateCoverLetter(
  jobTitle: string,
  company: string,
  experience: string,
  skills: string[]
): Promise<string> {
  const prompt = `Write a professional cover letter for a ${jobTitle} position at ${company}.

Candidate background:
Experience: ${experience}
Skills: ${skills.join(", ")}

Requirements:
- 3 paragraphs (opening, body, closing)
- Professional but warm tone
- Highlight relevant experience
- Express genuine interest in the company
- 200-250 words total
- No placeholder brackets like [Your Name]
- End with "Sincerely,"

Output only the cover letter body (no header/address).`;

  const result = await geminiModel.generateContent(prompt);
  return result.response.text().trim();
}
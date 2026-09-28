import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateSummary } from "@/lib/gemini";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().optional(),
  jobTitle: z.string().min(1, "Job title required"),
  experience: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validated = schema.parse(body);

    const summary = await generateSummary(
      validated.fullName || "",
      validated.jobTitle,
      validated.experience || "",
      validated.skills || []
    );

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("AI summary error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to generate summary" },
      { status: 500 }
    );
  }
}
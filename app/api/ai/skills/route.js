import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { suggestSkills } from "@/lib/gemini";
import { z } from "zod";

const schema = z.object({
  jobTitle: z.string().min(2, "Job title required"),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validated = schema.parse(body);

    const skills = await suggestSkills(validated.jobTitle);

    return NextResponse.json({ skills });
  } catch (error: any) {
    console.error("AI skills error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to suggest skills" },
      { status: 500 }
    );
  }
}
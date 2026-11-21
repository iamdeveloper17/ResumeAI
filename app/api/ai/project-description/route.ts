import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateProjectDescription } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectName, techStack, draft, jobTitle } = await req.json();

    if (!projectName) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    const description = await generateProjectDescription(
      projectName,
      techStack || [],
      draft || "",
      jobTitle || "Software Engineer"
    );

    return NextResponse.json({ description });
  } catch (error: any) {
    console.error("❌ AI Project Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate description" },
      { status: 500 }
    );
  }
}
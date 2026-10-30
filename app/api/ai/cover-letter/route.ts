import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateCoverLetter } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const { resumeData, jobDescription } = await req.json();
    const result = await generateCoverLetter(resumeData, jobDescription);
    return NextResponse.json({ coverLetter: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
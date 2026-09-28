import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { enhanceBullet } from "@/lib/gemini";
import { z } from "zod";

const schema = z.object({
  bullet: z.string().min(3, "Bullet text required"),
  jobTitle: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validated = schema.parse(body);

    const enhanced = await enhanceBullet(
      validated.bullet,
      validated.jobTitle || "Professional"
    );

    return NextResponse.json({ enhanced });
  } catch (error: any) {
    console.error("AI enhance error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to enhance bullet" },
      { status: 500 }
    );
  }
}
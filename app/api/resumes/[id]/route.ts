import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Resume from "@/models/Resume";
import { z } from "zod";
import { generateSlug } from "@/lib/utils";

const updateSchema = z
  .object({
    title: z.string().optional(),
    template: z.string().optional(),
    accentColor: z.string().optional(),
    personal: z.any().optional(),
    experience: z.any().optional(),
    education: z.any().optional(),
    skills: z.any().optional(),
    projects: z.any().optional(),
    certifications: z.any().optional(),
    languages: z.any().optional(),
  })
  .passthrough();

// GET single resume
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const resume = await Resume.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ resume });
  } catch (error: any) {
    console.error("Get resume error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load resume" },
      { status: 500 }
    );
  }
}

// PATCH update resume
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const validated = updateSchema.parse(body);

    await connectDB();

    const resume = await Resume.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { $set: validated },
      { new: true, returnDocument: "after" }
    );

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ resume, message: "Saved successfully" });
  } catch (error: any) {
    console.error("Update resume error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to save resume" },
      { status: 500 }
    );
  }
}

// DELETE resume
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const result = await Resume.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!result) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    console.error("Delete resume error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete resume" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
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

// ─── Helper: Validate ObjectId ───
function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id) && id.length === 24;
}

// ─── Helper: Generic error response ───
function serverError(context: string, error: unknown) {
  console.error(`[${context}]`, error);
  return NextResponse.json(
    { error: "Something went wrong. Please try again." },
    { status: 500 }
  );
}

// ─── GET single resume ───
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

    // ✅ Validate ObjectId format
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid resume ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const resume = await Resume.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ resume });
  } catch (error) {
    return serverError("GET /api/resumes/[id]", error);
  }
}

// ─── PATCH update resume ───
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

    // ✅ Validate ObjectId format
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid resume ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // ✅ Validate body
    let validated;
    try {
      validated = updateSchema.parse(body);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return NextResponse.json(
          { error: "Validation failed", details: err.issues },
          { status: 400 }
        );
      }
      throw err;
    }

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
  } catch (error) {
    return serverError("PATCH /api/resumes/[id]", error);
  }
}

// ─── DELETE resume ───
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

    // ✅ Validate ObjectId format
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid resume ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const result = await Resume.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!result) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return serverError("DELETE /api/resumes/[id]", error);
  }
}
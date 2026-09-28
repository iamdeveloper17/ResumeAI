import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Resume from "@/models/Resume";
import { generateSlug } from "@/lib/utils";

// GET all resumes for logged-in user
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const resumes = await Resume.find({ userId: session.user.id })
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json({ resumes });
  } catch (error: any) {
    console.error("Get resumes error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load resumes" },
      { status: 500 }
    );
  }
}

// POST create new resume
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));

    await connectDB();

    const resume = await Resume.create({
      userId: session.user.id,
      title: body.title || "Untitled Resume",
      slug: generateSlug(10),
      template: body.template || "modern",
      accentColor: body.accentColor || "#2563eb",
      personal: body.personal || {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
        summary: "",
      },
      experience: body.experience || [],
      education: body.education || [],
      skills: body.skills || [],
      projects: body.projects || [],
      certifications: body.certifications || [],
      languages: body.languages || [],
    });

    return NextResponse.json({ resume });
  } catch (error: any) {
    console.error("Create resume error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create resume" },
      { status: 500 }
    );
  }
}
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Resume from "@/models/Resume";
import { generateSlug } from "@/lib/utils";

export default async function NewResumePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectDB();

  // Create empty resume
  const resume = await Resume.create({
    userId: session.user.id,
    title: "Untitled Resume",
    slug: generateSlug(10),
    template: "modern",
    accentColor: "#2563eb",
    personal: {},
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
  });

  redirect(`/build/${resume._id}`);
}
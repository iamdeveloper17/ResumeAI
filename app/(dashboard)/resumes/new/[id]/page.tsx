import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Resume from "@/models/Resume";
import { ArrowLeft, Edit3 } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ResumeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectDB();
  const resume = await Resume.findOne({
    _id: id,
    userId: session.user.id,
  });

  if (!resume) {
    redirect("/resumes");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/resumes"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {resume.title}
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Templates and full preview will be available in Part 3B
        </p>
        <Link
          href={`/build/${resume._id}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all"
        >
          <Edit3 className="w-4 h-4" />
          Continue Editing
        </Link>
      </div>
    </div>
  );
}
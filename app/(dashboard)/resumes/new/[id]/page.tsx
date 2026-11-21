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
    <div className="max-w-2xl mx-auto py-4">
      {/* 🎯 Back Button */}
      <Link
        href="/resumes"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Resumes
      </Link>

      {/* 🎯 Card */}
      <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm p-8 text-center transition-colors">
        <h1 className="text-2xl font-bold mb-2">
          {resume.title}
        </h1>
        
        <p className="text-sm text-muted-foreground mb-6">
          Templates and full preview will be available in Part 3B
        </p>
        
        {/* 🎯 Primary Button */}
        <Link
          href={`/build/${resume._id}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-sm"
        >
          <Edit3 className="w-4 h-4" />
          Continue Editing
        </Link>
      </div>
    </div>
  );
}
import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

export default function NewResumePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/resumes"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Create New Resume
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Resume builder will be available in Part 3
        </p>
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <Construction className="w-5 h-5 shrink-0" />
          <p>Under construction — Part 3 me builder aayega</p>
        </div>
      </div>
    </div>
  );
}
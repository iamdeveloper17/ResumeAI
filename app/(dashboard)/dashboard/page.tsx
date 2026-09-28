import { auth } from "@/lib/auth";
import Link from "next/link";
import { FileText, Plus, Sparkles, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  const stats = [
    {
      label: "Total Resumes",
      value: "0",
      icon: FileText,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      label: "AI Credits",
      value: "10",
      icon: Sparkles,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
    {
      label: "Total Views",
      value: "0",
      icon: TrendingUp,
      bg: "bg-emerald-50",
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 p-6 lg:p-8">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative">
          <p className="text-white/80 text-sm font-medium mb-1">
            Welcome back 👋
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            Hey {session?.user?.name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-white/80 text-sm max-w-lg mb-5">
            Create AI-powered resumes in minutes. Get hired faster.
          </p>
          <Link
            href="/resumes/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-blue-700 text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Create New Resume
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-blue-100 transition-all"
            >
              <div
                className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}
              >
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          No resumes yet
        </h3>
        <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
          Create your first AI-powered resume and start applying for jobs
          today.
        </p>
        <Link
          href="/resumes/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30"
        >
          <Plus className="w-4 h-4" />
          Create your first resume
        </Link>
      </div>
    </div>
  );
}
import { Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ─── Left: Brand Panel (Desktop only) ─── */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative flex flex-col justify-between p-12 w-full text-white">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">ResumeAI</span>
          </div>

          {/* Hero text */}
          <div className="space-y-6">
            <h1 className="text-4xl xl:text-5xl font-bold leading-[1.1]">
              Land your dream job
              <br />
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                with AI-crafted resumes.
              </span>
            </h1>

            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Generate professional summaries, enhance bullet points, and
              export beautiful PDFs — in minutes.
            </p>

            {/* Feature bullets */}
            <div className="space-y-3 pt-4">
              {[
                "AI-powered content generation",
                "4 professional templates",
                "High-quality PDF export",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
        </div>
      </div>

      {/* ─── Right: Form Panel ─── */}
      <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
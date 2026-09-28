import Link from "next/link";
import {
  FileText,
  Sparkles,
  Download,
  Zap,
  Check,
  ArrowRight,
  Star,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* ─── Navbar ─── */}
      <nav className="border-b border-border bg-white/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">ResumeAI</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="px-3 sm:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5 hidden sm:block" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />

        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Powered by Google Gemini AI
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-slate-900">
              Build your perfect resume
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                with AI in minutes
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Generate professional summaries, enhance bullet points, and
              export beautiful PDFs — all powered by AI. No design skills
              required.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Building Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="https://github.com/iamdeveloper17"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-900 text-sm sm:text-base font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all hover:-translate-y-0.5"
              >
                View on GitHub
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                Free forever
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                No credit card
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                Unlimited PDFs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="border-y border-slate-100 bg-slate-50/50">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Resumes created" },
              { value: "4.9/5", label: "User rating" },
              { value: "50K+", label: "AI generations" },
              { value: "100%", label: "Free to start" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="container py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium mb-4 text-slate-700">
            <Sparkles className="w-3 h-3" />
            FEATURES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight text-slate-900">
            Everything you need to get hired
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Powerful features to help you land your dream job faster
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Sparkles,
              title: "AI Writing",
              desc: "Generate summaries and enhance bullets with Google Gemini AI",
              gradient: "from-purple-500 to-purple-600",
            },
            {
              icon: FileText,
              title: "4 Templates",
              desc: "Modern, classic, minimal, and creative designs — all ATS-friendly",
              gradient: "from-blue-500 to-blue-600",
            },
            {
              icon: Zap,
              title: "Live Preview",
              desc: "See changes instantly as you type — no refresh needed",
              gradient: "from-amber-500 to-orange-500",
            },
            {
              icon: Download,
              title: "PDF Export",
              desc: "High-quality A4 PDFs ready to send to recruiters",
              gradient: "from-emerald-500 to-emerald-600",
            },
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-blue-100 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-lg text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="bg-slate-50/50 border-y border-slate-100">
        <div className="container py-16 md:py-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight text-slate-900">
              Build your resume in 3 steps
            </h2>
            <p className="text-slate-500">
              From blank page to interview-ready in under 10 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Fill your details",
                desc: "Enter your experience, education, and skills in our intuitive multi-step form",
              },
              {
                step: "02",
                title: "Let AI enhance",
                desc: "Our AI writes professional summaries and improves your bullet points",
              },
              {
                step: "03",
                title: "Export & apply",
                desc: "Download your polished PDF and start applying to jobs immediately",
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-lg mb-4 shadow-lg shadow-blue-600/30">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium mb-4 text-slate-700">
            <Star className="w-3 h-3" />
            TESTIMONIALS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight text-slate-900">
            Loved by job seekers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              name: "Priya Sharma",
              role: "Software Engineer",
              text: "The AI-generated summary was perfect. Got 3 interview calls in the first week!",
              initials: "PS",
            },
            {
              name: "Rahul Verma",
              role: "Product Designer",
              text: "The templates are clean and modern. Best free resume builder I've used.",
              initials: "RV",
            },
            {
              name: "Anjali Singh",
              role: "Data Analyst",
              text: "Live preview saved so much time. Exported PDF looks super professional.",
              initials: "AS",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-6"
            >
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 text-amber-500 fill-amber-500"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="container py-16 md:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-8 md:p-16 text-center">
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Ready to build your resume?
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-8">
              Join thousands of job seekers using AI to land interviews faster.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 text-base font-semibold rounded-xl hover:bg-white/95 transition-all shadow-xl hover:-translate-y-0.5"
            >
              Start Building Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-white/60 text-xs mt-4">
              No credit card required · Free forever
            </p>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-slate-100 bg-slate-50/50">
        <div className="container py-12">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-slate-900">ResumeAI</span>
              </Link>
              <p className="text-sm text-slate-500 max-w-xs">
                AI-powered resume builder for modern job seekers. Land your
                dream job faster.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3 text-slate-900">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <Link href="/register" className="hover:text-slate-900">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-slate-900">
                    Login
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/iamdeveloper17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3 text-slate-900">
                Connect
              </h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a
                    href="https://linkedin.com/in/amit-kumar-9193b0216"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ramit5752@gmail.com"
                    className="hover:text-slate-900"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
            <p>Built with Next.js + TypeScript + Google Gemini AI</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
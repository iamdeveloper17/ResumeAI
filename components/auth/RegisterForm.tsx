"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2, Sparkles, ArrowLeft, Mail, Lock, Eye, EyeOff, User } from "lucide-react"; // 🎯 Icons import kiye
import { registerSchema, type RegisterInput } from "@/lib/validations";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 🎯 Password toggle ke liye

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Registration failed");
        setLoading(false);
        return;
      }

      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        toast.error("Auto-login failed. Please login manually.");
        router.push("/login");
        return;
      }

      toast.success("Welcome to ResumeAI! 🎉");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 🎯 Premium Back Button */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-transparent hover:border-border hover:bg-muted text-sm font-semibold text-muted-foreground hover:text-foreground mb-8 transition-all duration-300 group shadow-sm hover:shadow"
      >
        <div className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center group-hover:-translate-x-1 transition-transform">
          <ArrowLeft className="w-3.5 h-3.5" />
        </div>
        Back to home
      </Link>

      {/* 🎯 Header Section */}
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-5">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
          <Sparkles className="w-7 h-7 text-primary relative z-10" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Join us and start building AI-powered resumes
        </p>
      </div>

      {/* 🎯 Main Form Card */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Full Name Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                {...register("name")}
                type="text"
                className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-xl text-sm transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-border-hover placeholder:text-muted-foreground/70 disabled:opacity-50"
                placeholder="John Doe"
                disabled={loading}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                {...register("email")}
                type="email"
                className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-xl text-sm transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-border-hover placeholder:text-muted-foreground/70 disabled:opacity-50"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"} // 🎯 Password toggle logic
                className="w-full pl-10 pr-11 py-3 bg-background border border-input rounded-xl text-sm transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-border-hover placeholder:text-muted-foreground/70 disabled:opacity-50"
                placeholder="Min 6 characters"
                disabled={loading}
              />
              {/* Password Show/Hide Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 mt-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>
      </div>

      {/* 🎯 Footer Link */}
      <p className="text-center text-sm text-muted-foreground mt-8">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary font-bold hover:underline decoration-2 underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
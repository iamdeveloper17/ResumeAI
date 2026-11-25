"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Mail, Copy, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState<string | null>(null); // 🎯 Link store karne ke liye
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // 🎯 Ye zaroori tha
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      setLoading(false);
      
      if (res.ok) {
        if (data.resetUrl) {
          setResetLink(data.resetUrl); // 🎯 Link state me save karo
          toast.success("Reset link generated!");
        } else {
          toast.success(data.message || "If email exists, link is sent.");
        }
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send request");
    }
  };

  const copyToClipboard = () => {
    if (resetLink) {
      navigator.clipboard.writeText(resetLink);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-3xl border border-border shadow-xl">
        <Link href="/login" className="text-sm text-muted-foreground flex items-center gap-2 mb-6 hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>
        
        <h1 className="text-2xl font-bold text-foreground mb-2">Forgot Password?</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Enter your email and we'll generate a secure reset link for you.
        </p>
        
        {resetLink ? (
          // 🎯 SUCCESS UI (Jab link generate ho jaye)
          <div className="space-y-4">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-600 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Reset Link Generated!</p>
                <p className="text-xs mt-1 opacity-90">Since email is not set up yet, copy this link and open it in a new tab.</p>
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-xl border border-border flex items-center gap-2">
              <input 
                type="text" 
                value={resetLink} 
                readOnly 
                className="flex-1 bg-transparent text-xs text-foreground outline-none truncate"
              />
              <button 
                onClick={copyToClipboard}
                className="p-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            
            <Link 
              href={resetLink.replace("http://localhost:3000", "")}
              className="block w-full py-3 bg-primary text-white font-bold rounded-xl text-center hover:opacity-90"
            >
              Open Reset Page
            </Link>
          </div>
        ) : (
          // 🎯 INPUT UI (Jab link generate nahi hua)
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button disabled={loading} className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 flex justify-center items-center h-12">
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Generate Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
"use client";

import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIButtonProps {
  onClick: () => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  loadingLabel?: string;
  size?: "sm" | "md";
  variant?: "default" | "outline";
  className?: string;
}

export default function AIButton({
  onClick,
  loading = false,
  disabled = false,
  label = "Generate with AI",
  loadingLabel = "Generating...",
  size = "sm",
  variant = "default",
  className,
}: AIButtonProps) {
  const baseClasses =
    "inline-flex items-center gap-1.5 font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-3.5 py-2 text-sm",
  };

  const variantClasses = {
    default:
      "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-sm hover:shadow-md",
    outline:
      "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {loading ? (
        <>
          <Loader2 className="w-3 h-3 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          <Sparkles className="w-3 h-3" />
          {label}
        </>
      )}
    </button>
  );
}
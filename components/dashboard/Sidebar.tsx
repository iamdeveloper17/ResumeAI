"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Plus,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/resumes", label: "My Resumes", icon: FileText },
  { href: "/resumes/new", label: "New Resume", icon: Plus },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          // 🎯 Updated: bg-card & border-border for theme support
          "fixed lg:static top-0 left-0 bottom-0 z-50 w-64 bg-card border-r border-border flex flex-col shrink-0 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
          <span className="font-bold text-foreground">Menu</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <nav className="p-3 space-y-1 flex-1">
          <p className="px-3 pt-3 pb-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Workspace
          </p>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span>{link.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade card */}
        <div className="p-3">
          {/* 🎯 Updated: Gradient card uses card/border variables */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 p-4 text-white border border-transparent dark:border-border">
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/30 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" />
                <p className="text-xs font-bold uppercase tracking-wider">
                  Upgrade
                </p>
              </div>
              <p className="text-xs text-white/70 leading-snug mb-3">
                Unlock unlimited resumes & AI credits
              </p>
              <button className="w-full py-1.5 bg-white text-slate-900 text-xs font-semibold rounded-lg hover:bg-white/90 transition-colors">
                View plans
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
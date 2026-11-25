"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut, Menu, User, Settings, Sparkles } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface NavbarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onMenuClick: () => void;
}

export default function Navbar({ user, onMenuClick }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const initials = getInitials(user?.name || "U");

  return (
    // 🎯 Background aur border theme ke hisaab se
    <nav className="h-14 lg:h-16 bg-background border-b border-border sticky top-0 z-30 shrink-0 transition-colors">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-3">
        
        {/* LEFT: Logo & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>

          <Link href="/dashboard" className="flex items-center gap-2">
            {/* Logo Icon color */}
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground hidden sm:block">
              ResumeAI
            </span>
          </Link>
        </div>

        {/* RIGHT: Theme Toggle + User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* 🚀 Theme Toggle */}
          <ThemeToggle />

          {/* User Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <span className="text-sm font-medium text-foreground hidden sm:block">
                {user?.name?.split(" ")[0]}
              </span>
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || ""}
                  className="w-8 h-8 rounded-full border border-border"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-sm">
                  {initials}
                </div>
              )}
            </button>

            {open && (
              // 🎯 Dropdown menu ko theme variables diye
              <div className="absolute right-0 mt-2 w-56 bg-popover text-popover-foreground rounded-2xl shadow-xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
                <div className="p-1">
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </div>
                <div className="p-1 border-t border-border">
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}
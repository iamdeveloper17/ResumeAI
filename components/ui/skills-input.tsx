"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { X, Plus } from "lucide-react";
import { SKILLS, fuzzySearch } from "@/lib/data/suggestions-db";
import { cn } from "@/lib/utils";

interface SkillsInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  placeholder?: string;
}

export default function SkillsInput({
  skills,
  onChange,
  placeholder = "Type a skill and press Enter or comma",
}: SkillsInputProps) {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const available = SKILLS.filter(
      (s) => !skills.some((sk) => sk.toLowerCase() === s.toLowerCase())
    );
    if (!input.trim()) return available.slice(0, 8);
    return fuzzySearch(input, available, 8);
  }, [input, skills]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setHighlightIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    // Prevent duplicates
    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) return;
    onChange([...skills, trimmed]);
    setInput("");
    setIsOpen(false);
    setHighlightIndex(-1);
    inputRef.current?.focus();
  };

  const addMultipleSkills = (text: string) => {
    // Support comma-separated input
    const items = text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newSkills = [...skills];
    items.forEach((item) => {
      if (!newSkills.some((s) => s.toLowerCase() === item.toLowerCase())) {
        newSkills.push(item);
      }
    });
    onChange(newSkills);
    setInput("");
    setIsOpen(false);
  };

  const removeSkill = (skill: string) => {
    onChange(skills.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Comma → add skill
    if (e.key === ",") {
      e.preventDefault();
      if (input.trim()) {
        if (highlightIndex >= 0 && filtered[highlightIndex]) {
          addSkill(filtered[highlightIndex]);
        } else {
          addSkill(input);
        }
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      // If comma-separated multiple items, add all
      if (input.includes(",")) {
        addMultipleSkills(input);
      } else if (highlightIndex >= 0 && filtered[highlightIndex]) {
        addSkill(filtered[highlightIndex]);
      } else if (input.trim()) {
        addSkill(input);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setHighlightIndex((prev) =>
        prev < filtered.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : filtered.length - 1
      );
    } else if (e.key === "Backspace" && !input && skills.length > 0) {
      removeSkill(skills[skills.length - 1]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightIndex(-1);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const q = query.toLowerCase();
    const index = text.toLowerCase().indexOf(q);
    if (index === -1) return text;
    return (
      <>
        {text.slice(0, index)}
        <span className="font-semibold text-blue-600">
          {text.slice(index, index + q.length)}
        </span>
        {text.slice(index + q.length)}
      </>
    );
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Selected skills chips */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-medium"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-blue-400 hover:text-blue-700"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="relative">
        <input
          ref={inputRef}
          className="w-full px-3 py-2 pr-10 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
          placeholder={placeholder}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsOpen(true);
            setHighlightIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        {input.trim() && (
          <button
            type="button"
            onClick={() => addSkill(input)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isOpen && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 max-h-56 overflow-y-auto">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 sticky top-0 bg-white">
            {input.trim() ? "Suggestions" : "Popular Skills"}
          </div>
          {filtered.map((suggestion, idx) => (
            <button
              key={suggestion}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => addSkill(suggestion)}
              onMouseEnter={() => setHighlightIndex(idx)}
              className={cn(
                "w-full text-left px-3 py-2 text-sm transition-colors",
                idx === highlightIndex
                  ? "bg-blue-50"
                  : "text-slate-700 hover:bg-slate-50"
              )}
            >
              {highlightMatch(suggestion, input)}
            </button>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-400 mt-1.5">
        Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-mono">Enter</kbd> or{" "}
        <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-mono">,</kbd> to add · Arrow keys to navigate
      </p>
    </div>
  );
}
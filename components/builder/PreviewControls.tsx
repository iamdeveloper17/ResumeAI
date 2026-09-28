"use client";

import { useState, useRef, useEffect } from "react";
import { Palette, ChevronDown, Check, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

const TEMPLATES = [
  {
    id: "modern" as const,
    name: "Modern",
    description: "Clean, colorful design",
  },
  {
    id: "classic" as const,
    name: "Classic",
    description: "Traditional, serif style",
  },
];

const COLORS = [
  { name: "Blue", value: "#2563eb" },
  { name: "Indigo", value: "#4f46e5" },
  { name: "Purple", value: "#7c3aed" },
  { name: "Pink", value: "#db2777" },
  { name: "Red", value: "#dc2626" },
  { name: "Orange", value: "#ea580c" },
  { name: "Emerald", value: "#059669" },
  { name: "Teal", value: "#0d9488" },
  { name: "Cyan", value: "#0891b2" },
  { name: "Slate", value: "#475569" },
  { name: "Black", value: "#1f2937" },
];

interface PreviewControlsProps {
  template: "modern" | "classic";
  accentColor: string;
  zoom: number;
  onTemplateChange: (template: "modern" | "classic") => void;
  onColorChange: (color: string) => void;
  onZoomChange: (zoom: number) => void;
}

export default function PreviewControls({
  template,
  accentColor,
  zoom,
  onTemplateChange,
  onColorChange,
  onZoomChange,
}: PreviewControlsProps) {
  const [templateOpen, setTemplateOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        templateRef.current &&
        !templateRef.current.contains(e.target as Node)
      ) {
        setTemplateOpen(false);
      }
      if (colorRef.current && !colorRef.current.contains(e.target as Node)) {
        setColorOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentTemplate = TEMPLATES.find((t) => t.id === template);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Template Switcher */}
      <div className="relative" ref={templateRef}>
        <button
          onClick={() => setTemplateOpen(!templateOpen)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
        >
          <span>{currentTemplate?.name}</span>
          <ChevronDown className="w-3 h-3" />
        </button>

        {templateOpen && (
          <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              Choose Template
            </div>
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onTemplateChange(t.id);
                  setTemplateOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2.5 hover:bg-slate-50 transition-colors flex items-start justify-between gap-2",
                  template === t.id && "bg-blue-50"
                )}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t.name}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {t.description}
                  </p>
                </div>
                {template === t.id && (
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color Picker */}
      <div className="relative" ref={colorRef}>
        <button
          onClick={() => setColorOpen(!colorOpen)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
          title="Accent Color"
        >
          <Palette className="w-3 h-3" />
          <span
            className="w-3 h-3 rounded-full border border-white shadow-sm"
            style={{ backgroundColor: accentColor }}
          />
        </button>

        {colorOpen && (
          <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden p-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Accent Color
            </p>
            <div className="grid grid-cols-6 gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => {
                    onColorChange(c.value);
                    setColorOpen(false);
                  }}
                  className={cn(
                    "w-6 h-6 rounded-md transition-all hover:scale-110 flex items-center justify-center",
                    accentColor === c.value &&
                      "ring-2 ring-offset-1 ring-slate-400"
                  )}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                >
                  {accentColor === c.value && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-0.5">
        <button
          onClick={() => onZoomChange(Math.max(50, zoom - 10))}
          disabled={zoom <= 50}
          className="p-1.5 hover:bg-white rounded-md text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Zoom out"
        >
          <ZoomOut className="w-3 h-3" />
        </button>
        <span className="text-[10px] font-medium text-slate-600 px-1 min-w-[32px] text-center">
          {zoom}%
        </span>
        <button
          onClick={() => onZoomChange(Math.min(120, zoom + 10))}
          disabled={zoom >= 120}
          className="p-1.5 hover:bg-white rounded-md text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Zoom in"
        >
          <ZoomIn className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
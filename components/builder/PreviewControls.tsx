"use client";

import { useState, useRef, useEffect } from "react";
import { Palette, ChevronDown, Check, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

// 🚀 Naye templates add kiye hain
const TEMPLATES = [
  { id: "modern", name: "Modern", description: "Clean, colorful design" },
  { id: "classic", name: "Classic", description: "Traditional, serif style" },
  { id: "minimal", name: "Minimal", description: "Simple & Elegant" },
  { id: "executive", name: "Executive", description: "Bold & Professional" },
  { id: "creative", name: "Creative", description: "Modern Sidebar Layout" },
] as const;

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
  template: "modern" | "classic" | "minimal" | "executive" | "creative";
  accentColor: string;
  fontFamily: string;
  fontSize: string;
  backgroundPattern: string; // 👈 Ye add karo
  zoom: number;
  onTemplateChange: (template: any) => void;
  onColorChange: (color: string) => void;
  onFontFamilyChange: (font: string) => void;
  onFontSizeChange: (size: string) => void;
  onBackgroundChange: (pattern: string) => void; // 👈 Ye add karo
  onZoomChange: (zoom: number) => void;
}

export default function PreviewControls({
  template,
  accentColor,
  fontFamily,
  fontSize,
  backgroundPattern, // 👈 Ye add karo
  zoom,
  onTemplateChange,
  onColorChange,
  onFontFamilyChange,
  onFontSizeChange,
  onBackgroundChange, // 👈 Ye add karo
  onZoomChange,
}: PreviewControlsProps) {
  const [templateOpen, setTemplateOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const [fontFamilyOpen, setFontFamilyOpen] = useState(false);
  const [fontSizeOpen, setFontSizeOpen] = useState(false);
  const fontFamilyRef = useRef<HTMLDivElement>(null);
  const fontSizeRef = useRef<HTMLDivElement>(null);
  const [bgOpen, setBgOpen] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (templateRef.current && !templateRef.current.contains(e.target as Node)) {
        setTemplateOpen(false);
      }
      if (colorRef.current && !colorRef.current.contains(e.target as Node)) {
        setColorOpen(false);
      }
      // 🚀 Naye refs ke liye
      if (fontFamilyRef.current && !fontFamilyRef.current.contains(e.target as Node)) {
        setFontFamilyOpen(false);
      }
      if (fontSizeRef.current && !fontSizeRef.current.contains(e.target as Node)) {
        setFontSizeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentTemplate = TEMPLATES.find((t) => t.id === template);

  return (
    <div className="flex items-center gap-2 flex-wrap">
            {/* Font Family & Size Selectors */}
            {/* 🚀 Font Family Dropdown 🚀 */}
      <div className="relative" ref={fontFamilyRef}>
        <button
          onClick={() => setFontFamilyOpen(!fontFamilyOpen)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
        >
          <span className="capitalize">{fontFamily || "Sans-Serif"}</span>
          <ChevronDown className="w-3 h-3" />
        </button>

        {fontFamilyOpen && (
          <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
            {[
              { id: "sans-serif", name: "Sans-Serif" },
              { id: "serif", name: "Serif" },
              { id: "monospace", name: "Monospace" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  onFontFamilyChange(f.id);
                  setFontFamilyOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between",
                  fontFamily === f.id && "bg-blue-50 text-blue-700 font-semibold"
                )}
              >
                {f.name}
                {fontFamily === f.id && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 🚀 Font Size Dropdown 🚀 */}
      <div className="relative" ref={fontSizeRef}>
        <button
          onClick={() => setFontSizeOpen(!fontSizeOpen)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
        >
          <span>{fontSize || "11px"}</span>
          <ChevronDown className="w-3 h-3" />
        </button>

        {fontSizeOpen && (
          <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
            {[
              { id: "10px", name: "Small" },
              { id: "11px", name: "Normal" },
              { id: "12px", name: "Large" },
              { id: "13px", name: "XL" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  onFontSizeChange(s.id);
                  setFontSizeOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between",
                  fontSize === s.id && "bg-blue-50 text-blue-700 font-semibold"
                )}
              >
                <span>{s.name}</span>
                <span className="text-xs text-slate-400">{s.id}</span>
                {fontSize === s.id && <Check className="w-3.5 h-3.5 text-blue-600" />}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Template Switcher */}
      <div className="relative" ref={templateRef}>
        <button
          onClick={() => setTemplateOpen(!templateOpen)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
        >
          <span>{currentTemplate?.name || "Template"}</span>
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
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-[10px] text-slate-500">{t.description}</p>
                </div>
                {template === t.id && <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
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
          <span className="w-3 h-3 rounded-full border border-white shadow-sm" style={{ backgroundColor: accentColor }} />
        </button>

        {colorOpen && (
          <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden p-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Accent Color</p>
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
                    accentColor === c.value && "ring-2 ring-offset-1 ring-slate-400"
                  )}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                >
                  {accentColor === c.value && <Check className="w-3 h-3 text-white" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

            {/* 🚀 Background Pattern Picker 🚀 */}
      <div className="relative" ref={bgRef}>
        <button
          onClick={() => setBgOpen(!bgOpen)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
          title="Background Pattern"
        >
          <span>BG Style</span>
          <ChevronDown className="w-3 h-3" />
        </button>

        {bgOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden p-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Choose Pattern</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "none", name: "Plain", style: { backgroundColor: "#fff" } },
                { id: "dots", name: "Dots", style: { backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "10px 10px", backgroundColor: "#fff" } },
                { id: "grid", name: "Grid", style: { backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)", backgroundSize: "20px 20px", backgroundColor: "#fff" } },
                { id: "gradient", name: "Gradient", style: { background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)" } },
                { id: "lines", name: "Lines", style: { backgroundImage: "repeating-linear-gradient(45deg, #f1f5f9, #f1f5f9 10px, #fff 10px, #fff 20px)" } },
                { id: "pastel", name: "Pastel", style: { background: "linear-gradient(to right, #fdf4ff, #f4f4f5)" } },
              ].map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => {
                    onBackgroundChange(bg.id); // 🚀 Naya prop
                    setBgOpen(false);
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all h-16",
                    backgroundPattern === bg.id ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-200 hover:border-slate-300"
                  )}
                  style={bg.style}
                >
                  <span className="text-[10px] font-semibold text-slate-700 bg-white/80 px-1 rounded">{bg.name}</span>
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
        <span className="text-[10px] font-medium text-slate-600 px-1 min-w-8 text-center">{zoom}%</span>
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
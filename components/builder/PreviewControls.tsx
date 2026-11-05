"use client";

import { useState, useRef, useEffect } from "react";
import { Palette, ChevronDown, Check, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

const TEMPLATES = [
  { id: "modern", name: "Modern", description: "Clean, colorful design" },
  { id: "classic", name: "Classic", description: "Traditional, serif style" },
  { id: "minimal", name: "Minimal", description: "Simple & Elegant" },
  { id: "executive", name: "Executive", description: "Bold & Professional" },
  { id: "creative", name: "Creative", description: "Modern Sidebar Layout" },
] as const;

// 🚀 Design Names based on Template
const DESIGN_NAMES: Record<string, string[]> = {
  modern: ["Clean Accent", "Tech Minimal", "Left Border", "Bold Colorful", "Grid Style"],
  classic: ["Traditional Serif", "Two-Column", "Elegant Header", "Modern Classic", "Vintage Box"],
  minimal: ["Timeless", "Left Aligned", "Boxed Minimal", "Swiss Style", "Ultra Simple"],
  executive: ["Classic Pro", "Modern Leader", "Elegant Minimal", "Bold Matrix", "Dark Suite"],
  creative: ["Corporate Split", "Dark Header", "Vibrant Circle", "Dynamic Diamond", "Hexagon Pro"],
};

// 🚀 5 Premium Fonts (ATS Friendly & Elegant)
const FONTS = [
  { id: "'Inter', sans-serif", name: "Inter (Modern)" },
  { id: "'Roboto', sans-serif", name: "Roboto (Clean)" },
  { id: "'Playfair Display', serif", name: "Playfair (Elegant)" },
  { id: "'Merriweather', serif", name: "Merriweather (Classic)" },
  { id: "'Montserrat', sans-serif", name: "Montserrat (Bold)" },
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
  template: "modern" | "classic" | "minimal" | "executive" | "creative";
  styleVariant: number;
  accentColor: string;
  fontFamily: string;
  fontSize: string;
  backgroundPattern: string;
  zoom: number;
  onTemplateChange: (template: any) => void;
  onStyleVariantChange: (variant: number) => void;
  onColorChange: (color: string) => void;
  onFontFamilyChange: (font: string) => void;
  onFontSizeChange: (size: string) => void;
  onBackgroundChange: (pattern: string) => void;
  onZoomChange: (zoom: number) => void;
}

export default function PreviewControls({
  template,
  styleVariant,
  accentColor,
  fontFamily,
  fontSize,
  backgroundPattern,
  zoom,
  onTemplateChange,
  onStyleVariantChange,
  onColorChange,
  onFontFamilyChange,
  onFontSizeChange,
  onBackgroundChange,
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

  const [variantOpen, setVariantOpen] = useState(false);
  const variantRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (templateRef.current && !templateRef.current.contains(e.target as Node)) setTemplateOpen(false);
      if (colorRef.current && !colorRef.current.contains(e.target as Node)) setColorOpen(false);
      if (fontFamilyRef.current && !fontFamilyRef.current.contains(e.target as Node)) setFontFamilyOpen(false);
      if (fontSizeRef.current && !fontSizeRef.current.contains(e.target as Node)) setFontSizeOpen(false);
      if (bgRef.current && !bgRef.current.contains(e.target as Node)) setBgOpen(false);
      if (variantRef.current && !variantRef.current.contains(e.target as Node)) setVariantOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentTemplate = TEMPLATES.find((t) => t.id === template);
  const currentFont = FONTS.find((f) => f.id === fontFamily);
  const currentDesignName = DESIGN_NAMES[template]?.[(styleVariant || 1) - 1] || `Design ${styleVariant || 1}`;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      
      {/* 🚀 Font Family (5 Premium Fonts) 🚀 */}
      <div className="relative" ref={fontFamilyRef}>
        <button 
          onClick={() => setFontFamilyOpen(!fontFamilyOpen)} 
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
        >
          <span>{currentFont?.name.split(" ")[0] || "Font"}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        {fontFamilyOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Font Style</div>
            {FONTS.map((f) => (
              <button 
                key={f.id} 
                onClick={() => { onFontFamilyChange(f.id); setFontFamilyOpen(false); }} 
                className={cn(
                  "w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between", 
                  fontFamily === f.id && "bg-blue-50 text-blue-700 font-semibold"
                )}
              >
                <span style={{ fontFamily: f.id }}>{f.name}</span>
                {fontFamily === f.id && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Font Size */}
      <div className="relative" ref={fontSizeRef}>
        <button onClick={() => setFontSizeOpen(!fontSizeOpen)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors">
          <span>{fontSize || "11px"}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        {fontSizeOpen && (
          <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
            {[{ id: "10px", name: "Small" }, { id: "11px", name: "Normal" }, { id: "12px", name: "Large" }, { id: "13px", name: "XL" }].map((s) => (
              <button key={s.id} onClick={() => { onFontSizeChange(s.id); setFontSizeOpen(false); }} className={cn("w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between", fontSize === s.id && "bg-blue-50 text-blue-700 font-semibold")}>
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
        <button onClick={() => setTemplateOpen(!templateOpen)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors">
          <span>{currentTemplate?.name || "Template"}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        {templateOpen && (
          <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Choose Template</div>
            {TEMPLATES.map((t) => (
              <button key={t.id} onClick={() => { onTemplateChange(t.id); setTemplateOpen(false); }} className={cn("w-full text-left px-3 py-2.5 hover:bg-slate-50 transition-colors flex items-start justify-between gap-2", template === t.id && "bg-blue-50")}>
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

      {/* 🚀 Design Variant Dropdown (With Professional Names) 🚀 */}
      <div className="relative" ref={variantRef}>
        <button onClick={() => setVariantOpen(!variantOpen)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors">
          <span>{currentDesignName}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        {variantOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Choose Design</div>
            {[1, 2, 3, 4, 5].map((num) => {
              const designName = DESIGN_NAMES[template]?.[num - 1] || `Design ${num}`;
              return (
                <button key={num} onClick={() => { onStyleVariantChange(num); setVariantOpen(false); }} className={cn("w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between", styleVariant === num && "bg-blue-50 text-blue-700 font-semibold")}>
                  {designName}
                  {styleVariant === num && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Color Picker */}
      <div className="relative" ref={colorRef}>
        <button onClick={() => setColorOpen(!colorOpen)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors" title="Accent Color">
          <Palette className="w-3 h-3" />
          <span className="w-3 h-3 rounded-full border border-white shadow-sm" style={{ backgroundColor: accentColor }} />
        </button>
        {colorOpen && (
          <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden p-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Accent Color</p>
            <div className="grid grid-cols-6 gap-2">
              {COLORS.map((c) => (
                <button key={c.value} onClick={() => { onColorChange(c.value); setColorOpen(false); }} className={cn("w-6 h-6 rounded-md transition-all hover:scale-110 flex items-center justify-center", accentColor === c.value && "ring-2 ring-offset-1 ring-slate-400")} style={{ backgroundColor: c.value }} title={c.name}>
                  {accentColor === c.value && <Check className="w-3 h-3 text-white" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Background Pattern */}
      <div className="relative" ref={bgRef}>
        <button onClick={() => setBgOpen(!bgOpen)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors" title="Background Pattern">
          <span>BG Style</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        {bgOpen && (
          <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden p-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Background Color</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "white", name: "White", style: { backgroundColor: "#ffffff" } },
                { id: "blue", name: "Blue", style: { backgroundColor: "#eff6ff" } },
                { id: "green", name: "Green", style: { backgroundColor: "#f0fdf4" } },
                { id: "yellow", name: "Yellow", style: { backgroundColor: "#fefce8" } },
                { id: "purple", name: "Purple", style: { backgroundColor: "#faf5ff" } },
                { id: "cream", name: "Cream", style: { backgroundColor: "#fffbeb" } },
                { id: "gray", name: "Gray", style: { backgroundColor: "#f8fafc" } },
                { id: "rose", name: "Rose", style: { backgroundColor: "#fff1f2" } },
              ].map((bg) => (
                <button key={bg.id} onClick={() => { onBackgroundChange(bg.id); setBgOpen(false); }} className={cn("flex flex-col items-center justify-center p-1 rounded-lg border-2 transition-all h-14 shadow-sm", backgroundPattern === bg.id ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-200 hover:border-slate-300")} style={bg.style} title={bg.name}>
                  <span className="text-[9px] font-semibold text-slate-600">{bg.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-0.5">
        <button onClick={() => onZoomChange(Math.max(50, zoom - 10))} disabled={zoom <= 50} className="p-1.5 hover:bg-white rounded-md text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Zoom out">
          <ZoomOut className="w-3 h-3" />
        </button>
        <span className="text-[10px] font-medium text-slate-600 px-1 min-w-8 text-center">{zoom}%</span>
        <button onClick={() => onZoomChange(Math.min(120, zoom + 10))} disabled={zoom >= 120} className="p-1.5 hover:bg-white rounded-md text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Zoom in">
          <ZoomIn className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
"use client";

import { X, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import TemplateRenderer from "./templates/TemplateRenderer";
import PreviewControls from "./PreviewControls";
import { useRef } from "react";
import { useResumeStore } from "@/lib/resumeStore"; // 🚀 Naya Import

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  zoom: number;
  setZoom: (zoom: number) => void;
  onDownload: () => void;
}

export function PreviewModal({
  isOpen,
  onClose,
  data,
  zoom,
  setZoom,
  onDownload,
}: PreviewModalProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const { setData } = useResumeStore(); // 🚀 Store se setData nikaala

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-3 flex items-center justify-between border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-slate-900">Resume Preview</h2>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Live</span>
        </div>
        <div className="flex items-center gap-3">
                                 <PreviewControls
  template={data.template}
  styleVariant={data.styleVariant || 1} // 🚀 Naya
  accentColor={data.accentColor}
  fontFamily={data.fontFamily}
  fontSize={data.fontSize}
  backgroundPattern={data.backgroundPattern}
  zoom={zoom}
  onTemplateChange={(template) => setData({ template })}
  onStyleVariantChange={(styleVariant) => setData({ styleVariant })} // 🚀 Naya
  onColorChange={(accentColor) => setData({ accentColor })}
  onFontFamilyChange={(fontFamily) => setData({ fontFamily })}
  onFontSizeChange={(fontSize) => setData({ fontSize })}
  onBackgroundChange={(backgroundPattern) => setData({ backgroundPattern })}
  onZoomChange={setZoom}
/>
          <Button onClick={onDownload} className="bg-blue-600 hover:bg-blue-700">
            <Printer className="w-4 h-4 mr-2" /> Download PDF
          </Button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-8 flex justify-center">
        <div
          className="bg-white shadow-2xl origin-top transition-transform duration-200"
          style={{
            transform: `scale(${zoom / 100})`,
            width: "794px",
            minHeight: "1123px",
            fontSize: data.fontSize || "11px"
          }}
        >
          <TemplateRenderer ref={previewRef} data={data} />
        </div>
      </div>
    </div>
  );
}
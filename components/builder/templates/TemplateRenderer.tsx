"use client";

import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ExecutiveTemplate from "./ExecutiveTemplate";
import CreativeTemplate from "./CreativeTemplate";

interface TemplateRendererProps {
  data: ResumeData;
}

const TemplateRenderer = forwardRef<HTMLDivElement, TemplateRendererProps>(
  ({ data }, ref) => {
    const template = data.template || "modern";

    // 🚀 Background Colors Mapping
    const bgColors: Record<string, string> = {
      white: "#ffffff",
      blue: "#eff6ff",
      green: "#f0fdf4",
      yellow: "#fefce8",
      purple: "#faf5ff",
      cream: "#fffbeb",
      gray: "#f8fafc",
      rose: "#fff1f2",
    };

    const bgColor = bgColors[data.backgroundPattern] || "#ffffff";

    // 🚀 Wrapper div jo background handle karega
    return (
      <div 
        ref={ref} 
        style={{ 
          backgroundColor: bgColor,
          width: "100%",
          minHeight: "1123px",
        }}
      >
        {template === "classic" && <ClassicTemplate data={data} />}
        {template === "minimal" && <MinimalTemplate data={data} />}
        {template === "executive" && <ExecutiveTemplate data={data} />}
        {template === "creative" && <CreativeTemplate data={data} />}
        {template === "modern" && <ModernTemplate data={data} />}
      </div>
    );
  }
);

TemplateRenderer.displayName = "TemplateRenderer";
export default TemplateRenderer;
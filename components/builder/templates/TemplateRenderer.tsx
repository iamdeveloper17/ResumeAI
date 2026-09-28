"use client";

import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";

interface TemplateRendererProps {
  data: ResumeData;
}

const TemplateRenderer = forwardRef<HTMLDivElement, TemplateRendererProps>(
  ({ data }, ref) => {
    const template = data.template || "modern";

    if (template === "classic") {
      return <ClassicTemplate ref={ref} data={data} />;
    }

    return <ModernTemplate ref={ref} data={data} />;
  }
);

TemplateRenderer.displayName = "TemplateRenderer";

export default TemplateRenderer;
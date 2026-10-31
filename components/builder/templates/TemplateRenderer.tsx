"use client";

import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ExecutiveTemplate from "./ExecutiveTemplate";
import CreativeTemplate from "./CreativeTemplate";
import HexagonTemplate from "./HexagonTemplate";

interface TemplateRendererProps {
  data: ResumeData;
}

const TemplateRenderer = forwardRef<HTMLDivElement, TemplateRendererProps>(
  ({ data }, ref) => {
    const template = data.template || "modern";

    if (template === "classic") return <ClassicTemplate ref={ref} data={data} />;
    if (template === "minimal") return <MinimalTemplate ref={ref} data={data} />;
    if (template === "executive") return <ExecutiveTemplate ref={ref} data={data} />;
    if (template === "creative") return <CreativeTemplate ref={ref} data={data} />;
    if (template === "hexagon") return <HexagonTemplate ref={ref} data={data} />;

    return <ModernTemplate ref={ref} data={data} />;
  }
);

TemplateRenderer.displayName = "TemplateRenderer";
export default TemplateRenderer;

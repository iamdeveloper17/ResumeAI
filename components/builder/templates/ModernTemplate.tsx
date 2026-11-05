"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";
import ModernDesign1 from "./modern/ModernDesign1.tsx";
import ModernDesign2 from "./modern/ModernDesign2.tsx";
import ModernDesign3 from "./modern/ModernDesign3.tsx";
import ModernDesign4 from "./modern/ModernDesign4.tsx";
import ModernDesign5 from "./modern/ModernDesign5.tsx";

const ModernTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const variant = data.styleVariant || 1;

  if (variant === 2) return <ModernDesign2 ref={ref} data={data} />;
  if (variant === 3) return <ModernDesign3 ref={ref} data={data} />;
  if (variant === 4) return <ModernDesign4 ref={ref} data={data} />;
  if (variant === 5) return <ModernDesign5 ref={ref} data={data} />;

  return <ModernDesign1 ref={ref} data={data} />;
});

ModernTemplate.displayName = "ModernTemplate";
export default ModernTemplate;
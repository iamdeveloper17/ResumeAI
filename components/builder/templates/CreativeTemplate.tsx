"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";
import CreativeDesign1 from "./creative/CreativeDesign1.tsx";
import CreativeDesign2 from "./creative/CreativeDesign2.tsx";
import CreativeDesign3 from "./creative/CreativeDesign3.tsx";
import CreativeDesign4 from "./creative/CreativeDesign4.tsx";
import CreativeDesign5 from "./creative/CreativeDesign5.tsx";

const CreativeTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const variant = data.styleVariant || 1;

  if (variant === 2) return <CreativeDesign2 ref={ref} data={data} />;
  if (variant === 3) return <CreativeDesign3 ref={ref} data={data} />;
  if (variant === 4) return <CreativeDesign4 ref={ref} data={data} />;
  if (variant === 5) return <CreativeDesign5 ref={ref} data={data} />;

  return <CreativeDesign1 ref={ref} data={data} />;
});

CreativeTemplate.displayName = "CreativeTemplate";
export default CreativeTemplate;
"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";
import MinDesign1 from "./minimal/MinDesign1.tsx";
import MinDesign2 from "./minimal/MinDesign2.tsx";
import MinDesign3 from "./minimal/MinDesign3.tsx";
import MinDesign4 from "./minimal/MinDesign4.tsx";
import MinDesign5 from "./minimal/MinDesign5.tsx";

const MinimalTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const variant = data.styleVariant || 1;

  if (variant === 2) return <MinDesign2 ref={ref} data={data} />;
  if (variant === 3) return <MinDesign3 ref={ref} data={data} />;
  if (variant === 4) return <MinDesign4 ref={ref} data={data} />;
  if (variant === 5) return <MinDesign5 ref={ref} data={data} />;

  return <MinDesign1 ref={ref} data={data} />;
});

MinimalTemplate.displayName = "MinimalTemplate";
export default MinimalTemplate;
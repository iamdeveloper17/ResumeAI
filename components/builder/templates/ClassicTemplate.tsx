"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";
import ClassicDesign1 from "./classic/ClassicDesign1.tsx";
import ClassicDesign2 from "./classic/ClassicDesign2.tsx";
import ClassicDesign3 from "./classic/ClassicDesign3.tsx";
import ClassicDesign4 from "./classic/ClassicDesign4.tsx";
import ClassicDesign5 from "./classic/ClassicDesign5.tsx";

const ClassicTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const variant = data.styleVariant || 1;

  if (variant === 2) return <ClassicDesign2 ref={ref} data={data} />;
  if (variant === 3) return <ClassicDesign3 ref={ref} data={data} />;
  if (variant === 4) return <ClassicDesign4 ref={ref} data={data} />;
  if (variant === 5) return <ClassicDesign5 ref={ref} data={data} />;

  return <ClassicDesign1 ref={ref} data={data} />;
});

ClassicTemplate.displayName = "ClassicTemplate";
export default ClassicTemplate;
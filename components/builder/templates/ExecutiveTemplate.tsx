"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";
import ExecDesign1 from "./executive/ExecDesign1.tsx";
import ExecDesign2 from "./executive/ExecDesign2.tsx";
import ExecDesign3 from "./executive/ExecDesign3.tsx";
import ExecDesign4 from "./executive/ExecDesign4.tsx";
import ExecDesign5 from "./executive/ExecDesign5.tsx";

const ExecutiveTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const variant = data.styleVariant || 1;

  if (variant === 2) return <ExecDesign2 ref={ref} data={data} />;
  if (variant === 3) return <ExecDesign3 ref={ref} data={data} />;
  if (variant === 4) return <ExecDesign4 ref={ref} data={data} />;
  if (variant === 5) return <ExecDesign5 ref={ref} data={data} />;

  return <ExecDesign1 ref={ref} data={data} />;
});

ExecutiveTemplate.displayName = "ExecutiveTemplate";
export default ExecutiveTemplate;
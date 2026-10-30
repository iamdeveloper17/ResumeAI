"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const ExecutiveTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects } = data;
  const accent = data.accentColor || "#1e293b";

  return (
    <div ref={ref} style={{ backgroundColor: "#fff", padding: "40px", minHeight: "1123px", fontFamily: data.fontFamily || "Georgia, serif", fontSize: data.fontSize || "11px", }}>
      {/* Header with accent side bar */}
      <div style={{ display: "flex", gap: "20px", borderBottom: `3px solid ${accent}`, paddingBottom: "20px", marginBottom: "24px" }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", color: accent }}>{personal.fullName}</h1>
          <p style={{ fontSize: "16px", color: "#555", marginTop: "4px" }}>{personal.jobTitle}</p>
        </div>
        <div style={{ textAlign: "right", fontSize: "11px", color: "#555", lineHeight: "1.5" }}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
        </div>
      </div>

      {experience.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "bold", color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Professional Experience</h2>
          {experience.map((exp) => (
            <div key={exp._id} style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "14px", fontWeight: "bold", color: "#222" }}>{exp.position}</div>
              <div style={{ fontSize: "12px", color: "#666", fontStyle: "italic", marginBottom: "4px" }}>{exp.company} | {exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
              <ul style={{ fontSize: "12px", paddingLeft: "18px", lineHeight: "1.6" }}>
                {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Similar structure for Education, Skills etc. */}
    </div>
  );
});
ExecutiveTemplate.displayName = "ExecutiveTemplate";
export default ExecutiveTemplate;
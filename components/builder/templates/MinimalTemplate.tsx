"use client";
import { forwardRef } from "react";
import type { ResumeData } from "@/lib/resumeStore";

const MinimalTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personal, experience, education, skills, projects } = data;
  const accent = data.accentColor || "#000000";

  return (
    <div ref={ref} style={{ backgroundColor: "#fff", padding: "48px", color: "#333", fontFamily: data.fontFamily || "sans-serif", fontSize: data.fontSize || "11px", minHeight: "1123px" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: accent, letterSpacing: "1px" }}>{personal.fullName}</h1>
        <p style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>{personal.jobTitle}</p>
        <div style={{ fontSize: "11px", color: "#888", marginTop: "8px", display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
        </div>
      </div>

      {personal.summary && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, textTransform: "uppercase", borderBottom: `1px solid ${accent}`, paddingBottom: "4px", marginBottom: "8px" }}>Summary</h2>
          <p style={{ fontSize: "12px", lineHeight: "1.6" }}>{personal.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "bold", color: accent, textTransform: "uppercase", borderBottom: `1px solid ${accent}`, paddingBottom: "4px", marginBottom: "8px" }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp._id} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "bold" }}>
                <span>{exp.position}</span>
                <span style={{ color: "#666", fontWeight: "normal" }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
              </div>
              <p style={{ fontSize: "12px", color: "#666", fontStyle: "italic" }}>{exp.company} {exp.location && `• ${exp.location}`}</p>
              <ul style={{ fontSize: "12px", paddingLeft: "16px", marginTop: "4px" }}>
                {exp.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginBottom: "2px" }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education & Skills (Similar structure) */}
    </div>
  );
});
MinimalTemplate.displayName = "MinimalTemplate";
export default MinimalTemplate;